import { AccountCredentials, Cookie } from "@team/account-contract";

import { CookieEntry, WebLoginResult } from "../models/loginServiceTypes";
import { EAuthSessionGuardType, EAuthTokenPlatformType, ESessionPersistence, LoginSession } from "steam-session";
import { createDefaultCookies } from "../utilities/getDefaultCookies";
import { AccountSetting } from "../models/loginServiceTypes";
import SteamTotp from 'steam-totp'
import { StartSessionResponse } from "steam-session/dist/interfaces-external";
import cookieParser from "cookie"
import {LeveledLogMethod, Logger} from "winston";

export class WebLoginService {
	public enableDebug: boolean = false;
    constructor(public accountSettings: AccountSetting, public proxy?: string, public logger?:Logger) {
    }

    public logOnViaCredentials(credentials: AccountCredentials, rememberLogin: boolean = true): Promise<WebLoginResult> {
        return new Promise(async (resolve: any, reject: any) => {
            const loginSession: LoginSession = new LoginSession(EAuthTokenPlatformType.WebBrowser, {
				socksProxy: this.proxy
			})
			this.log(`Logging session created for account: ${credentials.login} with proxy: ${this.proxy}`, this.logger?.debug)

            this.subscribeToLoginSession(resolve, reject, loginSession)
			try{
				this.log(`Logging in with credentials: ${credentials.login}`, this.logger?.debug);
				let loginResult: StartSessionResponse = await loginSession.startWithCredentials({
					accountName: credentials.login,
					password: credentials.password,
					steamGuardCode: SteamTotp.getAuthCode(credentials.shared_secret),
					persistence: rememberLogin? ESessionPersistence.Persistent : ESessionPersistence.Ephemeral
				})

				if(loginResult.actionRequired) {
					throw new Error(`Actions required to login! ${loginResult.validActions?.map((action)=> `type: ${EAuthSessionGuardType[action.type]} detail:${action.detail}`)}`)
				}

			}
			catch(exception) {
				reject(exception)
			}	
        })
    }

	public async refreshSession(refreshToken: string): Promise<WebLoginResult> {
		const loginSession: LoginSession = new LoginSession(EAuthTokenPlatformType.WebBrowser, {
			socksProxy: this.proxy,
		});

		loginSession.refreshToken = refreshToken;
		const webCookies = await loginSession.getWebCookies()
		const cookies: CookieEntry[] = this.createWebCookie(webCookies, loginSession.steamID.getSteamID64(), refreshToken);
		const loginResult: WebLoginResult = {
				cookies: cookies,
				refreshToken: loginSession.refreshToken,
				accessToken: loginSession.accessToken,
			};
		return loginResult;
	}

	/**
	 * Parse cookie header, create default cookies
	 * @param cookies - array of header strings
	 * @returns Array of cookies in {domain, name, value} format
	 * 
	 */
	private createWebCookie(cookies: string[], steamID64: string, refreshToken:string): CookieEntry[] {
		
		let result: CookieEntry[] = []
		const allDomains = ["login.steampowered.com"];
		for(let cookie of cookies) { 
			const parsed = cookieParser.parse(cookie)
			const names = Object.keys(parsed);
			if(parsed.Domain && !allDomains.includes(parsed.Domain)) 
				allDomains.push(parsed.Domain);
			result.push({
				domains: parsed.Domain ? [parsed.Domain] : [],
				name: names[0],
				value: parsed[names[0]]
			})
		}
		for(const cookie of result)
			if(cookie.domains.length == 0)
				cookie.domains = allDomains;

		const defaultCookies = createDefaultCookies(this.accountSettings);
		for(let defaultCookie in defaultCookies) {
			result.push({
				domains: allDomains,
				name: defaultCookie,
				value: (defaultCookies as any)[defaultCookie]
			})
		}

        result.push({
			domains: allDomains,
			name:  "steamRefresh_steam",
			value: `${steamID64}%7C%7C${refreshToken}`
		})
		
		return result;
	}

    private subscribeToLoginSession(resolve: any, reject: any, loginSession: LoginSession) {
		loginSession.on("authenticated", async () => {
			try{
			this.unsubscribeToLoginSession(loginSession);
			const webCookies = await loginSession.getWebCookies()
			const cookies: CookieEntry[] = this.createWebCookie(webCookies, loginSession.steamID.getSteamID64(), loginSession.refreshToken);
			const loginResult: WebLoginResult = {
					cookies: cookies,
					refreshToken: loginSession.refreshToken,
					accessToken: loginSession.accessToken,
				};

			this.log(`Login passed for account: ${loginSession.accountName}`, this.logger?.debug);
			resolve(loginResult);
			} catch(err) {
				reject(err)
			}
		});
		loginSession.on("error", (err) => {
			this.log(`Login failed for: ${loginSession.accountName}. Reason: ${err}`, this.logger?.warn);
			this.unsubscribeToLoginSession(loginSession);
			reject(err);
		});
	}

    private unsubscribeToLoginSession(loginSession: LoginSession) {
		loginSession.removeAllListeners();
	}

	private log(logMessage: string, logMethod: LeveledLogMethod | undefined) {
		if(!this.enableDebug || !logMethod){
			return;
		}
		
		logMethod(logMessage);
	}
}