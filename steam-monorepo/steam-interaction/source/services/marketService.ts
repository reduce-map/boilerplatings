import axios, { AxiosProxyConfig, AxiosRequestConfig, AxiosResponse, HttpStatusCode } from "axios";
import { Axios } from "axios";
import { AccountMeta, Cookie } from "@team/account-contract";
import { steamCommunityUrl, steamUrls } from "../steam-urls";
import {
    ItemInfo,
    PriceHistoryItem,
    PriceHistoryResult,
    MarketHistoryPage,
    MarketHistoryResult,
    RecentCompletedResult,
    ExtendedListingsPage,
    AllListingsPage,
    ListingsPage,
    MyListingsResult,
    SellParams,
    BuyParams,
    PageItem,
    ConfirmationInfo,
    MarketItemInfo,
} from "../models/market/marketServiceTypes";
import { Page } from "../models/market/page";
import { Listing } from "../models/market/listing";
import cheerio from "cheerio";
import { RegularExpressions } from "../enums/RegularExpressions";
import { ContextManager } from "../utilities/contextManager";
import { AxiosRequestService } from "./infrastructure/requestService";
import { provideRefererAxiosConfig } from "../utilities/requestHeaderUtil";
import { Logger } from "winston";


export class MarketService extends AxiosRequestService {
    sessionId?: string;
    constructor(cookie: Cookie, proxy?: string, logger?: Logger) {
        super(cookie, proxy, logger);
        this.sessionId = cookie.sessionid?.toString();
    }

    //#region getRecentCompleted
    public async getRecentCompleted(): Promise<RecentCompletedResult> {
        const url = steamUrls.steamRecentCompletedUrl + "?norender=1";
        
        const response: AxiosResponse = await this.request.get(url);
        return response.data;
    }
    //#endregion

    //#region get market items count
    /**
     *
     * @param appId represents the game id, leave empty to get all market items.
     *
     *
     * At the moment of development on the request to get all items steam return total_count = 200 000 or 400 000 randomly
     * @returns count of market items
     */
    public async getMarketItemsCount(appId?: number): Promise<number> {
        const url = encodeURI(
            steamUrls.steamMarketSearchURL +
                `?query=&start=0&count=1&search_descriptions=0&sort_column=popular&sort_dir=desc${
                    appId ? `&appid=${appId}` : ""
                }&norender=1`
        );

        const response = await this.request.get(url);

        if (!response.data?.total_count){ 
            this.log(`Failed to get market items count for ${appId} app. Response: ${JSON.stringify(response)}`, this.logger?.error)
            throw new Error(`Failed to get market items count for ${appId} app.`)
        };

        return response.data.total_count;
    }
    //#endregion

    //#region get items from page
    /**
     * @param currentPage represents the page number, starts from 0
     * @param appId represents the game id, leave empty to get all market items.
     * @param countPerPage represents the count of items per page, default and max is 100
     *
     * Return array of items from main market page
     *
     * @returns array of items from page
     */
    public async getItemsFromPage(currentPage: number, appId?: number, countPerPage = 100): Promise<PageItem[]> {
        const start = (currentPage - 1) * countPerPage;

        const url = encodeURI(
            steamUrls.steamMarketSearchURL +
                `?query=&start=${start}&count=${countPerPage}&search_descriptions=0&sort_column=popular&sort_dir=desc${
                    appId ? `&appid=${appId}` : ""
                }&norender=1`
        );

        const response = await this.request.get(
            url,
            provideRefererAxiosConfig(`https://steamcommunity.com/market/search?q=`)
        );

        if (!response.data?.results) {
            this.log(`No items found on page ${currentPage} for ${appId} app. Response: ${JSON.stringify(response)}`, this.logger?.error)
            throw new Error(`No items found on page ${currentPage} for ${appId} app.`);
        }

        return response.data.results;
    }
    //#endregion

