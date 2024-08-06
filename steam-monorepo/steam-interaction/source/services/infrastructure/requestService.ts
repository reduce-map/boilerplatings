import { AccountMeta, Cookie, convertObjectToCookieHeader } from "@team/account-contract";
import axios, { Axios, AxiosProxyConfig, AxiosRequestConfig } from "axios";
import { SocksProxyAgent } from "socks-proxy-agent";
import { HttpProxyAgent } from "http-proxy-agent";
import { IRequestService } from "./IRequestService";
import { LeveledLogMethod, Logger } from "winston";

export abstract class AxiosRequestService implements IRequestService {
	protected readonly request: Axios;
	protected cookieHeader!: string;

	public enableDebug: boolean = false;
	constructor(cookie: any, proxy?: string, protected logger?:Logger) {
		this.request = axios.create();
		this.request.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
		this.setCookie(cookie);
		this.setProxy(proxy);
	}
	public setCookie(cookie: any) {
		if (!cookie) {
			return;
		}

		this.cookieHeader = typeof cookie != "string" ? convertObjectToCookieHeader(cookie) : cookie;

		this.request.defaults.headers.common["Cookie"] = this.cookieHeader;
	}
	public setProxy(proxy?: string): void {
		if (!proxy) {
			return;
		}
		let proxyAgent: any;
		if(proxy.startsWith("socks5://")){
			proxyAgent = new SocksProxyAgent(proxy);
		} else {
			proxyAgent = new HttpProxyAgent(proxy);
		}
		
		this.request.defaults.httpAgent = proxyAgent;
		this.request.defaults.httpsAgent = proxyAgent;
	}

	protected log(logMessage: string, logMethod: LeveledLogMethod | undefined) {
		if(!this.enableDebug || !logMethod){
			return;
		}

		logMethod(logMessage);
	} 
}
