import { TradeOfferAccessType, TradeOfferService } from "../../services/tradeOfferService";
import { TestConfig } from "../testConfig";
import { expect } from "chai";
import { InventoryService } from "../../services/inventoryService";
import {
	GetAllTradeOffersParams,
	GetAllTradeOffersResponse,
	InventoryAssetItem,
	TradeOffer,
} from "../../models/exports";
import { GetInventoryParams, GetInventoryResult } from "../../models/inventory/inventoryServiceTypes";
import { EResult, ETradeOfferConfirmationMethod, ETradeOfferState } from "steam-user";
import { EOfferFilter } from "../../enums/EOfferFilter";
import { Apps } from "../../enums/apps";

function passTradeOfferServiceTests() {
	const tradeOfferService: TradeOfferService = new TradeOfferService(
		{
			offerAccessType: TradeOfferAccessType.AccessToken,
		},
		TestConfig.cookie,
		TestConfig.proxy
	);
	getOfferTest(tradeOfferService);
	getOffersTest(tradeOfferService);
	createOfferTest(tradeOfferService);
	sendOfferTest(tradeOfferService);
	acceptOfferTest(tradeOfferService);
	declineOfferTest(tradeOfferService);
}
function getOfferTest(tradeOfferService: TradeOfferService) {
	it("should return trade offer by offerID", async () => {
		const offerID = "5489849179";
		const trade = await tradeOfferService.getOffer(offerID);

		expect(trade).not.to.be.null;
		expect(trade).to.be.instanceof(TradeOffer);
	});
}
function getOffersTest(tradeOfferService: TradeOfferService) {
	it("should return all trade offers", async () => {
		const res: TradeOffer[] | null = await getOffers(tradeOfferService);
		expect(res).not.to.be.null;
		expect(res).to.be.an("object");
	});
}
async function getOffers(tradeOfferService: TradeOfferService): Promise<TradeOffer[] | null> {
	
	return await tradeOfferService.getSentOffers();
}
function createOfferTest(tradeOfferService: TradeOfferService) {
	it("should create empty trade offer", async () => {
		const res = await tradeOfferService.createOffer("76561199111873879", "lyqEqgxg");
		expect(res).to.be.instanceof(TradeOffer);
	});
}
function sendOfferTest(tradeOfferService: TradeOfferService) {
	it("should send offer", async () => {
		const offer = await createSimpleTradeOffer(tradeOfferService);
		const response = await tradeOfferService.sendOffer(offer);
		expect(response).to.be.an("object");
	});
}

async function createSimpleTradeOffer(tradeOfferService: TradeOfferService): Promise<TradeOffer> {
	const partnerId = "76561199032664256";
	const tradeOffer = tradeOfferService.createOffer(partnerId, "lyqEqgxg");

	const myItem: InventoryAssetItem | null = await getFirstInventoryItem(TestConfig.steamId.getSteamID64());
	if (myItem) {
		tradeOffer.addMyItem(myItem);
	}

	const partnerItem: InventoryAssetItem | null = await getFirstInventoryItem(partnerId);
	if (partnerItem) {
		tradeOffer.addTheirItem(partnerItem);
	}

	tradeOffer.message = "This trade offer for you";
	return tradeOffer;
}
async function getFirstInventoryItem(profileId: string): Promise<InventoryAssetItem | null> {
	const inventoryService = new InventoryService(TestConfig.cookie, undefined);
	const inventoryParams: GetInventoryParams = {
		profileId64: profileId,
		appID: Apps.DOTA2,
		count: 1,
	};
	const inventory: GetInventoryResult | null = await inventoryService.getInventory(inventoryParams);
	if (!inventory?.assets) {
		return null;
	}
	return inventory?.assets[0];
}
function acceptOfferTest(tradeOfferService: TradeOfferService) {
	it("should accept offer and return success=true", async () => {
		const offers = await tradeOfferService.getReceivedOffers();
		const activeOffer = offers?.find((x) => x.tradeOfferState == ETradeOfferState.Active);
		if (!activeOffer) {
			throw new Error("You not have any active trade offer");
		}
		if(!activeOffer.tradeOfferId){
			return
		}
		const res = await tradeOfferService.acceptOffer(activeOffer.tradeOfferId, activeOffer.partnerId64);
		expect(res?.success).to.be.true;
	});
}
function declineOfferTest(tradeOfferService: TradeOfferService) {
	it("should decline or cancel offer", async () => {
		const offers = await  tradeOfferService.getSentOffers();
		const activeOffer = offers?.find(
			(x) =>
				x.tradeOfferState == ETradeOfferState.Active ||
				x.tradeOfferState == ETradeOfferState.CreatedNeedsConfirmation
		);
		if (!activeOffer) {
			throw new Error("You not have any active trade offer");
		}
		if(!activeOffer.tradeOfferId){
			return
		}
		const res = await tradeOfferService.cancelOffer(activeOffer.tradeOfferId);
		expect(res.success).to.be.true;
	});
}

describe("Pass trade offer service tests", passTradeOfferServiceTests);
