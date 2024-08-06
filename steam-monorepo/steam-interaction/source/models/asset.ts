import { ECurrencyCode } from "steam-user"

/**
 * @appid application (game) id
 * 
 * @contextid application context id
 * 
 * @id The item's unique ID within its app+context.
 * 
 * @classid The first half of the item cache identifier. The classid is enough to get you basic details about the item.
 * 
 * @instanceid The second half of the item cache identifier.
 * 
 * @amount How much of this item is in this stack.
 * 
 * @commodity "1" if this is a commodity item (buy/sell orders) or "0" otherwise
 * 
 * @market_tradable_restriction How many days for which the item will be untradable after being sold on the market.
 * 
 * @market_marketable_restriction How many days for which the item will be unmarketable after being sold on the market.
 * 
 * @tradable true if the item can be traded, false if not.
 * 
 * @name display name
 * 
 * @name_color The render color of the asset name, in hexadecimal.
 * 
 * @type The "type" that's shown under the game name to the right of the game icon.
 * 
 * @marketable true if the item can be listed on the Steam Community Market, false if not.
 */
export class Asset{
      currency?: ECurrencyCode
      appid?: number
      contextid?: string
      id?: string
      classid?:string
      instanceid?: string
      amount?: string
      commodity?: number
      market_tradable_restriction?: number
      market_marketable_restriction?: number
      tradable?: boolean
      name?: string
      name_color?: string
      type?: string
      marketable?:boolean
      descriptions: any
}