import { AccountNotValidError, Cookie } from "@team/account-contract";
import { AxiosRequestService } from "./infrastructure/requestService";
import { steamCommunityUrl, steamUrls } from "../steam-urls";
import { HttpStatusCode } from "axios";
import { getUrlDomain } from "../utilities/getUrlDomain";
import { get } from "request";

/**
 * This service is used to validate if the cookie is valid
 * If you want to use web cookie, you need convert them to cookie contract, by using utils/filterCookieByDomain.ts
 * with domainFilter = "steamcommunity.com"
 */

export class CookieValidationService extends AxiosRequestService {
    private static requestUrl = steamUrls.steamClientJsToken;
    public static requestDomain: string = getUrlDomain(this.requestUrl) || "";

    constructor(cookie: Cookie, attachedProxy?: string) {
        super(cookie, attachedProxy);
    }

    public async isCookieHaveValidSession(): Promise<boolean> {
        try {
            let response = await this.request.get(CookieValidationService.requestUrl);
            const result = response.status == HttpStatusCode.Ok && response.data.logged_in;
            return result;
        } catch (exception) {
            this.log(`Failed to validate cookie. Exception: ${exception}`, this.logger?.error);
            return false;
        }
    }
}
