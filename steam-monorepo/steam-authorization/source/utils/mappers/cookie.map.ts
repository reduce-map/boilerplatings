import { Cookie as CookieModel} from "@team/polydata";
import { Cookie } from "@team/account-contract";

export function mapCookieModelToCookieContract(cookie:CookieModel) {
    let result =  new Cookie();
    result.steamDataId = cookie.steamDataId;
    result.steamRememberLogin = cookie.steamRememberLogin;
    result.steamLoginSecure = cookie.steamLoginSecure;
    result.steamMachineAuth = cookie.steamMachineAuth;
    result.steamRefresh_steam = cookie.steamRefresh_steam ?? "";
    result.steamCountry = cookie.steamCountry;
    result.sessionid = cookie.sessionid;
    result.webTradeEligibility = cookie.webTradeEligibility ?? "";
    return result;
}