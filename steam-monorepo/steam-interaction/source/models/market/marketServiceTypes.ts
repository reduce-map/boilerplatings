import { ECurrencyCode } from "steam-user";
import { Asset } from "../asset";
import { Listing } from "./listing";

//#region getPriceHistory
export type PriceHistoryItem = {
  currency: ECurrencyCode;
  appid: number;
  itemName: string;
  encodedName: string;
};

export type PriceHistoryResult = {
  date: Date;
  price: number;
  count: number;
};
//#endregion

//#region getMarketHistory
export type MarketHistoryPage = {
  page: number;
  cntPerPage: number;
};

export type MarketHistoryResult = {
  success: boolean;
  pagesize: number;
  total_count: number;
  start: number;
  listings: boolean | Listing[];
  assets: AppAssets;
};
//#endregion

export type ItemInfo = {
  nameId: number;
  commodity: boolean;
};
//#endregion

//#region getMarketListings getItem getAllMarketListings getMyListings getAllMyListings
export type ListingsPage = {
  currentPage: number;
  cntPerPage: number;
  currency: ECurrencyCode;
};

export type MarketItemInfo = {
  marketItemName: string;
  appId: number;
};

export type ExtendedListingsPage = ListingsPage & MarketItemInfo;

export type AllListingsPage = {
  retries?: number;
  delay: number;
};

export type AssetInfoComponent = {
  classid: string;
};

export type AssetInfo = AllListingsPage & {
  assets: AssetInfoComponent[];
  appid: number;
  apiKey: string;
};
//#endregion

//#region getAllStoreItems
export type StoreItem = {
  appId: string;
  currency?: string;
  apiKey: string;
};
//#endregion

//#region sell
export type SellParams = {
  appid: number;
  assetid: string;
  price: number;
  amount: number;
  contextid: number;
};

export type ConfirmationInfo = {
  success: boolean;
  requires_confirmation: number;
  needs_mobile_confirmation?: boolean;
  needs_email_confirmation?: boolean;
  email_domain?: string;
  message?: string;
};
//#endregion

//#region removeListing
export type RemoveListingParams = {
  listingId: string;
};
//#endregion

//#region getRecentCompleted
export type RecentCompletedResult = {
  success: boolean;
  more: boolean;
  results_html: boolean;
  listinginfo: ListingInfo;
  purchaseinfo: PurchaseInfo;
  assets: AppAssets;
  currency: string[];
  hovers: boolean;

  //just useless
  //app_data: any;
  //last_time: number;
  //last_listing: string;
};

export type MarketAction = {
  link: string;
  name: string;
};
export type BaseAsset = {
  currency: number;
  appid: number;
  contextid: string;
  id: string;
  amount: string;
};

export type ListingAsset = BaseAsset & {
  market_actions?: MarketAction[];
};

export type ListingInfoItem = {
  listingid: string;
  price: number;
  fee: number;
  publisher_fee_app: number;
  publisher_fee_percent: string;
  currencyid: number;
  asset: ListingAsset;
};

export type ListingInfo = {
  [key: string]: ListingInfoItem;
};

export type PurchaseAsset = BaseAsset & {
  classid: string;
  instanceid: string;
  new_id: string;
  new_contextid: string;
};

export type PurchaseInfoItem = {
  listingid: string;
  purchaseid: string;
  paid_amount: number;
  paid_fee: number;
  currencyid: string;
  steam_fee: number;
  publisher_fee: number;
  publisher_fee_percent: string;
  publisher_fee_app: number;
  converted_paid_amount: number;
  converted_paid_fee: number;
  converted_currencyid: string;
  converted_steam_fee: number;
  converted_publisher_fee: number;
  asset: PurchaseAsset;
};

export type PurchaseInfo = {
  [key: string]: PurchaseInfoItem;
};

export type Description = {
  type?: string;
  value: string;
  color?: string;
};

export type OwnerAction = {
  link: string;
  name: string;
};

export type AssetItem = BaseAsset & {
  classid: string;
  instanceid: string;
  status: number;
  original_amount: string;
  unowned_id: string;
  unowned_contextid: string;
  background_color: string;
  icon_url: string;
  icon_url_large: string;
  descriptions: Description[];
  tradable: number;
  owner_actions?: OwnerAction[];
  actions?: OwnerAction[];
  market_actions?: OwnerAction[];
  name: string;
  name_color: string;
  type: string;
  market_name: string;
  market_hash_name: string;
  market_fee_app: number;
  commodity: number;
  market_tradable_restriction: number;
  market_marketable_restriction?: number;
  marketable: number;
  app_icon: string;
  owner: number;
};

