import { Cookie } from "@team/account-contract";
import { AxiosRequestService } from "./infrastructure/requestService";
import { steamUrls } from "../steam-urls";
import {
    ItemOrdersHistogramParams,
    OrdersHistogram,
    Order,
    OrderStatus,
    PlacedOrder,
    OrderPricePoint,
    ItemOrdersHistogramBrowserSimulationParams,
} from "../models/exports";
import axios, { AxiosRequestConfig, AxiosResponse, HttpStatusCode } from "axios";
import { EResult } from "steam-session";
import { getSteamDateString } from "../utilities/getSteamDateString";
import { provideRefererAxiosConfig } from "../utilities/requestHeaderUtil";
import { Logger } from "winston";
import { sleep } from "../utilities/sleep";
import { error } from "console";
import { tryParseFloat } from "../utilities/typeExtensions";

export class BuyOrderService extends AxiosRequestService {
    sessionId?: string;
    constructor(cookie: Cookie, proxy?: string, logger?: Logger) {
        super(cookie, proxy, logger);
        this.sessionId = cookie.sessionid?.toString();
    }

    //#region get buy order status
    public async getBuyOrderStatus(orderId: string): Promise<OrderStatus | null> {
        const requestUrl = `${steamUrls.steamGetBuyOrderStatus}?sessionid=${this.sessionId}&buy_orderid=${orderId}`;
        let requestPayloadFrame = {
            headers: {
                Referer: steamUrls.steamMarketURL,
            },
        };

        try {
            var response: AxiosResponse = await this.request.get(requestUrl, requestPayloadFrame);

            if (response.status != HttpStatusCode.Ok) {
                this.log(
                    `Failed to get buy order status for order id: ${orderId}. Response: ${response}`,
                    this.logger?.error
                );
                return null;
            }

            return response.data;
        } catch (err) {
            throw new Error(`Failed get buy order status for order id: ${orderId}. Reason: ${err}`);
        }
    }
    //#endregion

    //#region place buy order and create placed order
    public async placeBuyOrder(order: Order): Promise<PlacedOrder | null> {
        const requestUrl = `${steamUrls.steamCreateBuyOrder}?sessionid=${this.sessionId}`;
        let requestPayloadFrame = {
            headers: {
                Referer: `${steamUrls.steamMarketURL}listings/${order.appid}/${encodeURIComponent(
                    order.market_hash_name
                )}`,
            },
        };

        try {
            var response: AxiosResponse = await this.request.post(
                requestUrl,
                {
                    sessionid: this.sessionId,
                    currency: order.currency,
                    appid: order.appid,
                    market_hash_name: order.market_hash_name,
                    price_total: order.price_total,
                    quantity: order.quantity,
                },
                requestPayloadFrame
            );
        } catch (err) {
            throw new Error(`Failed to place buy order for order: ${order}. Reason: ${err}`);
        }

        if (response.status != HttpStatusCode.Ok) {
            this.log(`Failed to place buy order for order: ${order}. Response: ${response}`, this.logger?.error);
            return null;
        }

        switch (response.data.success) {
            case EResult.DuplicateRequest:
                return this.createPlacedOrder(null, false, EResult.DuplicateRequest);
            case EResult.InsufficientFunds:
                return this.createPlacedOrder(null, false, EResult.InsufficientFunds);
            case EResult.OK:
                return this.createPlacedOrder(response.data.buy_orderid, true, EResult.OK);
        }

        return null;
    }

    private createPlacedOrder(orderId: string | null, success: boolean, status: EResult) {
        const placedOrder: PlacedOrder = {
            orderId: orderId,
            success: success,
            status: status,
        };
        return placedOrder;
    }
    //#endregion

    //#region get item orders history
    private async makeItemOrdersHistogramRequest(params: ItemOrdersHistogramParams): Promise<AxiosResponse> {
        const requestUrl = `${steamUrls.steamItemOrdersHistogram}?norender=1&country=US&language=english&currency=${params.currency}&item_nameid=${params.nameId}&two_factor=0`;
        const config = provideRefererAxiosConfig(
            `https://steamcommunity.com/market/listings/${params.appId}/${encodeURIComponent(params.itemName)}`
        );

        config.headers!["If-Modified-Since"] = params.ifModifiedSince
            ? params.ifModifiedSince.toUTCString()
            : (new Date(2000)).toUTCString(); 
        try
        {
        return await this.request.get(requestUrl, config);
        }
        catch (err) {
            if(axios.isAxiosError(err) && err.response?.status === HttpStatusCode.NotModified)
            return err.response;
            throw err;
        }
    }

