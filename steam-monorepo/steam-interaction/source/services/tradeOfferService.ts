import { Cookie } from "@team/account-contract";
import { ConfirmationInfo, TradeOffer } from "../models/exports";
import {
    GetAllTradeOffersParams,
    GetAllTradeOffersResponse,
    TradeApiParams,
} from "../models/tradeOffer/tradeOfferServiceTypes";
import { AxiosRequestService } from "./infrastructure/requestService";
import { AxiosRequestConfig, AxiosResponse, HttpStatusCode } from "axios";
import { steamUrls } from "../steam-urls";
import { ETradeOfferConfirmationMethod, ETradeOfferState } from "steam-user";
import { EOfferFilter } from "../enums/EOfferFilter";
import { Logger } from "winston";
import { BaseOptions } from "vm";


export enum TradeOfferAccessType{
    ApiKey = "key",
    AccessToken = "access_token",
}

export type TradeOfferServiceSettings = {
    offerAccessType: TradeOfferAccessType;
    apiKey?: string;
};

export type TradeOfferCancelResponse = {
    tradeOfferId: string;
    success: boolean;
}

export class TradeOfferService extends AxiosRequestService {
    settings: TradeOfferServiceSettings;
    loginSecureKey?: string;
    sessionId?: string;
    constructor(settings: TradeOfferServiceSettings, cookie: Cookie, proxy?: string, logger?: Logger) {
        super(cookie, proxy, logger);
        this.settings = settings;
        this.sessionId = cookie.sessionid?.toString();
        this.loginSecureKey = decodeURIComponent(cookie.steamLoginSecure.toString());
    }

    //#region get one offer and get all offers
    public async getOffer(offerId: string): Promise<TradeOffer | null> {
        const params: TradeApiParams = {
            methodName: "GetTradeOffer",
            urlParams: {
                tradeofferid: offerId,
            },
        };
        const data = await this.sendGetOffersRequest("GET", params);
        if (!data.offer.tradeofferid) {
            return null;
        }
        return new TradeOffer(data.offer);
    }

    public async getReceivedOffers(
        eOfferFilter: EOfferFilter = EOfferFilter.All,
        defaultHistoricalCutoff?: Date,
        language: string = "english"
    ): Promise<TradeOffer[] | null> {
        return this.getOffersInternal(false, language, eOfferFilter, defaultHistoricalCutoff);
    }

    public async getSentOffers(
        eOfferFilter: EOfferFilter = EOfferFilter.All,
        defaultHistoricalCutoff?: Date,
        language: string = "english"
    ): Promise<TradeOffer[] | null> {
        return this.getOffersInternal(true, language, eOfferFilter, defaultHistoricalCutoff);
    }

    private async getOffersInternal(
        getSentOffers: boolean,
        language: string = "english",
        eOfferFilter: EOfferFilter = EOfferFilter.All,
        defaultHistoricalCutoff?: Date
    ): Promise<TradeOffer[] | null> {
        const historicalCutoff: Date = defaultHistoricalCutoff || new Date(Date.now());
        const tradeApiParams: TradeApiParams = {
            methodName: "GetTradeOffers",
            urlParams: {
                get_sent_offers: getSentOffers,
                get_received_offers: !getSentOffers,
                get_descriptions: false,
                language: language,
                time_historical_cutoff: Math.floor(historicalCutoff.getTime() / 1000),
                active_only: eOfferFilter == EOfferFilter.ActiveOnly,
                historical_only: eOfferFilter == EOfferFilter.HistoricalOnly,
            },
        };

        const data = await this.sendGetOffersRequest("GET", tradeApiParams);
        if (!data) {
            return null;
        }

        const key = getSentOffers ? "trade_offers_sent" : "trade_offers_received";
        const tradeOffers: TradeOffer[] = data[key]?.map((rawData: any) => new TradeOffer(rawData)) || [];
        return tradeOffers;
    }

    //#endregion

    //#region send get offers request
    private async sendGetOffersRequest(httpMethod: string, params: TradeApiParams): Promise<any> {
        const requestConfig: AxiosRequestConfig = {
            method: httpMethod,
            baseURL: steamUrls.steamPoweredURL,
            params: params.urlParams,
            data: params.data,
            responseType: "json",
        };

    
        let requestOptionKey = this.settings.offerAccessType == TradeOfferAccessType.ApiKey ? this.settings.apiKey : this.loginSecureKey?.split('||')[1];
        if(!requestOptionKey){
            throw new Error(`No valid key specified for ${this.settings.offerAccessType} found to send request`);
        }

        requestConfig.params[this.settings.offerAccessType] = requestOptionKey;

        requestConfig.url = `/${params.interface || "IEconService"}/${params.methodName}/v${params.version || 1}/`;

        const response: AxiosResponse = await this.request.request(requestConfig);
        if (response.status != HttpStatusCode.Ok) {
            this.log(`Failed to get offer by ${requestConfig.url}. Response data: ${response.data}`, this.logger?.warn);
            return undefined;
        }

        return response.data.response;
    }


