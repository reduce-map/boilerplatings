import { equal } from "assert";
import axios, { Axios } from "axios";
import { assert, expect } from "chai";
import { HttpProxyAgent } from "http-proxy-agent";
import { SocksProxyAgent } from "socks-proxy-agent";

function passAxiosProxyTest() {
	const url = "http://ip-api.com/json/";
	const proxyIP = "45.140.211.42";
	const proxy = `http://akvatoriasn77:tYrByGVSvB@${proxyIP}:51523`
	const request: Axios = axios.create({
		httpAgent: new HttpProxyAgent(proxy),
	});

	proxyTest(request, proxyIP, url);
}
function proxyTest(axios: Axios, proxyIP: string, url: string) {
	it("should return ip proxy address", async () => {
		const response = await axios.get(url);
		expect(response.data.query).equal(proxyIP);
	});
}

describe("pass axios proxy tests", passAxiosProxyTest);
