import { expect } from "chai";
import { BuyOrderService } from "../../services/buyOrderService";
import { TestConfig } from "../testConfig";
import { ECurrencyCode } from "steam-user";
import { Order } from "../../models/exports";
import { EResult } from "steam-session";
import { Apps } from "../../enums/apps";

function passBuyOrderServiceMethods() {
	const buyOrderService: BuyOrderService = new BuyOrderService(
		TestConfig.cookie,
		TestConfig.proxy
	);
	placeBuyOrderTest(buyOrderService);
	getBuyOrderStatusTest(buyOrderService);
	getItemOrdersTest(buyOrderService);
	cancelBuyOrderTest(buyOrderService);
}
function placeBuyOrderTest(buyOrderService: BuyOrderService) {
	it("should create new order", async () => {
		const order: Order = {
			currency: ECurrencyCode.RUB,
			appid: Apps.CSGO,
			market_hash_name: "Fracture Case",
			price_total: 112,
			quantity: 1,
		};
		const res = await buyOrderService.placeBuyOrder(order);
		expect(res).not.to.be.null;
		expect(res?.success).to.be.true;
	});
}

function getBuyOrderStatusTest(buyOrderService: BuyOrderService) {
	it("should return order by status", async () => {
		const orderId = "6621666187";
		const res = await buyOrderService.getBuyOrderStatus(orderId);
		expect(res?.success).equal(EResult.OK);
	});
}

function getItemOrdersTest(buyOrderService: BuyOrderService) {
	it("should return item all orders", async () => {
		const params = { nameId: "176321160", currency: ECurrencyCode.RUB, appId: 570, itemName: "Doll of the Dead" };
		const res = await buyOrderService.getItemOrdersHistogram(params);
		expect(res).not.to.be.null;
	});
}

function cancelBuyOrderTest(buyOrderService: BuyOrderService) {
	it("should cancel order", async () => {
		const orderId = "6621500342";
		const res = await buyOrderService.cancelBuyOrder(orderId);
		expect(res).to.be.true;
	});
}

describe("Pass buy order service methods", passBuyOrderServiceMethods);
