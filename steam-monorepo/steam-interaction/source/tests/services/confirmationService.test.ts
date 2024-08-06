import { AccountMeta } from "@team/account-contract";
import { ConfirmationAction, ConfirmationService } from "../../services/confirmationService";
import { TestConfig } from "../testConfig";
import { expect } from "chai";
import { Confirmation } from "../../models/exports";
import { firstAccount } from "../credentials";

function passConfirmationServiceTests() {
	const confirmationService: ConfirmationService = new ConfirmationService(
		TestConfig.cookie,
		{
			mobileOs: "android",
			profileId64: TestConfig.steamId.getSteamID64(),
		},
		firstAccount.identity_secret,
		TestConfig.proxy
	);

	getConfirmationsTest(confirmationService);
	respondToConfirmationTest(confirmationService);
}
function getConfirmationsTest(confirmService: ConfirmationService) {
	it("should return list of confirmations", async () => {
		const confs: Confirmation[] = await confirmService.getConfirmations();
		expect(confs).to.be.an("array");
	});
}
function respondToConfirmationTest(confirmService: ConfirmationService) {
	it("should respond to confirmation and return true", async () => {
		const confs: Confirmation[] = await confirmService.getConfirmations();
		if (confs.length != 0) {
			const res = await confirmService.respondToConfirmationById(
				confs[0].id,
				confs[0]?.nonce,
				ConfirmationAction.Accept
			);
			expect(res.success).to.be.true;
		}
	});
}


describe("Pass confirmation service tests", passConfirmationServiceTests);
