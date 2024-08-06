import { expect } from "chai";
import { StoreService } from "../../services/storeService";
import { TestConfig } from "../testConfig";

function passStoreService() {
	const storeService: StoreService = new StoreService(TestConfig.cookie, TestConfig.proxy);
	redeemWalletCodeTest(storeService);
}
function redeemWalletCodeTest(storeService: StoreService) {
	it("should redeem wallet code", async () => {
		const res = await storeService.redeemWalletCode("ff");
		expect(res).to.be.a("object");
	});
}

describe("pass store service tests", passStoreService);
