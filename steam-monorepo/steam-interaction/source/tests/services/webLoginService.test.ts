import { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { WebLoginService } from "../../services/webLoginService";
import { secondAccount, firstAccount, TestAccountCredentials } from "../credentials";
import { TestConfig } from "../testConfig";
import { getDefaultAccountSettings } from "../../utilities/getDefaultCookies";
import { CookieValidationService } from "../../services/cookieValidationService";
import { AccountCredentials, convertObjectToCookieHeader } from "@team/account-contract";
import { convertCookieEntriesToCookieContract } from "../../utilities/convertCookieEntriesToCookieContract";


function passWebLoginServiceTests() {
	const webLoginService: WebLoginService = new WebLoginService(getDefaultAccountSettings(), TestConfig.proxy);
	testLogOnToOneAccount(webLoginService, firstAccount);
	testRefreshSession(webLoginService, firstAccount);
}


function testLogOnToOneAccount(webLoginService: WebLoginService, credentials: AccountCredentials) {
	it("should logon to account via credentials", async () => {
		const loginResult = await webLoginService.logOnViaCredentials(credentials)
		const convertedCookie = convertCookieEntriesToCookieContract(loginResult.cookies, CookieValidationService.requestDomain)

		const cookieValidationService: CookieValidationService = new CookieValidationService(
			convertedCookie,
			TestConfig.proxy
		);
		
		expect(await cookieValidationService.isCookieHaveValidSession()).to.be.true;
	});
}

function testRefreshSession(webLoginService: WebLoginService, credentials: TestAccountCredentials) {

	it("should refresh session", async () => {
		if(!credentials.webRefreshToken || credentials.webRefreshToken.length < 10)
			throw new Error("webRefreshToken token is not present in test config")
		const refreshResult = await webLoginService.refreshSession(credentials.webRefreshToken)
		const convertedRefreshCookie = convertCookieEntriesToCookieContract(refreshResult.cookies, CookieValidationService.requestDomain)
		const cookieValidationService: CookieValidationService = new CookieValidationService(
			convertedRefreshCookie,
			TestConfig.proxy
		);
		expect(await cookieValidationService.isCookieHaveValidSession()).to.be.true;
	});

	it("should return error on incorrect token ", async () => {
		if(!credentials.webRefreshToken || credentials.webRefreshToken.length < 10)
		throw new Error("webRefreshToken token is not present in test config")
		const incorrectToken = credentials.webRefreshToken.substring(0, credentials.webRefreshToken.length - 9) + "incorrect";
		let error: Error | undefined;
		try {
			await webLoginService.refreshSession(incorrectToken)
		}
		catch(e) {
			error = e as any;
		}
		expect(error).to.be.instanceOf(Error);
	});
}


describe("WebLoginService tests", passWebLoginServiceTests);
