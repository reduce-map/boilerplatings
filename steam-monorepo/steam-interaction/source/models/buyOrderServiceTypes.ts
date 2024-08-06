import { EResult } from "steam-session";
import { ECurrencyCode } from "steam-user";

export type PlacedOrder = {
	success: boolean;
	status: EResult;
	orderId: string | null;
};

export type Order = {
	currency: ECurrencyCode;
	appid: number;
	market_hash_name: string;
	price_total: number;
	quantity: number;
};

export type ItemOrdersHistogramParams = {
	nameId: string;
	currency: number;
	itemName: string;
	appId: number;
	ifModifiedSince?: Date;
};

export type  ItemOrdersHistogramBrowserSimulationParams = {
    nameId: string;
	currency: number;
	itemName: string;
	appId: number;
	retryCount: number;
	/**
	 * Min delay in milliseconds to wait before retrying the request. 
	 * The recommendation is 5000.
	 * If (expires header from response - current date) will be less than minRetryDelay, then minRetryDelay will be used, otherwise ignored.
	 */
	minRetryDelay: number;

};

export type OrderPricePoint={
    price:number,
    count:number
}
export type OrdersHistogram = {
	buyOrders: OrderPricePoint[];
	sellOrders: OrderPricePoint[];
	lowestSellOrder: number;
	highestBuyOrder: number;
	date: Date;  // response header, represents the date of the result
	expireDate: Date; // response header, represents expire date of the result
	lastModified: Date; // response header, represents last modified date of histogram

};

export type OrderStatus = {
	success: number;
	active: number;
	purchased: number;
	quantity: string;
	quantity_remaining: string;
	purchases: any[];
};
