import { describe } from "mocha";
import { expect } from "chai";
import { AccountService } from "../../services/accountService";
import SteamUser, { EPrivacyState } from "steam-user";

import {LoginService } from "../../services/loginService";
import { getDefaultAccountSettings } from "../../utilities/getDefaultCookies";

import { AccountMeta } from "@team/account-contract";
import { TestConfig } from "../testConfig";
import { TradeUrlResponse } from "../../models/exports";
import { EPrivacySettingName } from "../../services/controllers/privacySettingsController";
import { EPersonalInfoSettingName } from "../../services/controllers/personalInfoController";
import { firstAccount } from "../credentials";

function passAccountServiceTests() {
	let accountService: AccountService = createAccountService();

	before(async () => await accountService.setSteamUser(await getSteamUser()));

	registerWebApiKeyTest(accountService, "localhost");
	getWebApiKeyTest(accountService);
	clearNameHistoryTest(accountService);
	getHistoryNameTest(accountService);
	setPrivacySettingsTest(accountService);
	setPersonalInfoTest(accountService);
	getTradeUrlTest(accountService);
	changeTradeUrlTest(accountService);
	getWalletBalanceTests(accountService);
}

function createAccountService() {
	const accountMeta: AccountMeta = new AccountMeta(TestConfig.steamId.getSteamID64());
	accountMeta.cookie = TestConfig.cookie;
	const accountService: AccountService = new AccountService(
		new SteamUser(),
		accountMeta,
		TestConfig.cookie.sessionid!.toString(),
		
	);
	return accountService;
}

async function getSteamUser(): Promise<SteamUser> {
	const loginService = new LoginService(getDefaultAccountSettings());
	await loginService.loginSteamUser(firstAccount);
	return loginService.steamUser;
}

function registerWebApiKeyTest(accountService: AccountService, domain: string) {
	it("should register a new web api key", async () => {
		const res: boolean = await accountService.registerWebApiKey(domain);
		expect(res).to.be.true;
	});
}
function getWebApiKeyTest(accountService: AccountService) {
	it("should return a web api key string", async () => {
		const apiKey = await accountService.getWebApiKey();
		expect(apiKey).not.to.be.undefined;
	});
}

function clearNameHistoryTest(accountService: AccountService) {
	it("should clear history name", async () => {
		const historyName: boolean = await accountService.clearNameHistory();
		expect(historyName).not.to.be.false;
	});
}
function getHistoryNameTest(accountService: AccountService) {
	it("should return a history name item", async () => {
		let historyItem = await accountService.getNameHistory();
		expect(historyItem).to.be.an("array");
	});
}

function setPrivacySettingsTest(accountService: AccountService) {
	it("should change privacy settings", async () => {
		const res = await accountService.privacySettings.setPrivacySetting(EPrivacySettingName.Profile, EPrivacyState.FriendsOnly);
		
		expect(res).to.be.true;
	});
}

function setPersonalInfoTest(accountService: AccountService) {
	it("should change personal info", async () => {
		const res = await accountService.personalInfoSettings.setPersonalInfo(EPersonalInfoSettingName.RealName, "BEER")
		expect(res).to.be.true;
	});
}

function changeTradeUrlTest(accountService: AccountService) {
	it("should change and return trade url response object", async () => {
		const tradeUrl: TradeUrlResponse = await accountService.changeTradeUrl();
		expect(tradeUrl).to.be.an("object");
	});
}
function getTradeUrlTest(accountService: AccountService) {
	it("should change and return trade url response object", async () => {
		const tradeUrl: TradeUrlResponse = await accountService.getTradeUrl();
		expect(tradeUrl).to.be.an("object");
	});
}

function getWalletBalanceTests(accountService: AccountService) {
	it("should return wallet balance", async () => {
		const balance = await accountService.getWalletBalance();
		expect(balance).not.to.be.null;
	}).timeout(20000);
}

describe("Account service test", passAccountServiceTests);