    //#endregion

    //#region create new empty offer
    public createOffer(partnerId64: string, token: string): TradeOffer {
        let offer: TradeOffer = new TradeOffer();
        offer.token = token;
        offer.partnerId64 = partnerId64;
        offer.isOurOffer = true;
        offer.fromRealTimeTrade = false;
        return offer;
    }
    //#endregion

    //#region send offer and update offer after send
    public async sendOffer(offer: TradeOffer): Promise<TradeOffer> {
        if (offer.tradeOfferId) {
            throw new Error(`Cannot send an offer that has already been sent. Offer ID: ${offer.tradeOfferId}`);
        }
        if (offer.itemsToGive.length + offer.itemsToReceive?.length == 0) {
            throw new Error(`Cannot send an offer with no items.`);
        }
        const offerData = {
            newversion: true,
            version: offer.itemsToGive.length + offer.itemsToReceive.length + 1,
            tradeoffermessage: offer.message,
            me: {
                assets: offer.itemsToGive,
                currency: [],
                ready: false,
            },
            them: {
                assets: offer.itemsToReceive,
                currency: [],
                ready: false,
            },
        };

        const tradeOfferParams: any = {};
        if (offer.token) tradeOfferParams.trade_offer_access_token = offer.token;
        const headers = {
            Referer: `${steamUrls.steamTradeOfferURL}new/?partner=${offer.partnerId64}${
                offer.token ? "&token=" + offer.token : ""
            }`,
        };
        const data = {
            sessionid: this.sessionId,
            serverid: 1,
            partner: offer.partnerId64,
            tradeoffermessage: offer.message || "",
            json_tradeoffer: JSON.stringify(offerData),
            captcha: "",
            trade_offer_create_params: JSON.stringify(tradeOfferParams),
        };
        try {
            const response: AxiosResponse = await this.request.post(steamUrls.steamSendTradeOfferURL, data, {
                headers: headers,
            });

            this.updateTradeOfferAfterSend(response.data, offer);
            return offer;
        } catch (err) {
            throw new Error(`Failed to send offer, Reason: ${err}`);
        }
    }

    private updateTradeOfferAfterSend(data: any, offer: TradeOffer) {
        if (data.strError) {
            throw new Error(data.strError);
        }
        const expirationPeriod = 1209600000;
        if (data.tradeofferid) {
            offer.tradeOfferId = data.tradeofferid;
            offer.tradeOfferState = ETradeOfferState.Active;
            offer.timeCreated = new Date();
            offer.timeUpdated = new Date();
            offer.expirationTime = new Date(Date.now() + expirationPeriod);
        }
        offer.confirmationMethod = ETradeOfferConfirmationMethod.Invalid;
        if (data.needs_email_confirmation) {
            offer.tradeOfferState = ETradeOfferState.CreatedNeedsConfirmation;
            offer.confirmationMethod = ETradeOfferConfirmationMethod.Email;
        }
        if (data.needs_mobile_confirmation) {
            offer.tradeOfferState = ETradeOfferState.CreatedNeedsConfirmation;
            offer.confirmationMethod = ETradeOfferConfirmationMethod.MobileApp;
        }
    }
    //#endregion

    //#region accept and decline offer
    public async acceptOffer(offerId: string, partnerId: string): Promise<ConfirmationInfo> {
        const requestUrl = `${steamUrls.steamTradeOfferURL}${offerId}/accept`;
        const headers = {
            Referer: `${steamUrls.steamTradeOfferURL}${offerId}/`,
        };
        try {
            this.log(`Accepting offer with id: ${offerId} for partner: ${partnerId}`, this.logger?.debug);
            const response: AxiosResponse = await this.request.post(
                requestUrl,
                {
                    sessionid: this.sessionId,
                    serverid: 1,
                    tradeofferid: offerId,
                    partner: partnerId,
                },
                { headers: headers }
            );
            return response.data;
        } catch (err) {
            throw new Error(`Failed accept offer, Reason: ${err}`);
        }
    }
    
    public async cancelOffer(offerId: string, isOurOffer: boolean = true): Promise<TradeOfferCancelResponse> {
        const request_url = `${steamUrls.steamTradeOfferURL}${offerId}/${isOurOffer ? "cancel" : "decline"}`;
        try {
            this.log(`Cancelling or declining offer with id: ${offerId}`, this.logger?.debug);
            const response: AxiosResponse = await this.request.post(request_url, {
                sessionid: this.sessionId,
            });

            return {
                tradeOfferId: response.data.tradeofferid,
                success: response.data.tradeofferid ? true : false,
            };
        } catch (err) {
            throw new Error(`Failed cancel or decline offer, Reason: ${err}`);
        }
    }
    //#endregion
}
