import { describe, it } from "mocha";
import { CookieValidationService } from "../../services/cookieValidationService";
import { TestConfig } from "../testConfig";
import { expect } from "chai";


function passCookieValidationServiceTests(){
    let cookieValidationService: CookieValidationService = new CookieValidationService(TestConfig.cookie, TestConfig.proxy);
    testValidCookies(cookieValidationService);
}

function testValidCookies(cookieValidationService: CookieValidationService){
    it("Test config cookies must be valid", async ()=>{
        expect(await cookieValidationService.isCookieHaveValidSession()).to.be.true;
    })
}

describe("Cookie Validation Service tests", passCookieValidationServiceTests)

