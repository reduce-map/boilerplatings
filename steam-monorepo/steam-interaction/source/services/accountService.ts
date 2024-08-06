import SteamUser from "steam-user";
import { AccountMeta } from "@team/account-contract";
import { TradeUrlResponse, NameHistoryItem } from "../models/exports";
import { AxiosResponse, HttpStatusCode } from "axios";
import { steamUrls } from "../steam-urls";
import { RegularExpressions } from "../enums/RegularExpressions";
import { AxiosRequestService } from "./infrastructure/requestService";
import { PrivacySettingsController } from "./controllers/privacySettingsController";
import { EResult } from "steam-session";
import { PersonalInfo } from "../models/exports";
import cherio from "cheerio";
import { PersonalInfoController } from "./controllers/personalInfoController";
import { Logger } from "winston";

export class AccountService extends AxiosRequestService {
	accountMeta: AccountMeta;
	sessionId: string;
	steamUser: SteamUser;

	privacySettings!: PrivacySettingsController;
	personalInfoSettings!: PersonalInfoController;

	constructor(steamUser: SteamUser, accountMeta: AccountMeta, sessionid: string, proxy?: string, logger?:Logger) {
		super(accountMeta.cookie, proxy, logger);
		this.accountMeta = accountMeta;
		this.sessionId = sessionid;
		this.steamUser = steamUser;
		this.setPrivacySettingsController();
		this.setPersonalInfoController();
	}

	//#region setters for steam user, privacy settings and personal info controllers
	public async setSteamUser(steamUser: SteamUser) {
		this.steamUser = steamUser;
		await this.setPrivacySettingsController();
		await this.setPersonalInfoController();
	}
	
	private async setPrivacySettingsController() {
		if (!this.steamUser.steamID) {
			return;
		}
		const currentSettings = await this.steamUser.getPrivacySettings();
		this.privacySettings = new PrivacySettingsController(
			this.request,
			{
				friendsList: currentSettings.privacy_state_friendslist,
				ownedGames: currentSettings.privacy_state_ownedgames,
				inventory: currentSettings.privacy_state_inventory,
				inventoryGifts: currentSettings.privacy_state_gifts,
				profile: currentSettings.privacy_state,
				playtime: currentSettings.privacy_state_playtime,
			},
			this.steamUser.steamID.getSteamID64(),
			this.sessionId
		);
	}

	private async setPersonalInfoController() {
		if (!this.steamUser.steamID) {
			return;
		}

		const personalInfo: PersonalInfo | null = await this.getPersonalInfo();
		if (personalInfo == null) {
			return;
		}

		this.personalInfoSettings = new PersonalInfoController(
			this.request,
			personalInfo,
			this.steamUser.steamID.getSteamID64(),
			this.sessionId
		);
	}
	//#endregion

	//#region get personal info
	private async getPersonalInfo(): Promise<PersonalInfo | null> {
		const requestUrl: string = `${this.getProfileURL()}/edit/info`;
		const response: AxiosResponse = await this.request.post(requestUrl, {
			sessionID: this.sessionId,
		});
		if (response.status != HttpStatusCode.Ok) {
			return null;
		}
		const $ = cherio.load(response.data);
		const currentSettings: any = $("#profile_edit_config").data("profile-edit");
		if (!currentSettings) {
			this.log(`Failed to get personal info. Reason: Current settings are not defined; SessionID: ${this.sessionId} Response: ${response}`, this.logger?.error);
			return null;
		}
		const personalInfo: PersonalInfo = {
			personaName: currentSettings.strPersonaName,
			realName: currentSettings.strRealName,
			summary: currentSettings.strSummary,
			country: currentSettings.LocationData.locCountryCode,
			regionState: currentSettings.LocationData.locStateCode,
			city: currentSettings.LocationData.locCityCode,
		};
		return personalInfo;
	}
	//#endregion

	//#region get and change trade url
	public changeTradeUrl(): Promise<TradeUrlResponse> {
		return this.steamUser.changeTradeURL();
	}
	public getTradeUrl(): Promise<TradeUrlResponse> {
		return this.steamUser.getTradeURL();
	}
	//#endregion

	//#region register and get web api key
	public async getWebApiKey(): Promise<string | null> {
		const response: AxiosResponse = await this.request.get(steamUrls.getApiKeyURL);
		if (response.data.match(RegularExpressions.registerNewKeyMessage)) {
			throw new Error("Register for a new Steam Web API Key");
		}
		if (response.data.match(RegularExpressions.accessDeniedMessage)) {
			throw new Error("Access Denied");
		}
		if (response.data.match(RegularExpressions.unableToFetchMessage)) {
			throw new Error("Unable to fetch");
		}
		if (response.data.match(RegularExpressions.validateEmailWebApiMessage)) {
			throw new Error("You must have a validated email address to create a Steam Web API key.");
		}

		let match = response.data.match(RegularExpressions.apiKey);
		if (match) {
			return match[1];
		}
		return null;
	}

	public async registerWebApiKey(domain: string): Promise<boolean> {
		const response: AxiosResponse = await this.request.post(steamUrls.registerWebApiKeyURL, {
			domain: domain,
			agreeToTerms: "agreed",
			sessionid: this.sessionId,
			Submit: "Register",
		});

		return response.status == HttpStatusCode.Ok;
	}
	//#endregion

	//#region clear and get name history
	public async clearNameHistory(): Promise<boolean> {
		const requestUrl: string = `${this.getProfileURL()}/ajaxclearaliashistory/`;
		var response: AxiosResponse = await this.request.post(requestUrl, {
			sessionid: this.sessionId
		});

		if (response.status != HttpStatusCode.Ok) {
			this.log(`Failed to clear name history. Response: ${response}`, this.logger?.error);
			return false;
		}

		if (response.data.success == EResult.AccessDenied) {
			throw new Error(`Failed to clear name history. Reason: Access Denied ${response.data.message}`);
		}
		return true;
	}

	public async getNameHistory(): Promise<NameHistoryItem[]> {
		if (this.steamUser.steamID == null) {
			throw new Error(`Failed to get name history. Reason: SteamID is not defined`);
		}
		const steamID64 = this.steamUser.steamID.getSteamID64();
		const aliases: any = await this.steamUser.getAliases([steamID64]);

		let nameHistories: NameHistoryItem[] = aliases.users[steamID64]?.map(
			(x: any) =>
				<NameHistoryItem>{
					newname: x?.name,
					timechanged: x?.name_since,
				}
		);

		return nameHistories;
	}
	//#endregion

	//#region get profile url
	public getProfileURL(): string {
		if (!this.steamUser.steamID) {
			throw new Error(`Get profile url failed. Reason: SteamID is not defined`);
		}
		let profileUrl = `${steamUrls.steamProfileUrl}/${this.steamUser.steamID?.getSteamID64()}`;
		return profileUrl;
	}
	//#endregion

	//#region get wallet balance
	public async getWalletBalance(): Promise<number | null> {
		const response: AxiosResponse = await this.request.get(steamUrls.steamMarketURL);
		if (response.status != HttpStatusCode.Ok) {
			this.log(`Failed to get wallet balance. Response: ${response}`, this.logger?.error);
			return null;
		}

		const walletInfoJson = response.data.match(RegularExpressions.walletInfo);
		if (!walletInfoJson) {
			return null;
		}

		let wallet = JSON.parse(walletInfoJson[1]);
		return parseFloat((wallet.wallet_balance / 100).toFixed(2));
	}
	//#endregion
}
