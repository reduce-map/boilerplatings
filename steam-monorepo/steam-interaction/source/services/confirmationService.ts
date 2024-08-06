import { Cookie } from "@team/account-contract";
import SteamTotp from "steam-totp";
import { AxiosRequestService } from "./infrastructure/requestService";
import { ConfirmApiParams } from "../models/confirmation/confirmationServiceTypes";
import { AxiosRequestConfig, AxiosResponse, HttpStatusCode } from "axios";
import { steamUrls } from "../steam-urls";
import { EResult } from "steam-user";
import { Confirmation } from "../models/exports";
import { Logger } from "winston";

export type ConfirmationServiceSettings = {
	mobileOs: string;
	profileId64: string;
};
export enum ConfirmationAction {
	Accept = "allow",
	Cancel = "cancel",
}

export type ConfirmationResponse = {
	success: boolean;
	responsePayload: any;
}

enum ConfirmationUrls {
	Multiajaxop = "multiajaxop",
	Ajaxop = "ajaxop",
}

export class ConfirmationService extends AxiosRequestService {
	settings: ConfirmationServiceSettings;
	identitySecret: string;
	constructor(cookie: Cookie, settings: ConfirmationServiceSettings, identitySecret: string, proxy?: string, logger?: Logger) {
		super(cookie, proxy, logger);
		this.settings = settings;
		this.identitySecret = identitySecret;
	}

	//#region get all confirmations
	public async getConfirmations(): Promise<Confirmation[]> {
		const time = Math.floor(Date.now() / 1000);
		const key = SteamTotp.getConfirmationKey(this.identitySecret, time, "conf");
		const response = await this.sendAllConfirmationsRequest({
			key: key,
			url: "getlist",
			time: time,
			tag: "conf",
			method: "GET",
		});
		if (response.data.success != EResult.OK) {
			this.log(`Failed get confirmations. Response: ${response}`, this.logger?.error);
			throw new Error(`Failed get confirmations. Reason: ${response.data.message}`);
		}

		const res: Confirmation[] = response.data.conf.map((x: any) => new Confirmation(x));
		return res;
	}
	//#endregion

	//#region respond to one confirmation and respond to all confirmations
	public async respondToConfirmationById(
		confirmationId: string | string[],
		nonce: string | string[],
		action: ConfirmationAction
	): Promise<ConfirmationResponse> {
		let time = Math.floor(Date.now() / 1000);
		const actionKey = SteamTotp.getConfirmationKey(this.identitySecret, time, action);
		try {
			var response: AxiosResponse = await this.sendAllConfirmationsRequest({
				key: actionKey,
				url: confirmationId instanceof Array ? ConfirmationUrls.Multiajaxop : ConfirmationUrls.Ajaxop,
				time: time,
				tag: action,
				method: "POST",
				payload: {
					op: action,
					cid: confirmationId,
					ck: nonce,
				},
			});
		} catch (err) {
            throw new Error(`Failed respond to confirmation. Reason ${err}`)
        }

		if (!response.data.success) {
			this.log(`Respond process is not successful. Response: ${response}`, this.logger?.warn);
			return {success: false, responsePayload: response.data};
		}

		if (response.data.message) {
			throw new Error(`Failed respond to confirmation. Reason: ${response.data.message}`);
		}
		return {success: true, responsePayload: response.data};
	}

	public async respondToConfirmation(confirmation: Confirmation, action: ConfirmationAction): Promise<ConfirmationResponse> {
		return await this.respondToConfirmationById(confirmation.id, confirmation.nonce, action);
	}

	public async respondToConfirmations(confirmations: Confirmation[], action: ConfirmationAction): Promise<ConfirmationResponse> {
		return await this.respondToConfirmationById(confirmations.map((x) => x.id), confirmations.map((x) => x.nonce), action);
	}


	private async sendAllConfirmationsRequest(confParams: ConfirmApiParams): Promise<any> {
		const requestConfig: AxiosRequestConfig = {
			baseURL: steamUrls.steamMobileConfURL,
			url: `/${confParams.url}`,
			method: confParams.method,
		};
		const payload: any = confParams.payload || {};
		payload.p = SteamTotp.getDeviceID(this.settings.profileId64);
		(payload.a = this.settings.profileId64), (payload.k = confParams.key);
		payload.t = confParams.time?.toString();
		payload.m = this.settings.mobileOs;
		payload.tag = confParams.tag;

		if (requestConfig.method == "GET") {
			requestConfig.params = payload;
		} else {
			requestConfig.data = payload;
		}

		this.log(`Sending confirmation request with params: ${JSON.stringify(confParams)}`, this.logger?.debug)
		return await this.request.request(requestConfig);
	}
	//#endregion
}
