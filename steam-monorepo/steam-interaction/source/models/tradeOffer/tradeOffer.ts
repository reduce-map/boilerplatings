import { EResult, ETradeOfferConfirmationMethod, ETradeOfferState } from "steam-user";
import { InventoryAssetItem } from "../inventory/inventoryAssetItem";
import SteamID from "steamid";

/**
 * @tradeOfferId unique id for trade offer
 * 
 * @partnerId64 your partner id that send trade offer
 * WARNING: This is not accountId that contains in TradeURL
 * 
 * @partnerSteamId this is your partner steam id
 * 
 * @expirationTime expiration datetime for trade offer
 * 
 * @escrowEnds escrow end date time
 * 
 * @token your partner token (this token contains in partner tradeUrl)
 * 
 * @isOurOffer is my created trade offer
 * 
 * @eresult trade offer result
 * 
 * @itemsToGive your items that you give to your partner
 * 
 * @itemsToReceive your partner items that you get
 */

export class TradeOffer {
	tradeOfferId?: string;
	partnerSteamId!: SteamID
	partnerId64!: string;
	message?: string;
	expirationTime?: Date;
	tradeOfferState!: ETradeOfferState;
	itemsToGive: InventoryAssetItem[] = [];
	itemsToReceive: InventoryAssetItem[] = [];
	isOurOffer!: boolean;
	timeCreated?: Date;
	timeUpdated?: Date;
	fromRealTimeTrade?: boolean;
	escrowEnds?: Date;
	confirmationMethod?: ETradeOfferConfirmationMethod;
	token?: string;
	eresult?: EResult;

	constructor(rawTradeData?: any) {
		if (!rawTradeData) {
			return;
		}

		this.tradeOfferId = rawTradeData?.tradeofferid;
		this.partnerSteamId = SteamID.fromIndividualAccountID(rawTradeData?.accountid_other.toString());

		this.partnerId64 = this.partnerSteamId.getSteamID64()
		this.message = rawTradeData?.message;
		this.tradeOfferState = rawTradeData.trade_offer_state;
		this.itemsToGive = rawTradeData.items_to_give || [];
		this.itemsToReceive = rawTradeData.items_to_receive || [];
		this.isOurOffer = rawTradeData.is_our_offer;

		this.expirationTime = rawTradeData?.expiration_time
			? new Date(rawTradeData?.expiration_time * 1000)
			: undefined;
		this.timeCreated = rawTradeData?.time_created ? new Date(rawTradeData.time_created * 1000) : undefined;
		this.timeUpdated = rawTradeData?.time_updated ? new Date(rawTradeData.time_updated * 1000) : undefined;
		this.escrowEnds = rawTradeData?.escrow_end_date ? new Date(rawTradeData.escrow_end_date * 1000) : undefined;
		this.fromRealTimeTrade = rawTradeData?.from_real_time_trade;
		this.confirmationMethod = rawTradeData?.confirmation_method || ETradeOfferConfirmationMethod.Invalid;
		this.eresult = rawTradeData?.eresult;
	}

	public addMyItem(assetItem: InventoryAssetItem) {
		this.itemsToGive.push(assetItem);
	}
	public addTheirItem(assetItem: InventoryAssetItem) {
		this.itemsToReceive.push(assetItem);
	}
}
