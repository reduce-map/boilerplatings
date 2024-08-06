import SteamUser from "steam-user";

import { LoginService } from "../../services/loginService";
import { getDefaultAccountSettings } from "../../utilities/getDefaultCookies";
import { expect } from "chai";
import { TestConfig } from "../testConfig";
import SteamTotp from 'steam-totp'
import { firstAccount, secondAccount } from "../credentials";
import { CookieValidationService } from "../../services/cookieValidationService";


// public setProxyOnSteamUser(proxy: string) 
// public logOutSteamUser() 

function passLoginServiceTests() {
	const loginService: LoginService = new LoginService(getDefaultAccountSettings(),
		TestConfig.proxy
	);
	loginSteamUserTest(loginService);
	logoutSteamUserTest(loginService);
}

function loginSteamUserTest(loginService: LoginService) {
	it("should return a Cookie instance", async () => {
		const res = await loginService.loginSteamUser(firstAccount);
		const cookieValidationService: CookieValidationService = new CookieValidationService(
			res.cookie,
			TestConfig.proxy
		);
		expect(await cookieValidationService.isCookieHaveValidSession()).to.be.true;

	});
}

function logoutSteamUserTest(loginService: LoginService) {
	it("should logout steam user", async () => {
		expect(loginService.isSteamUserLoggedIn()).to.be.true;
	    loginService.logOutSteamUser();
		expect(loginService.isSteamUserLoggedIn()).to.be.false;
	});
}

describe("Pass login service", passLoginServiceTests);



