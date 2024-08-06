import { Cookie } from "@team/account-contract";
import { CookieEntry } from "../models/loginServiceTypes";

/**
 * 
 * @param cookies - array of cookies, if domainFilter is not set, from cookies with same name will be used last one;
 * !!! If cookies contains cookies with name which doesn't exist in Cookie contract, they will be ignored
 * @param domainFilter - filter cookies by domain, leave only cookie with domain == domainFilter and cookies without domain
 * @returns 
 */
export function convertCookieEntriesToCookieContract(cookies: CookieEntry[], domainFilter: string): Cookie{
    let result: any = new Cookie();
    for(let cookie of cookies) {
        if(cookie.domain && !cookie.domains && cookie.domain == domainFilter){
            result[cookie.name] = cookie.value;
            continue;
        }

        if(cookie.domain)
            continue;
        
        if(!cookie.domains || cookie.domains.length == 0 || cookie.domains.includes(domainFilter)){ // error with !domains
            result[cookie.name] = cookie.value;
        }
    }
    return result;
}