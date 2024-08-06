import { EOfferFilter } from "../../enums/EOfferFilter";
import { TradeOffer } from "./tradeOffer";

export type TradeApiParams = {
	methodName: string;

	data?: any;
	urlParams?: any;
	version?: number;
	interface?: string;
};

export type GetAllTradeOffersParams = {
	language: string;
	filter: EOfferFilter;

	historicalCutoff?: Date;
};
export type GetAllTradeOffersResponse = {
	sendedTradeOffers: TradeOffer[];
	receivedTradeOffers: TradeOffer[];
};

export type TradeOfferResult = {
	success: boolean;
	status: number;
};
