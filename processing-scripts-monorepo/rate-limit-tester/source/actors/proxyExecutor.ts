import { SocksProxyAgent } from "socks-proxy-agent";
import  {ITask, TaskResult } from "../actions/task";
import TaskExecutor from "./taskExecutor";
import axios, { AxiosInstance } from "axios";
import { extractBaseDomain } from "../utils/extractBaseDomain";
import { config } from "../configuration/config";





export type Cookie = {
    [domain: string]: string;
};
export class ProxyExecutor extends TaskExecutor {

    private requestManager: AxiosInstance;

    constructor(id: string, private socks5Proxy: string, private cookies: Cookie  ) {
        super(id);
        const agent = new SocksProxyAgent(socks5Proxy);
        this.requestManager = axios.create({
            httpAgent: agent,
            httpsAgent: agent,
            headers: config.appConfig.defaultHeaders,
        });
    }

    get RequestManager() {
        return this.requestManager;
    }

    private updateCookie(taskUrl: string) {
        const baseDomain = extractBaseDomain(taskUrl);
        if(!baseDomain)
          throw new Error("Can't extract base domain from task url");

        const cookie = this.cookies[baseDomain];
        this.requestManager.defaults.headers.common['Cookie'] = cookie;
    }
    private clearCookie() {
        this.requestManager.defaults.headers.common['Cookie'] = "";
    }

    protected async executeTaskCore(task: ITask<TaskExecutor>): Promise<TaskResult> {
        this.updateCookie(task.TaskURL);
        try {
            return await task.execute(this);
        } catch (error) {
            throw error;
        } finally {
            this.clearCookie();
        }
    }
}