export type AssetsId = {
  [key: string]: AssetItem;
};

export type ContextAssets = {
  [contextid: string]: AssetsId;
};

export type AppAssets = {
  [appid: string]: ContextAssets;
};

//#endregion

//#region getAllMyListings
//active
export type ItemDescriptionBasic = {
  appid: number;
  classid: string;
  instanceid: string;
  currency: number;
  background_color: string;
  icon_url: string;
  icon_url_large: string;
  descriptions: ListingDescription[];
  tradable: number;
  actions: any[]; // Placeholder for the array of actions
  name: string;
  name_color: string;
  type: string;
  market_name: string;
  market_hash_name: string;
  market_actions: any[]; // Placeholder for market actions
  commodity: number;
  market_tradable_restriction: number;
  marketable: number;
};

export type ActiveListing = ListingToConfirm & {
  asset: ItemDescriptionBasic;
};

//to confirm
export type ListingToConfirm = {
  listingid: string;
  time_created: number;
  steamid_lister: string;
  price: number;
  original_price: number;
  fee: number;
  currencyid: string;
  converted_price: number;
  converted_fee: number;
  converted_currencyid: string;
  status: number;
  active: number;
  steam_fee: number;
  converted_steam_fee: number;
  publisher_fee: number;
  converted_publisher_fee: number;
  publisher_fee_percent: string;
  publisher_fee_app: number;
  cancel_reason: number;
  item_expired: number;
  original_amount_listed: number;
  original_price_per_unit: number;
  fee_per_unit: number;
  steam_fee_per_unit: number;
  publisher_fee_per_unit: number;
  converted_price_per_unit: number;
  converted_fee_per_unit: number;
  converted_steam_fee_per_unit: number;
  converted_publisher_fee_per_unit: number;
  time_finish_hold: number;
  time_created_str: string;
};

//buy orders
export type ListingDescription = {
  type: string;
  value: string;
  color: string | null;
  label: string | null;
};

export type ItemDescriptionFull = ItemDescriptionBasic & {
  owner_descriptions: any[]; // Placeholder for the array of owner descriptions
  owner_actions: any[]; // Placeholder for the array of owner actions
  fraudwarnings: string[];
  market_fee: any; // Placeholder for market fee
  market_fee_app: any; // Placeholder for market fee app
  contained_item: any; // Placeholder for contained item
  market_actions: any[]; // Placeholder for market actions
  market_tradable_restriction: number;
  market_marketable_restriction: number;
  tags: any[]; // Placeholder for tags
  item_expiration: any; // Placeholder for item expiration
  market_buy_country_restriction: any; // Placeholder for market buy country restriction
  market_sell_country_restriction: any; // Placeholder for market sell country restriction
};

export type BuyOrder = {
  appid: number;
  hash_name: string;
  wallet_currency: number;
  price: string;
  quantity: string;
  quantity_remaining: string;
  buy_orderid: string;
  description: ItemDescriptionFull;
};

export type AllListingsResult = {
  activeListings: ActiveListing[];
  //we don't know
  listingsOnHold: any[];
  listingsToConfirm: ListingToConfirm[];
  buyOrders: BuyOrder[];
};
//#endregion

//#region MyListingsResult MyListingsPage
export type MyListingsResult = {
  pagesize: number;
  total_count: number;
  assets: Asset[];
  start: number;
  num_active_listings: number;
  listings: Listing[];
  listings_on_hold: Listing[];
  listings_to_confirm: Listing[];
  buy_orders: BuyOrder[];
};
//#endregion

export type BuyParams = {
  currency: ECurrencyCode;
  subtotal: number;
  fee: number;
  total: number;
  quantity: number;
  save_my_address: number;
};

//#region getItemsFromPage

export type AssetDescription = {
  appid: number;
  classid: string;
  instanceid: string;
  background_color: string;
  icon_url: string;
  tradable: number;
  name: string;
  name_color: string;
  type: string;
  market_name: string;
  market_hash_name: string;
  commodity: number;
};

export type PageItem = {
  name: string;
  hash_name: string;
  sell_listings: number;
  sell_price: number;
  sell_price_text: string;
  app_icon: string;
  app_name: string;
  asset_description: AssetDescription;
  sale_price_text: string;
};
//#endregion
