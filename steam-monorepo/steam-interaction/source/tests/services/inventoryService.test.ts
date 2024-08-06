import { InventoryService } from "../../services/inventoryService";
import { TestConfig } from "../testConfig";
import { expect } from "chai";

import { GetInventoryParams, GetInventoryResult } from "../../models/inventory/inventoryServiceTypes";
import { InventoryAssetItem } from "../../models/exports";
import { Apps } from "../../enums/apps";
import { convertObjectToCookieHeader } from "@team/account-contract";

function passInventoryServiceTests() {
	let inventoryService: InventoryService = new InventoryService(TestConfig.cookie, TestConfig.proxy);
	
	const params: GetInventoryParams = {
		appID: Apps.DOTA2,
		language: "ru",
		profileId64: "76561199035699070",
		count: 5,
	};
	getInventoryTest(params, inventoryService)
}

function getInventoryTest(params: GetInventoryParams, inventoryService: InventoryService) {
	it("should return user inventory by parameters", async () => {
		const inventory = await inventoryService.getInventory(params)
		expect(inventory).not.to.be.null
	})
}

describe("Pass inventory service tests",passInventoryServiceTests)