    //#region get price history and get market history
    public async getPriceHistory(historyItem: PriceHistoryItem): Promise<PriceHistoryResult[]> {
        let requestUrl: string = `${steamUrls.steamPriceHistoryUrl}?country=US&currency=${historyItem.currency}&appid=${
            historyItem.appid
        }&market_hash_name=${encodeURIComponent(historyItem.itemName)}`;
        try {
            const response: AxiosResponse = await this.request.get(requestUrl);
            const prices = response.data.prices.map(
                (x: any) =>
                    <PriceHistoryResult>{
                        date: x[0],
                        price: x[1],
                        count: x[2],
                    }
            );
            return prices;
        } catch(err) {
            this.log(`Failed to get price history for ${historyItem.itemName}. Reason: ${err}`, this.logger?.error)
            return [];
        }
    }
    /**
     * 
     * @param page must be greater than 0, and less than total pages count
     * @param countPerPage must be greater than 0, and less than 500
     * @param norender represents whether to render page or not (steamId64 returns only if false)
     * @returns 
     */
    public async getMarketHistory(page: number = 0, countPerPage: number = 100, norender: boolean = true): Promise<MarketHistoryResult> {
        if(page < 0 || countPerPage < 0)
            throw new Error("Page and count per page must be greater than 0!");
        if(countPerPage > 500)
            throw new Error("Count per page must be less than 500!");
        let requestUrl: string = `${steamUrls.steamMarketHistoryUrl}/render/?start=
            ${page * countPerPage}&count=${countPerPage}&norender=${norender ? 1 : 0}`;

        const response: AxiosResponse = await this.request.get(requestUrl);

        return response.data;
    }
    //#endregion

    //#region get item info

    public async getItemInfo(appId: number, marketItemName: string): Promise<ItemInfo> {
        const itemLink = `${steamUrls.steamMarketURL}listings/${appId}/${encodeURIComponent(marketItemName)}`;
        try {
            var response: AxiosResponse = await this.request.get(
                itemLink,
                {
                    headers: {
                        Referer: `https://steamcommunity.com/market/search?q=`
                    }
                }
            );
        } catch (err) {
            throw new Error(`Failed to get item info for ${marketItemName}. Reason: ${err}`);
        }

        this.log(`Got item info for ${marketItemName}`, this.logger?.debug);
        const itemInfo: ItemInfo = {
            nameId: this.findNameId(response.data),
            commodity: this.findCommodity(response.data),
        };
        return itemInfo;
    }

    private findNameId(responseData: any): number {
        let findExpr = new RegExp(RegularExpressions.findNameIDFromItemInfo, "g").exec(responseData);
        if (findExpr != null) {
            if (findExpr.length > 0) {
                let nameId = parseInt(findExpr[1].replace(")", "").replace("(", ""));
                return nameId;
            }
        }
        return 0;
    }
    private findCommodity(responseData: any): boolean {
        const $ = cheerio.load(responseData);
        return $(`div[id="market_commodity_order_spread"]`).html() != null;
    }
    //#endregion

    //#region market listings

    public async getMarketListings(params: ExtendedListingsPage): Promise<Page> {
        let marketItemLink = `${steamUrls.steamMarketURL}listings/${params.appId}/${encodeURIComponent(
            params.marketItemName
        )}`;

        let requestUrl: string = `${marketItemLink}/render/?query=1&start=${
            (params.currentPage - 1) * params.cntPerPage
        }&count=${params.cntPerPage}&country=US&language=english&currency=${params.currency}`;

        this.log(`Getting market listings for ${params.marketItemName} by next url: ${requestUrl}`, this.logger?.debug)
        try {
            var response: AxiosResponse = await this.request.get(requestUrl, provideRefererAxiosConfig(marketItemLink));
        } catch (err: any) {
            throw new Error(`Failed to get market listings. Reason: ${err}`);
        }

        this.log(`Got market listings for ${params.marketItemName}`, this.logger?.debug);
        let assets = [];
        if (response.data.assets[params.appId]) {
            assets = response.data.assets[params.appId][ContextManager.getContextId(params.appId)];
        }

        const listingsInfo = response.data.listinginfo;
        const listings: Listing[] = this.createListings(assets, listingsInfo);
        const page: Page = this.createPage(response.data, listings);
        return page;
    }

