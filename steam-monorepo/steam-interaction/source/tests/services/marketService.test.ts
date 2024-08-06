import SteamUser, { ECurrencyCode } from "steam-user";
import {
	ItemInfo,
	PriceHistoryItem,
	PriceHistoryResult,
	MarketHistoryPage,
	MarketHistoryResult,
	RecentCompletedResult,
	ExtendedListingsPage,
	AllListingsPage,
	ListingsPage,
	MyListingsResult,
	SellParams,
	BuyParams,
	MarketItemInfo,
} from "../../models/exports";
import { AccountMeta, Cookie } from "@team/account-contract";
import { MarketService } from "../../services/marketService";
import { expect } from "chai";
import { ContextManager } from "../../utilities/contextManager";
import { TestConfig } from "../testConfig";
import { Apps } from "../../enums/apps";

function passMarketServiceTests() {
	const marketService: MarketService = new MarketService(TestConfig.cookie);
	describe("Pass get price history tests", () => {
		passGetPriceHistoryTests(marketService);
	});
	describe("Pass get market history tests", () => {
		passGetMarketHistoryTests(marketService);
	});
	describe("Pass get item info tests", () => {
		passGetItemInfoTests(marketService);
	});

	describe("Pass listings tests", () => {
		passListingsTests(marketService);
	});

	describe("Pass sell item tests", () => {
		passSellTests(marketService);
	});
	describe("Pass remove listing tests", () => {
		passRemoveListingTests(marketService);
	});
	describe("Pass buy tests", () => {
		passBuyTests(marketService);
	});

	getItemsFromPageTest(marketService);
	getMarketItemsCountTest(marketService);
}

function passGetPriceHistoryTests(marketService: MarketService) {
	const historyItem: PriceHistoryItem = {
		currency: ECurrencyCode.GBP,
		appid: Apps.CSGO,
		itemName: "Antwerp 2022 Legends Sticker Capsule",
		encodedName: "",
	};

	getPriceHistoryTest(historyItem, marketService);
}
function getPriceHistoryTest(historyItem: PriceHistoryItem, marketService: MarketService) {
	it("should return a price history", async () => {
		const priceHistory = await marketService.getPriceHistory(historyItem);
		expect(priceHistory).not.to.be.null;
		expect(priceHistory).to.be.a("array");
	});
}
function passGetMarketHistoryTests(marketService: MarketService) {
	const historyPage: MarketHistoryPage = {
		page: 1,
		cntPerPage: 100,
	};
	getMarketHistoryTest(historyPage, marketService);
}
function getMarketHistoryTest(marketHistoryPage: MarketHistoryPage, marketService: MarketService) {
	it("should return market history result", async () => {
		const marketHistory = await marketService.getMarketHistory(marketHistoryPage.page, marketHistoryPage.cntPerPage);
		expect(marketHistory).to.be.an("object");
		expect(marketHistory.success).is.true;
	});
}
function passGetItemInfoTests(marketService: MarketService) {
	getItemInfoTest(marketService);
}
function getItemInfoTest(marketService: MarketService) {
	it("should return info about item", async () => {
		const itemInfo = await marketService.getItemInfo(Apps.DOTA2, "Helm of Retribution");
		expect(itemInfo).to.be.a("object");
	});
}
function passListingsTests(marketService: MarketService) {
	const params: ExtendedListingsPage = {
		marketItemName: "Mega-Kills: Cave Johnson",
		currency: ECurrencyCode.USD,
		cntPerPage: 100,
		currentPage: 5,
		appId: 570,
	};
	getMarketListingsTest(params, marketService);
	getMyListingsTest(
		{
			currency: ECurrencyCode.USD,
			currentPage: 1,
			cntPerPage: 100,
		},
		marketService
	);
}

function getMarketListingsTest(params: ExtendedListingsPage, marketService: MarketService) {
	it("should return an market listings page", async () => {
		const page = await marketService.getMarketListings(params);
		expect(page.pageSize).not.to.be.undefined;
		expect(page).to.be.an("object");
	});
}
function getMyListingsTest(params: ListingsPage, marketService: MarketService) {
	it("should return my listings", async () => {
		const page = await marketService.getMyListings(params.currentPage);
		expect(page.pageSize).not.to.be.null;
		expect(page).to.be.an("object");
	});
}

function passSellTests(marketService: MarketService) {
	const appId = Apps.DOTA2;
	const params: SellParams = {
		amount: 1,
		contextid: ContextManager.getContextId(appId),
		appid: appId,
		assetid: "28377029318",
		price: 100,
	};
	sellTest(params, TestConfig.steamId.getSteamID64(), marketService);
}
function sellTest(params: SellParams, steamId64: string, marketService: MarketService) {
	it("should sell item in market and return true", async () => {
		const res = await marketService.sell(params, steamId64);
		expect(res).to.be.a.true;
	});
}
function passRemoveListingTests(marketService: MarketService) {
	const listingId: string = "7231148125631140232";
	removeListingTest(listingId, marketService);
}
function removeListingTest(listingid: string, marketService: MarketService) {
	it("should return boolean value if remove listing is success", async () => {
		const res: boolean = await marketService.removeListing(listingid);
		expect(res).to.be.a.true;
	});
}
function passBuyTests(marketService: MarketService) {
	const marketItemInfo:MarketItemInfo={
		marketItemName: "Summer's Mirth",
		appId:570
	}
	const listingId = "4376994758654887310";
	const buyParams: BuyParams = {
		subtotal: 84,
		fee: 12,
		total: 96,
		currency: ECurrencyCode.RUB,
		save_my_address: 0,
		quantity: 1,
	};
	buyTest(marketItemInfo, listingId, buyParams, marketService);
}

function buyTest(marketItemInfo:MarketItemInfo, listingId: string, buyParams: BuyParams, marketService: MarketService) {
	it("should return true if we have success result", async () => {
		const res = await marketService.buy(buyParams,listingId,marketItemInfo);
		expect(res).to.be.a.true;
	});
}

function getItemsFromPageTest(marketService: MarketService){
	it("should get items from page", async ()=>{
		const items = await marketService.getItemsFromPage(1, Apps.DOTA2, 40);
		expect(items.length).not.equals(0);
	})
}

function getMarketItemsCountTest(marketService: MarketService){
	it("should get items counts", async ()=>{
		const count: number = await marketService.getMarketItemsCount(Apps.DOTA2);
		expect(count).not.equals(0);
	})
}

describe("Pass market service tests", passMarketServiceTests);
