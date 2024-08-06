import { Asset } from "../asset";
/**
 * @listingid unique id listing
 * 
 * @price price 
 * 
 * @fee comission for purchasing 
 * 
 * @publisher_fee_app unique app id
 * 
 * @publisher_fee_percent comission percent, that pay buyer
 * 
 * @asset information about the item being asset
 * 
 * @tradable 1 if the item can be traded, 0 if not.
 * 
 * @market_name The item's market name.
 * 
 * @market_hash_name The item's universal market name. This identifies the item's market listing page.
 * 
 * @commodity "1" if, on the Steam Community Market, this item will use buy orders. "0" if not.
 * 
 * @market_tradable_restriction How many days for which the item will be untradable after being sold on the market.
 * 
 * @market_marketable_restriction How many days for which the item will be unmarketable after being sold on the market.
 * 
 * @marketable "1" if the item can be listed on the Steam Community Market, "0" if not.
 * 
 * fields with -converted and currencyid is a not required fields that return Steam 
 */
export class Listing {
	listingid?: string;
	price?: number;
	fee?: number;
	publisher_fee_app?: number;
	publisher_fee_percent?: string;
	steam_fee?: number;
	publisher_fee?: number;
	asset?: Asset;
	tradable?: number
	market_name?: string
	market_hash_name?: string
	commodity?: number
	market_tradable_restriction?: number
	market_marketable_restriction?: number
	marketable?: number

	currencyid?: number;
	converted_price?: number;
	converted_fee?: number;
	converted_currencyid?: number;
	converted_steam_fee?: number;
	converted_publisher_fee?: number;
	converted_price_per_unit?: number;
	converted_fee_per_unit?: number;
	converted_steam_fee_per_unit?: number;
	converted_publisher_fee_per_unit?: number;
}
