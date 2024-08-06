import TaskExecutor from "../actors/taskExecutor";
import { Account,} from "polyData";
import { Logger } from "winston";
import { MarketService, LoginService, LoginResult, AccountSetting,BuyOrderService } from "steam-interaction";
import { AccountCredentials, Cookie} from "account-contract";
import { config } from "../configuration/config";
export type SteamExecutorConfiguration = {
  steamCookie: any;
  proxy?: string;
  accountCredentials?: Account;
};


export default class SteamExecutor extends TaskExecutor {
  private _marketService?: MarketService;
  private _buyOrderService?: BuyOrderService;
  public get marketService() {
    return this._marketService;
  }
  public get buyOrderService() {
    return this._buyOrderService;
  }
  constructor(public configuration: SteamExecutorConfiguration, id: string, private logger: Logger, private moduleLogger?: Logger){
    super(id);
  }

  public async setSteamCookie(cookie: Cookie): Promise<void> {
    if(!cookie || !cookie.sessionid) throw new Error("Invalid cookie, cookie or cookie.sessionid is missing");

    this._marketService = new MarketService(cookie.sessionid.toString(), cookie, this.configuration.proxy, this.moduleLogger);
    this._buyOrderService = new BuyOrderService(cookie, cookie.sessionid.toString(), this.configuration.proxy, this.moduleLogger);

    this._marketService.enableDebug = config.enableDebugLogging;
    this._buyOrderService.enableDebug = config.enableDebugLogging;
  }        
  
}
