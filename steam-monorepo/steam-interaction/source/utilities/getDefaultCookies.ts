import { Cookie } from "@team/account-contract";
import { parseCookies } from "./models/cookieResponseAdapter";
import { AccountSetting } from "../models/loginServiceTypes";

export function getDefaultAccountSettings() {
	return {
		timezone: "7200,0",
		steamLanguage: "english"
	} as AccountSetting
}

export function getDefaultCookies(defaultSettings: any, rawCookies?: any): Cookie {
    let cookies: any = rawCookies !== undefined ? parseCookies(rawCookies) : new Cookie();
    return {...cookies, ...createDefaultCookies(defaultSettings)};
}

export function createDefaultCookies<T>(defaultSettings: T): T & {webTradeEligibility: string} {
    let cookies: T & {webTradeEligibility: string} = {} as T & {webTradeEligibility: string};
    const webTradeEligibility: string = JSON.stringify({
        allowed: 1,
        allowed_at_time: 0,
        steamguard_required_days: 15,
        new_device_cooldown_days: 7,
        time_checked: Math.floor(Date.now() / 1000),
    });
    cookies.webTradeEligibility = encodeURIComponent(webTradeEligibility);
    for (let key in defaultSettings) {
        (cookies as T)[key] = defaultSettings[key];
    }
    return cookies;
}
