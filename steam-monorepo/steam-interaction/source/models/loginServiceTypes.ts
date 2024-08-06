import { Cookie } from "@team/account-contract";
import { pki } from "node-forge";

export type LoginResult = {
	sessionId: string;
	cookie: Cookie;

	refreshToken?: string;
	accessToken?: string;
};

export type WebLoginResult = {
	cookies: CookieEntry[];
	refreshToken?: string;
	accessToken?: string;
};

export type CookieEntry = {
	domains: string[];
	/**
	 * Deprecated, leaved for support propose only
	 */
	domain?:string;
	name: string;
	value: string;
};

export type AccountSetting = {
	timezone: string;
	steamLanguage: string;
};