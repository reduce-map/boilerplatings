import { Page } from "./page";
/**
 * @listings array pages with listings
 * 
 * @commodity true if this is a commodity item (buy/sell orders) or false otherwise
 * 
 * @appid The AppID of the game to which this item belongs.
 * 
 * @classid The first half of the item cache identifier. The classid is enough to get you basic details about the item.
 */
export class Item {
	listings?: Page[];
	commodity?: boolean;
	nameId?: number;
	appid?: number;
	classid?: string;
}
