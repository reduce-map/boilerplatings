import { AccountRepositoryController } from "../controllers/accountRepositoryController";
import {
  AccountService,
  CookieEntry,
  CookieValidationService,
  LoginResult,
  LoginService,
  WebLoginResult,
  WebLoginService,
  convertCookieEntriesToCookieContract,
  getDefaultAccountSettings,
} from "@team/steam-interaction";
import { SteamAccount } from "@team/polydata";
import { mapAccountToCredentials } from "../utils/mappers/account.map";
import { Cookie } from "@team/polydata";
import { inject, injectable } from "inversify";

export type RetryConfig = { retryCount: number; retryDelay: number; retryOnNetworkFailDelay: number };
export type Logger = {
  info: (message: string) => void;
  error: (message: string) => void;
  warn: (message: string) => void;
};
export type TryLoginResult = { error?: Error; isNetworkError?: boolean; loginResult?: WebLoginResult };
@injectable()
export class AccountWebAuthorizationService {
  private accountRepository: AccountRepositoryController;
  public constructor(@inject(AccountRepositoryController) repositoryController: AccountRepositoryController) {
    this.accountRepository = repositoryController;
  }

  public async loginAndSaveToDB(
    account: SteamAccount,
    logger?: Logger,
    startWithRefreshTry: boolean = true,
    proxy?: string,
    retryConfig?: RetryConfig,
    refreshRetryConfig?: RetryConfig
  ): Promise<WebLoginResult | undefined> {
    try {
      retryConfig = retryConfig ?? { retryCount: 1, retryDelay: 0, retryOnNetworkFailDelay: 0 };
      refreshRetryConfig = refreshRetryConfig ?? { retryCount: 1, retryDelay: 0, retryOnNetworkFailDelay: 0 };
      try {
        if (account.credentials.refresh_token && startWithRefreshTry) {
          logger?.info(`Trying to refresh cookie🔄`);
          const refreshResult = await this.tryRefresh(account.credentials.refresh_token, proxy);
          if (refreshResult.loginResult) {
            await this.saveSession(account, refreshResult.loginResult, logger);
            logger?.info(`Cookie successfully refreshed and valid✅`);
            return refreshResult.loginResult;
          }
          logger?.error(`Cookie refresh failed❌, starting login`);
        }
      } catch (exception) {
        logger?.error(
          `Cookie refresh failed❌, starting login; exception: ${(exception as Error).message} ${
            (exception as Error).stack
          }`
        );
      }
      for (let i = 0; i < retryConfig.retryCount; i++) {
        const tryLoginResult: TryLoginResult = await this.tryLogin(account, logger, proxy, refreshRetryConfig);
        if (tryLoginResult.loginResult) {
          await this.saveSession(account, tryLoginResult.loginResult, logger);
          return tryLoginResult.loginResult;
        }
        const retryDelay = tryLoginResult.isNetworkError ? retryConfig.retryOnNetworkFailDelay : retryConfig.retryDelay;
        logger?.warn(`Login failed❌, retrying in ${retryDelay}ms; retries left: ${retryConfig.retryCount - i - 1}`);
        await this.sleep(retryDelay);
      }
    } catch (exception) {
      logger?.error(`Login failed❌, exception: ${(exception as Error).message} ${(exception as Error).stack}`);
      return undefined;
    }
  }

  public async tryLogin(
    account: SteamAccount,
    logger?: Logger,
    proxy?: string,
    refreshRetryConfig?: RetryConfig
  ): Promise<TryLoginResult> {
    refreshRetryConfig = refreshRetryConfig ?? { retryCount: 1, retryDelay: 0, retryOnNetworkFailDelay: 0 };
    try {
      let loginResult = await this.login(account, proxy);
      logger?.info(`Account logged in⬆️`);

      if (await this.isCookieSessionValid(loginResult.cookies, proxy)) {
        logger?.info(`Cookie after login is valid✅`);
        return { loginResult };
      }
      logger?.warn(`Cookie after login is invalid❌, trying to refresh🔄`);
      for (let i = 0; i < refreshRetryConfig.retryCount; i++) {
        const tryRefreshResult = await this.tryRefresh(loginResult.refreshToken!, proxy);
        if (tryRefreshResult.loginResult) {
          logger?.info(`Cookie after refresh is valid✅`);
          return { loginResult: tryRefreshResult.loginResult };
        }
        const retryDelay = tryRefreshResult.isNetworkError
          ? refreshRetryConfig.retryOnNetworkFailDelay
          : refreshRetryConfig.retryDelay;
        logger?.warn(
          `Cookie on after refresh is invalid❌,next retry in ${retryDelay} retries left: ${
            refreshRetryConfig.retryCount - i - 1
          }`
        );
        await this.sleep(retryDelay);
      }
      return { error: new Error("Login failed"), isNetworkError: false };
    } catch (err) {
      const error: any = err;
      logger?.info(`Login failed❌, exception: ${error.message} ${error.stack}`);
      if (error.options?.proxy && error.options?.command == "connect") return { error: err as Error, isNetworkError: true };
      return { error: err as Error, isNetworkError: false };
    }
  }
  private async tryRefresh(refreshToken: string, proxy?: string): Promise<TryLoginResult> {
    try {
      const webLoginService = new WebLoginService(getDefaultAccountSettings(), proxy);
      const refreshResult = await webLoginService.refreshSession(refreshToken);
      if (await this.isCookieSessionValid(refreshResult.cookies, proxy)) return { loginResult: refreshResult };
      return { error: new Error("Refresh failed"), isNetworkError: false };
    } catch (err) {
      const error: any = err;
      if (error.options?.proxy && error.command == "connect")
        return { error: error, isNetworkError: true };
      return { error: error, isNetworkError: false };
    }
  }

  private async login(account: SteamAccount, proxy?: string): Promise<WebLoginResult> {
    const credentials = mapAccountToCredentials(account);
    const webLoginService = new WebLoginService(getDefaultAccountSettings(), proxy);
    return await webLoginService.logOnViaCredentials(credentials, true);
  }

  private async saveSession(account: SteamAccount, loginResult: WebLoginResult, logger?: Logger): Promise<void> {
    if (loginResult.refreshToken) {
      await this.accountRepository.attachRefreshToken(account, loginResult.refreshToken);
    }

    await this.accountRepository.attachCookie(account, loginResult.cookies);
    logger?.info(`Cookie saved to database📝`);
  }

  public async isCookieSessionValid(cookie: CookieEntry[], proxy?: string): Promise<boolean> {
    if (!cookie) {
      return false;
    }
    let convertedCookie = convertCookieEntriesToCookieContract(cookie, "steamcommunity.com");
    let validationService: CookieValidationService = new CookieValidationService(convertedCookie, proxy);
    return await validationService.isCookieHaveValidSession();
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