    public async getMyListings(currentPage: number, cntPerPage: number = 100): Promise<Page> {
        let url = `${steamUrls.steamMarketMyListings}?norender=1&start=${
            (currentPage - 1) * cntPerPage
        }&count=${cntPerPage}&country=US&language=english`;
        const response: AxiosResponse = await this.request.get(url);

        const page: Page = this.createPage(response.data, response.data.listings);
        return page;
    }
    //#endregion

    //#region create listings and create page
    private createListings(assets: AxiosResponse[], listinginfo: any[]): Listing[] {
        let listings = [];
        for (let listingid in listinginfo) {
            let assetid = listinginfo[listingid].asset.id;
            listinginfo[listingid].asset = assets[assetid];
            let listing: Listing = listinginfo[listingid];
            listings.push(listing);
        }
        return listings;
    }
    private createPage(responseData: any, listings: any): Page {
        const page: Page = new Page();
        page.pageSize = responseData.pagesize;
        page.totalCount = responseData.total_count;
        page.pagesCount = Math.ceil(responseData.total_count / responseData.pagesize);
        page.currentPosition = responseData.start;
        page.currentPage = Math.ceil(responseData.start / responseData.pagesize) + 1;
        page.data = listings;
        return page;
    }
    //#endregion

    //#region buy and sell
    public async buy(params: BuyParams, listingid: string, marketItem: MarketItemInfo): Promise<boolean> {
        const marketItemUrl = `${steamUrls.steamMarketURL}listings/${marketItem.appId}/${encodeURIComponent(
            marketItem.marketItemName
        )}`;

        let requestUrl = `${steamUrls.steamBuyListingURL}${listingid}?sessionid=${this.sessionId}`;

        let logData = JSON.stringify(params);
        try {
            this.log(`Buying item with params: ${logData} by next url: ${requestUrl}`, this.logger?.debug);
            var response: AxiosResponse = await this.request.post(
                requestUrl,
                params,
                {
                    headers:{
                        Referer: marketItemUrl
                    }
                }
            );
        } catch (err: any) {
            throw new Error(`Failed to buy item with params:${logData} Reason: ${err}`);
        }
        this.log(`Bought item with params: ${logData}`, this.logger?.debug);
        return response.data.wallet_info ? true : false;
    }

    public async sell(params: SellParams, steamId64: string): Promise<ConfirmationInfo | null> {
        const request_url = `${steamUrls.steamMarketSellItemURL}?sessionid=${this.sessionId}`;
        let logData = JSON.stringify(params);
        try {
            var response: AxiosResponse = await this.request.post(
                request_url,
                params,
                {
                    headers: {
                        Referer: `${steamUrls.steamProfileUrl}/${steamId64}/inventory/`
                    }
                }
            );
        } catch (err: any) {
            throw new Error(`Failed to sell item with params:${logData} Reason: ${err}`);
        }

        if (response.status != HttpStatusCode.Ok) {
            this.log(`Failed to sell item with params:${logData}; Response: ${JSON.stringify(response)}`, this.logger?.error);
            return null;
        }

        return response.data;
    }
    //#endregion

    //#region remove listing by listing id
    public async removeListing(listingId: string): Promise<boolean> {
        const requestUrl = `${steamUrls.steamRemoveListingURL}${listingId}?sessionid=${this.sessionId}`;
        try {
            const res: AxiosResponse = await this.request.post(requestUrl, undefined, {
                headers:{
                    Referer: steamUrls.steamMarketURL
                }
            });
            
            if(res.status != HttpStatusCode.Ok){
                this.log(`Failed to remove listing with id:${listingId}; Response: ${JSON.stringify(res.data)}`, this.logger?.error)
            }

            return res.status == HttpStatusCode.Ok;
        } catch (err: any) {
            throw new Error(`Failed to remove listing with id:${listingId} Reason: ${err}`);
        }
    }
    //#endregion
}
