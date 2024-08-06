import { Cookie } from "@team/account-contract";
import { InventoryAssetItem } from "../models/inventory/inventoryAssetItem";
import { GetInventoryParams, GetInventoryResult } from "../models/inventory/inventoryServiceTypes";
import { AxiosResponse, HttpStatusCode } from "axios";
import { AxiosRequestService } from "./infrastructure/requestService";
import { steamUrls } from "../steam-urls";
import { ContextManager } from "../utilities/contextManager";
import { Logger } from "winston";

export class InventoryService extends AxiosRequestService {
    private defaultInventoryFetchCount = 5000;
    constructor(cookie: Cookie, proxy?: string, logger?: Logger) {
        super(cookie, proxy, logger);
    }

    //#region get inventory by appId, profileId (optionals: language, count, startAssetId)
    /**
     *
     * @param params Enter params to get inventory. If count is not specified, default value is 5000
     * @returns Inventory result or null if error
     */
    public async getInventory(params: GetInventoryParams): Promise<GetInventoryResult | null> {
        const requestUrl = `${steamUrls.steamInventoryURL}${params.profileId64}/${
            params.appID
        }/${ContextManager.getContextId(params.appID)}?l=${params.language || "english"}&count=${
            params.count || this.defaultInventoryFetchCount
        }${params.startAssetId ? `&start_assetid=${params.startAssetId}` : ""}`;
        const headers = {
            Referer: `${steamUrls.steamProfileUrl}/${params.profileId64}/inventory/`,
        };
		let logData = JSON.stringify(params);
        try {
			this.log(`Getting inventory with params:${logData} by url: ${requestUrl}`, this.logger?.debug);
            const response: AxiosResponse = await this.request.get(requestUrl, {
                headers: headers,
            });
            if (response.status != HttpStatusCode.Ok) {
				this.log(`Failed to get inventory with params:${logData}. Response: ${response}`, this.logger?.error);
                return null;
            }
            return response.data;
        } catch (err) {
            throw new Error(`Failed to get inventory with params:${logData}. Reason:${err}`);
        }
    }
    //#endregion
}
