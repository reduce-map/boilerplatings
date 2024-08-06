import { Cookie } from "@team/account-contract";
import { AxiosRequestService } from "./infrastructure/requestService";
import { AxiosResponse } from "axios";
import { steamUrls } from "../steam-urls";
import { RedeemWalletCodeResponse } from "../models/storeServiceTypes";
import { Logger } from "winston";

export class StoreService extends AxiosRequestService {
	sessionId?: string;
	constructor(cookie: Cookie, proxy?: string, logger?: Logger) {
		super(cookie, proxy, logger);
		this.sessionId = cookie.sessionid?.toString();
	}

	//#region redeem wallet code
	public async redeemWalletCode(code: string): Promise<RedeemWalletCodeResponse> {
		const requestUrl = `${steamUrls.steamRedeemWalletCodeURL}`;
		const response: AxiosResponse = await this.request.post(requestUrl, {
			wallet_code: code,
			sessionid: this.sessionId,
		});

        if(!response.data.success){
			this.log(`Failed to redeem wallet code: ${response.data.message}; Response: ${response}`, this.logger?.error)
            throw new Error(`Failed to redeem wallet code: ${response.data.message}`)
        }
		return response.data
	}
	//#endregion
}
