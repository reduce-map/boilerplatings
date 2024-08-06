import { Account, IRepository, ItemInfo, Proxy, RepositoryTypes } from "polyData";
import SteamExecutor from "../../parser/steamExecutor";
import { LoggerTypes } from "../injection/types/logger.type";
import { Logger } from "winston";
import { config } from "../config";
import { Container } from "inversify";
import { ParsingService } from "../../actors/parsingService";
import { ItemOrdersParseTask } from "../../parser/tasks/itemOrdersParseTask";
import { ItemsController } from "../../actors/itemsController";
import { convertCookieEntriesToCookieContract } from "steam-interaction";
import { log } from "console";

export async function setupExecutors(containerIoC: Container) {
  const logger = containerIoC.get<Logger>(LoggerTypes.Logger);
  const modulesLogger = containerIoC.get<Logger>(LoggerTypes.FileOnly);
  const accountRepository = containerIoC.get<IRepository<Account>>(RepositoryTypes.AccountRepository);
  const proxyRepository = containerIoC.get<IRepository<Proxy>>(RepositoryTypes.ProxyRepository);
  const parsingService = containerIoC.get<ParsingService>(ParsingService);

  let accounts: Account[] = [];
  for (let filter of config.databaseAccountFilters) {
    const filteredAccounts = await accountRepository.filterAnyAsync(filter);
    if (filteredAccounts && filteredAccounts.length > 0) accounts = accounts.concat(filteredAccounts);
  }
  const proxies: Proxy[] = await proxyRepository.getAllAsync();

  logger.debug(
    `Loaded ${accounts.length} accounts and ${proxies.length} proxies. Max executors to use set to: ${config.maxExecutorsCount}`
  );

  accounts = accounts.slice(0, config.maxExecutorsCount);
  if (accounts.length > proxies.length) {
    const err = new Error(`Not enough proxies to create all executors`);
    logger.error(err.message);
    throw err;
  }

  logger.debug(`Executors setup started`);
  const accountIdExecutor = new Map<string, SteamExecutor>();
  for (let i = 0; i < accounts.length; i++) {
    try
    {
    const account = accounts[i];
    const definedProxy = proxies[i].proxy;
    const executor = new SteamExecutor(
      {
        steamCookie: null,
        accountCredentials: account,
        proxy: definedProxy,
      },
      `Executor ${account.login}`,
      logger,
      modulesLogger
      );
     
      const accountWebCookie = account.attachedCookie?.webCookies;
      if(!accountWebCookie || accountWebCookie.length === 0 || !accountWebCookie.find(cookie => cookie.name == "sessionid"))
       throw new Error(`Account ${account.login} doesn't have web cookie or sessionid`);
      const cookieContract = convertCookieEntriesToCookieContract(accountWebCookie as any, "steamcommunity.com");
      await executor.setSteamCookie(cookieContract);
      parsingService.executorsController.attachExecutor(executor);
      if(!account._id)
        throw new Error(`Account ${account.login} doesn't have id`);
      accountIdExecutor.set(account._id?.toString(), executor);
      logger.debug(`Executor ${account.login} cookie loaded, and attached to parsing service`);
    }
    catch(err)
    {
      logger.error(`Failed to load executor`, { err });
    }
  }
  logger.info(`Executors setup completed`);
  
  setInterval(() => runCookieUpdate(accountIdExecutor, accountRepository, logger), config.updateCookiesEvery);
}

var cookieUpdateLock = false;

function runCookieUpdate(accountIdExecutor: Map<string, SteamExecutor>, accountRepository: IRepository<Account>, logger: Logger)
{
  if(cookieUpdateLock)
    return logger.warn(`Cookie update already in progress, skipping`);
  cookieUpdateLock = true;
  updateAllCookies(accountIdExecutor, accountRepository, logger).then(() => cookieUpdateLock = false).catch(err => {
    logger.error(`Failed to update cookies`, { err });
    cookieUpdateLock = false;
  });

}

async function updateAllCookies(accountIdExecutor: Map<string, SteamExecutor>, accountRepository: IRepository<Account>, logger: Logger)
{
  const accountIds = Array.from(accountIdExecutor.keys());
  const accounts = await accountRepository.filterAnyAsync({ _id: { $in: accountIds } });
  if(!accounts)
    throw new Error(`Failed to load accounts on cookie update`);
  for(let account of accounts)
  {
    try
    {
    if(!account._id)
      throw new Error(`Account ${account.login} doesn't have id`);

    const executor = accountIdExecutor.get(account._id?.toString());
    if(!executor)
      throw new Error(`Executor for account ${account.login} not found`);
    const accountWebCookie = account.attachedCookie?.webCookies;
    if(!accountWebCookie || accountWebCookie.length === 0 || !accountWebCookie.find(cookie => cookie.name == "sessionid"))
      throw new Error(`Account ${account.login} doesn't have web cookie or sessionid, aborting cookie update`);
    const cookieContract = convertCookieEntriesToCookieContract(accountWebCookie as any, "steamcommunity.com");
    executor.setSteamCookie(cookieContract);
    }
    catch(err)
    {
      logger.error(`Failed to update cookies for account ${account.login}`, { err });
    }
  }
  logger.info(`Cookies successfully updated for all accounts`);
}
