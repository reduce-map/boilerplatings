import { AutoMap } from "@automapper/classes";

export class AccountNotValidError extends Error{
    constructor(errorOptions?:ErrorOptions){
        super("Account has been unvalid", errorOptions);
    }
}

export class Cookie {
    @AutoMap()
    steamRefresh_steam?: String
    @AutoMap()
    sessionid?:String
    @AutoMap()
    steamDataId!: String;
    @AutoMap()
    steamRememberLogin!: String;
    @AutoMap()
    steamLoginSecure!: String;
    @AutoMap()
    steamMachineAuth!: String;
    @AutoMap()
    steamCountry!: String;
    @AutoMap()
    webTradeEligibility!:String
    @AutoMap()
    timezoneOffset!:String
    @AutoMap()
    Steam_Language!:String
}


export function convertObjectToCookieHeader(cookies:any):string {
    let cookieString = '';
    for (let key in cookies) {
        if (cookies.hasOwnProperty(key) && cookies[key] !== undefined) {
            cookieString += `${key}=${cookies[key]}; `;
        }
    }
    return cookieString;
}