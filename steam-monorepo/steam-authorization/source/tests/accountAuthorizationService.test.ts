import { describe, it, before } from "mocha";
import './global.test'
import { setupGlobal } from "./global.test";
import { SteamAccount, IRepository } from "@team/polydata";
import { REPOSITORIES_TYPES } from "./config/injection/repositories.types";
import {AccountWebAuthorizationService} from "../services/accountService";
import { expect } from "chai";
import {AccountRepositoryController} from "../controllers/accountRepositoryController";
import { CookieEntry } from "../../../steam-interaction/source/models/loginServiceTypes";

var accountAuthorizationService: AccountWebAuthorizationService;
var accountRepositoryController : AccountRepositoryController;
var testAccount : SteamAccount;
var accountRepository: IRepository<SteamAccount>;

before(async() =>{
    await setupGlobal();
    accountRepositoryController = containerIoC.get<AccountRepositoryController>(AccountRepositoryController);
    accountRepository = containerIoC.get<IRepository<SteamAccount>>(REPOSITORIES_TYPES.AccountRepository);
    accountAuthorizationService = containerIoC.get<AccountWebAuthorizationService>(AccountWebAuthorizationService);
});

beforeEach(async() =>{
    testAccount =  (await accountRepository.getAllAsync())[0];
});

function passAccountAuthorizationServiceTests(){
    testAccountLoginWithDBSave();
    testCookiesValidation();
}

function testAccountLoginWithDBSave(){
    it("Account must be logged in and cookie refreshed in database", async() =>{
        let result = await accountAuthorizationService.loginAndSaveToDB(testAccount,);
        expect(result?.refreshToken).to.not.be.undefined;
        let account = await accountRepository.findTargetAsync({_id: testAccount._id});
        expect(account).to.be.not.undefined;
        expect(account?.credentials.refresh_token).equals(result?.refreshToken);
    });
}

function testCookiesValidation(){
    it("Cookie session must be valid and processed properly",async () => {
        let cookies = await accountRepositoryController.getAssignedCookie(testAccount);
        if(cookies == undefined || cookies.length == 0)
            throw new Error("Web Cookies were not found in database");
        testAccount.attached!.cookie = cookies;
        let result = await accountAuthorizationService.isCookieSessionValid(testAccount.attached!.cookie! as CookieEntry[]);
        expect(result).to.be.true;
    })
}


describe('Account Authorization Service tests', passAccountAuthorizationServiceTests)