    private parseOrdersHistogramResult(response: AxiosResponse): OrdersHistogram | null {
        const result: OrdersHistogram = {} as OrdersHistogram;

        result.date = new Date(response.headers.date);
		result.expireDate = new Date(response.headers.expires);
		result.lastModified = new Date(response.headers["last-modified"]);

        let lowestSellOrder = tryParseFloat(response.data.lowest_sell_order) ?? 0;
        let highestBuyOrder = tryParseFloat(response.data.highest_buy_order) ?? 0;


        result.highestBuyOrder = highestBuyOrder / 100;
        result.lowestSellOrder = lowestSellOrder / 100;

        result.buyOrders = response.data.buy_order_graph.map(
            (x: any) =>
                <OrderPricePoint>{
                    price: x[0],
                    count: x[1],
                }
        );
        result.sellOrders = response.data.sell_order_graph.map(
            (x: any) =>
                <OrderPricePoint>{
                    price: x[0],
                    count: x[1],
                }
        );
        return result;
    }

    public async getItemOrdersHistogram(params: ItemOrdersHistogramParams): Promise<OrdersHistogram | null> {
        const response = await this.makeItemOrdersHistogramRequest(params);
        if (response.status != HttpStatusCode.Ok || response.data.success != EResult.OK) {
            this.log(
                `Failed to get item orders history for item: ${params.itemName} and app id: ${params}. Response: ${response}`,
                this.logger?.error
            );
            return null;
        }
        return this.parseOrdersHistogramResult(response);
    }
    /**
     * Make request to get item orders histogram with If-Modified-Since header as in web client
     * Start with request with current date, if response is 304(Not Modified), then set If-Modified-Since header to Last-Modified header from response and repeat request
     * @param params 
     * @returns 
     */
    public async getItemOrdersHistogramWithBrowserSimulation(params: ItemOrdersHistogramBrowserSimulationParams): Promise<OrdersHistogram | null> {
        let requestParams:ItemOrdersHistogramParams = {
            appId: params.appId,
            currency: params.currency,
            itemName: params.itemName,
            nameId: params.nameId,
            ifModifiedSince: new Date(), // making first request with current date, as usual web client behavior
        }
        let lastError: Error | null = null;
        for(let i = 0; i < params.retryCount; i++)
        {
            try {
                const response = await this.makeItemOrdersHistogramRequest(requestParams);
                if (response.status == HttpStatusCode.Ok) { // if server returned Ok, returning result
                    return this.parseOrdersHistogramResult(response);
                } 
                
                // if data not modified, since current date which we set previously 
                // we need to set If-Modified-Since header to Last-Modified header from response
                // and wait for the time which is set in Expires header or 
                if (response.status == HttpStatusCode.NotModified) { 
                    const lastModifiedHeaderString = response.headers["last-modified"];
                    requestParams.ifModifiedSince = new Date(lastModifiedHeaderString);
                    const dateHeader = new Date(response.headers.date);
                    const expiresHeader = new Date(response.headers.expires);

                    let sleepDelay = expiresHeader.getTime() - dateHeader.getTime();
                    if (sleepDelay < params.minRetryDelay) {
                        sleepDelay = params.minRetryDelay;
                    }
                    this.log(`Retrying to get item orders with new If-Modified-Since header: ${requestParams.ifModifiedSince}`, this.logger?.debug);
                    await sleep(sleepDelay);
                } else {
                    this.log("Failed handle orders histogram response, unsupported response status", this.logger?.error);
                }
            } catch (error) {
                this.log(`Failed to get item orders histogram for item: ${params.itemName} and app id: ${params}. Reason: ${error}`, this.logger?.error);
                lastError = error as any;
            }
        
        }
        this.log(`Failed to get item orders histogram for item: ${params.itemName} and app id: ${params.appId}. Retry count exceeded`, this.logger?.error);
        throw new Error(`Failed to get item orders histogram for item: ${params.itemName} and app id: ${params.appId}. Reason: ${lastError ? lastError.message! : "Retry count exceeded"}`);
    }
    //#endregion

    //#region cancel buy order
    public async cancelBuyOrder(orderId: string): Promise<boolean> {
        const requestUrl = steamUrls.steamCancelBuyOrderURL;
        let requestPayloadFrame = {
            headers: {
                Referer: steamUrls.steamMarketURL,
            },
        };

        let requestBodyFrame = {
            sessionid: this.sessionId,
            buy_orderid: orderId,
        };

        try {
            const response: AxiosResponse = await this.request.post(requestUrl, requestBodyFrame, requestPayloadFrame);
            if (response.status != HttpStatusCode.Ok) {
                this.log(
                    `Failed to cancel buy order for order id: ${orderId}. Response: ${response}`,
                    this.logger?.error
                );
                return false;
            }

            return response.data.success == EResult.OK;
        } catch (err) {
            throw new Error(`Failed to cancel buy order for order id: ${orderId}. Reason: ${err}`);
        }
    }
    //#endregion
}
