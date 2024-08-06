import SteamUser, { EAccountType } from "steam-user";
import SteamTotp from "steam-totp";
import { AccountCredentials, AccountMeta, Cookie } from "@team/account-contract";
import { parseCookies } from "../utilities/models/cookieResponseAdapter";
import { EAuthTokenPlatformType, LoginSession } from "steam-session";
import { AxiosRequestService } from "./infrastructure/requestService";
import { getDefaultCookies } from "../utilities/getDefaultCookies";
import { AccountSetting, LoginResult } from "../models/loginServiceTypes";
import { LeveledLogMethod, Logger } from "winston";
/*
 * 	This LoginService class works with SteamUser instance
 *
 */
export class LoginService {
    public enableDebug: boolean = false;
    defaultSettings: AccountSetting;
    steamUser: SteamUser;

    constructor(
        settings: AccountSetting,
        proxy?: string,
        private guardCodeRetryDelay: number = 30000,
        private logger?: Logger
    ) {
        this.steamUser = new SteamUser({
            socksProxy: proxy,
        });
        this.defaultSettings = settings;
    }

    //#region Settings methods
    public setProxyOnSteamUser(proxy: string) {
        this.steamUser.setOption("socksProxy", proxy);
    }
    //#endregion
    public logOutSteamUser() {
        this.steamUser.logOff();
        this.steamUser.accountInfo = null;
    }
    /**
     * If credentials contains refresh_token, then it will be used to login
     * If refresh_token is expired or not present, then it will used login and password
     * @param credentials
     * @returns
     */
    public loginSteamUser(credentials: AccountCredentials): Promise<LoginResult> {
        return new Promise<LoginResult>(async (resolve, reject) => {
            this.subscribeToSteamUser(this.steamUser, credentials, resolve, reject);
            if (!credentials.refresh_token || (await this.isExpiredToken(credentials.refresh_token))) {
                this.log(`Logging in with credentials: ${credentials.login}`, this.logger?.debug);
                this.steamUser.logOn({
                    accountName: credentials.login,
                    password: credentials.password,
                    twoFactorCode: SteamTotp.getAuthCode(credentials.shared_secret),
                });
            } else {
                this.log(`Refreshing session with refresh token: ${credentials.refresh_token}`, this.logger?.debug);
                this.steamUser.logOn({ refreshToken: credentials.refresh_token });
            }
        });
    }

    public isSteamUserLoggedIn(): boolean {
        return this.steamUser.accountInfo != null;
    }

    private async isExpiredToken(refresh_token: string): Promise<boolean> {
        try {
            const loginSession: LoginSession = new LoginSession(EAuthTokenPlatformType.SteamClient);
            loginSession.refreshToken = refresh_token;
            const result = await loginSession.getWebCookies();
            return result ? false : true;
        } catch (err) {
            console.log(err);
            return true;
        }
    }

    //#region subsribtions
    private async subscribeToSteamUser(
        steamUser: SteamUser,
        credentials: AccountCredentials,
        resolve: any,
        reject: any
    ) {
        let newRefreshToken: string;
        steamUser.on("refreshToken" as any, (refreshToken: any) => {
            this.log(`Refresh token received for account: ${credentials.login}`, this.logger?.debug);
            newRefreshToken = refreshToken;
        });

        steamUser.on("steamGuard", (domain: any, callback: any) => {
            this.log(`Steam Guard code required for account: ${credentials.login}`, this.logger?.debug);
            setTimeout(() => {
                callback(SteamTotp.getAuthCode(credentials.shared_secret));
            }, this.guardCodeRetryDelay);
        });

        steamUser.on("webSession", (sessionid: any, cookies: any) => {
            this.log(`Web session created for account: ${credentials.login}`, this.logger?.debug);
            this.unsubscribeToSteamUser(steamUser);
            let result: LoginResult = {
                cookie: getDefaultCookies(this.defaultSettings, cookies),
                sessionId: sessionid,
                refreshToken: newRefreshToken ?? credentials.refresh_token,
            };
            resolve(result);
        });

        steamUser.on("error", (err) => {
            this.log(`Error occurred while logging in: ${err}`, this.logger?.error);
            this.unsubscribeToSteamUser(steamUser);
            reject(err);
        });
    }

    public async unsubscribeToSteamUser(steamUser: SteamUser) {
        steamUser.removeAllListeners();
    }
    //#endregion

    private log(logMessage: string, logMethod: LeveledLogMethod | undefined) {
        if (!this.enableDebug || !logMethod) {
            return;
        }

        logMethod(logMessage);
    }
}
