import "reflect-metadata";
import "module-alias/register";

import { setupGlobal } from "./configuration/global";
import { AccountWebAuthorizationService } from "steam-authorization";
import { SteamAccount, CookieEntry, IRepository } from "polyData";
import { REPOSITORIES_TYPES } from "./configuration/injection/repositories.types";

import socks5List from "./configuration/socks5List.json";
import winston from "winston";
import { AccountLoggerManager } from "./utils/accountLoggerManager";
import { formatMilliseconds } from "./utils/formatMilliseconds";
import { AccountService, LoginResult, WebLoginResult } from "steam-interaction";
import { format } from "path";
import { set } from "mongoose";
/*
    Update filtration to select accounts which you want to login


    Before run this script, you need to create accounts in DB
    Setup Connection to DB in configuration/global.ts
    Setup accounts in DB
    Setup proxies in configuration/socks5List.json
    Run script

    logic:
    1. Get all accounts from DB
    2. Get all proxies from configuration/socks5List.json
    3. If proxies.length < accounts.length, throw error
    4. For each account, try to refresh cookie with refresh token if it set, and if config.startUpdateSessionWithRefresh is true
    5. If session after refresh is invalid, try to login account
    6. If session after login is invalid, try to refresh cookie with refreshConfig.retryCount times (to disable this, set refreshConfig.retryCount to 0)
    7. If login + refresh failed, if enough retries left, trying login again and returning to step 6
    8. If session after login is valid, save session to DB

    If new session of updating will conflict with some session which have not finished yet, new session will be skipped and you will see message in console
*/

const filtration = [{}]; //= { "accIndex": {"$gte": 774, "$lte": 110, "$nin": []}, "accName":"ste" };
const config = {
  updateEvery: 60000,    // how often script should be awaken to relogin
  checkEvery: 10000,      // how often script should check cookie, and relogin on invalid cookie
  runSessionUpdateOnStart: false, // if true, script will immediately start update session, if false, script will wait updateEvery interval to start updating sessions
  runCheckSessionOnStart: true, // if true, script will immediately start check session, if false, script will wait checkEvery interval to start checking sessions
  loginConfig: {
    retryCount: 5, // how many times script should retry to login account if login failed
    retryDelay: 31000, // delay between retries (recommended to set to 30 sec and more, due to guard renew time)
    retryOnNetworkFailDelay: 1000
  },
  refreshConfig: {
    retryCount: 1, // how many times script should retry to refresh cookie if after login cookie is invalid, recommended to set to 1-2
    retryDelay: 1000, // delay between retries
    retryOnNetworkFailDelay: 1000
  },
  startUpdateSessionWithRefresh: true, // if true, script will try to refresh cookie if refresh token present before login
  displayAccountLogsToConsole: false, // if true, script will display account logs to console
  connectionString: "mongodb+srv://programmers:123qwe798rty@cluster0.m5cbm1w.mongodb.net/steam",
  telegramBotToken: "6788492901:AAFBEqQNJXZIgQTRgUicHGyH9yNFAY2Kt2M",
  telegramChatId: "-4195510133",
};

let updateSessionsLock = false;
let checkSessionsLock = false;

function getProxyString(index: number) {
  if (index >= socks5List.length) index = index % socks5List.length;
  return socks5List[index];
}

async function loadAccounts(accountRepository: IRepository<SteamAccount>): Promise<SteamAccount[]>
{
  let accounts: SteamAccount[] = [];
  for(let filter of filtration)
  {
    let accs = await accountRepository.findManyAsync(filter);
    accounts = accounts.concat(accs);
  }
  return accounts;
}
async function updateSessions() {
  const logger = containerIoC.get<winston.Logger>(winston.Logger);
  const accountLoggerManager = containerIoC.get<AccountLoggerManager>(AccountLoggerManager);
  const accountService = containerIoC.get<AccountWebAuthorizationService>(AccountWebAuthorizationService);
  const accountRepository = containerIoC.get<IRepository<SteamAccount>>(REPOSITORIES_TYPES.AccountRepository);
  const accounts = await loadAccounts(accountRepository)
  const proxies = socks5List;
  const startTime = Date.now();
   
  logger.info(`Updating sessions started, ${accounts.length} accounts👤 and ${proxies.length} proxies🧦 loaded`);

  const loginPromises: Promise<boolean>[] = [];
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    const proxy = getProxyString(i);
    const accountLogger = accountLoggerManager.getLogger(getAccountId(account), config.displayAccountLogsToConsole);
    accountLogger.info(`--------------------------------------------`);
    accountLogger.info(`Account loaded, session update started🚀`);
    loginPromises.push(loginAccount(account, accountLogger, proxy, accountService));
  }
  let loginSuccessCount = 0;
  await Promise.allSettled(loginPromises).then((results) => {
   const successResults = results.filter(result => result.status == "fulfilled" && result.value == true);
   loginSuccessCount = successResults.length;
  });
  const endTime = Date.now();
  logger.info(`Updating sessions finished🏁`);
  logger.info(`Updated ${loginSuccessCount}/${accounts.length} accounts in ${formatMilliseconds(endTime - startTime)}`);
  logger.info(`Next update in ~${formatMilliseconds(config.updateEvery - (endTime - startTime))}⏳`);
}

async function checkAndUpdateInvalidSessions()
{
  const logger = containerIoC.get<winston.Logger>(winston.Logger);
  const accountLoggerManager = containerIoC.get<AccountLoggerManager>(AccountLoggerManager);
  const accountService = containerIoC.get<AccountWebAuthorizationService>(AccountWebAuthorizationService);
  const accountRepository = containerIoC.get<IRepository<SteamAccount>>(REPOSITORIES_TYPES.AccountRepository);
  const accounts = await loadAccounts(accountRepository)
  const proxies = socks5List;
  const startTime = Date.now();
   
  logger.info(`Session check started, ${accounts.length} accounts👤 and ${proxies.length} proxies🧦 loaded`);
  let invalidSessionAccounts: SteamAccount[] = [];
  const checkPromises: Promise<void>[] = [];
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    const proxy = getProxyString(i);
    const accountLogger = accountLoggerManager.getLogger(getAccountId(account), config.displayAccountLogsToConsole);
    accountLogger.info(`--------------------------------------------`);
    accountLogger.info(`Account loaded, session check started🚀`);
    const checkPromise = isAccountSessionValid(account, accountLogger, proxy, accountService).then((checkResult) => {
      if(!checkResult) 
      {
        logger.warn(formatAccountMessage(getAccountId(account), "Account session check finished, session or proxy invalid❌"));
        invalidSessionAccounts.push(account);
      }
    }).catch((err) => {
      accountLogger.error(`Session check failed❌, exception: ${(err as Error).message} ${(err as Error).stack}`);
      logger.error(
        formatAccountMessage(
          getAccountId(account),
          "Session check failed❌, exception: " + (err as Error).message + " " + (err as Error).stack
        )
      );
      invalidSessionAccounts.push(account);
    });
    checkPromises.push(checkPromise);
  }
  await Promise.allSettled(checkPromises);

  if(invalidSessionAccounts.length == 0)
  {
    logger.info(`No accounts with invalid session found✅`);
    logger.info(`Next check in ~${formatMilliseconds(config.checkEvery)}⏳`);
    return;
  }

  logger.warn(`Found ${invalidSessionAccounts.length} accounts with invalid session❌, starting update`);
  const loginPromises: Promise<boolean>[] = [];

  for (let i = 0; i < invalidSessionAccounts.length; i++) {
    const account = invalidSessionAccounts[i];
    const proxy = getProxyString(i);
    const accountLogger = accountLoggerManager.getLogger(getAccountId(account), config.displayAccountLogsToConsole);
    accountLogger.info(`Account Login started🚀`);
    loginPromises.push(loginAccount(account, accountLogger, proxy, accountService));
  }

  let loginSuccessCount = 0;
  await Promise.allSettled(loginPromises).then((results) => {
   const successResults = results.filter(result => result.status == "fulfilled" && result.value == true);
   loginSuccessCount = successResults.length;
  });

  const endTime = Date.now();
  logger.info(`Sessions check finished🏁`);
  logger.info(`Checked ${accounts.length} and ${loginSuccessCount}/${invalidSessionAccounts.length} invalid sessions successfully updated`);
  logger.info(`Next check in ~${formatMilliseconds(config.checkEvery - (endTime - startTime))}⏳`);
}

async function isAccountSessionValid(account: SteamAccount, accountLogger:winston.Logger, proxy:string, accountService: AccountWebAuthorizationService):Promise<boolean> {
  if(!account.attached?.cookie?.webCookies?.length)
    return false;
  accountLogger.info(`Checking account session🔎`);
  const checkResult = await accountService.isCookieSessionValid(account.attached.cookie.webCookies as any, proxy);
  accountLogger.info(`Account session check finished, session ${checkResult ? "valid✅" : "invalid❌"}`);
  return checkResult;
}

async function loginAccount(account:SteamAccount, accountLogger:winston.Logger, proxy:string, accountService: AccountWebAuthorizationService):Promise<boolean> {
  const logger = containerIoC.get<winston.Logger>(winston.Logger);
  const loginPromise = accountService.loginAndSaveToDB(
    account,
    accountLogger,
    config.startUpdateSessionWithRefresh,
    proxy,
    config.loginConfig,
    config.refreshConfig
  ).then((loginResult) => {
    if (loginResult) {
      accountLogger.info(`Account successfully finished session update✅`);
      logger.info(
        formatAccountMessage(getAccountId(account), "Account successfully finished session update✅")
      );
      return true;
    }
      accountLogger.info(`Account session update finished unsuccessfully❌`);
      logger.warn(
        formatAccountMessage(getAccountId(account), "Account session update finished unsuccessfully❌")
      );
      return false;
  }).catch((err) => {
    accountLogger.error(`Session update failed❌, exception: ${(err as Error).message} ${(err as Error).stack}`);
    logger.error(
      formatAccountMessage(
        getAccountId(account),
        "Session update failed❌, exception: " + (err as Error).message + " " + (err as Error).stack
      )
    );
    return false;
  });
  return loginPromise;
}

//#region help functions
function formatAccountMessage(accountId: string, message: string): string {
  const accountLoggerManager = containerIoC.get<AccountLoggerManager>(AccountLoggerManager);
  return accountLoggerManager.formatAccountMessage(accountId, message);
}

function getAccountId(account: SteamAccount): string {
  return `${account._id ?? "account"}`
}
//#endregion

//#region setup app
function setupGlobalErrorHandling(logger: winston.Logger) {
  process.on("uncaughtException", async (error) => {
    logger.error(`Uncaught Exception ❌: ${error.message} ${error.stack}`);
    await sendErrorToTelegram(error as Error);
    process.exit(1);
  });
  process.on("unhandledRejection", async (error) => {
    logger.error(`Unhandled Rejection ❌: ${(error as Error).message} ${(error as Error).stack}`);
    await sendErrorToTelegram(error as Error);
    process.exit(1);
  });
}

function main() {
  setupApp().then(() => {
    const logger = containerIoC.get<winston.Logger>(winston.Logger);
    logger.info("App started🚀");
    logger.info("Filtration for accounts:\n" + JSON.stringify(filtration, null, 2));
    logger.info("Updating sessions every: " + formatMilliseconds(config.updateEvery) + "⏳");
    logger.info("Checking sessions every: " + formatMilliseconds(config.checkEvery) + "⏳");
    logger.info("App setup finished✅");
    if(config.runCheckSessionOnStart)
    runCheckSessions(logger);
    if(config.runSessionUpdateOnStart)
    runUpdateSessions(logger);
    setInterval(() => runCheckSessions(logger), config.checkEvery);
    setInterval(() => runUpdateSessions(logger), config.updateEvery);
  });
}

function runCheckSessions(logger: winston.Logger) {
  if (checkSessionsLock) {
    logger.warn("🚦🚗🚗 Couldn't check sessions, because previous check is not finished, this check will be skipped");
    logger.warn("🚦🚗🚗 Ignore this, or increase checkEvery interval delay in configuration");
    return;
  }
  if(updateSessionsLock)
    return;
  checkSessionsLock = true;
  checkAndUpdateInvalidSessions().then(() => {
    checkSessionsLock = false;
  }).catch((err) => {
    logger.error(`Session check failed❌, exception: ${(err as Error).message} ${(err as Error).stack}`);
    checkSessionsLock = false;
  });
}

function runUpdateSessions(logger: winston.Logger) {
  if (updateSessionsLock) {
    logger.warn("🚦🚗🚗 Couldn't update sessions, because previous update is not finished, this update will be skipped");
    logger.warn("🚦🚗🚗 Ignore this, or increase updateEvery interval delay in configuration");
    return;
  }
  updateSessionsLock = true;
  if(checkSessionsLock)
  {
   waitCheckSessionsLockEnd().then(() => {
    updateSessions().then(() => {
      updateSessionsLock = false;
    }).catch((err) => {
      logger.error(`Session update failed❌, exception: ${(err as Error).message} ${(err as Error).stack}`);
      updateSessionsLock = false;
    });});
    return;
  }
  updateSessions().then(() => {
    updateSessionsLock = false;
  }).catch((err) => {
    logger.error(`Session update failed❌, exception: ${(err as Error).message} ${(err as Error).stack}`);
    updateSessionsLock = false;
  });
}

async function waitCheckSessionsLockEnd()
{
  while(checkSessionsLock)
  {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

async function sendErrorToTelegram(error: Error) {

  let message = `*Project:* 🔄🍪session\\-updater
*Error:* ${escapeMarkdown(error.message)} \n
\`\`\`${escapeMarkdown(error.stack)}\`\`\``;
  message = encodeURIComponent(message);
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow"
  };
  
  await fetch(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage?chat_id=${config.telegramChatId}&text=${message}&parse_mode=MarkdownV2`, requestOptions);
}

function escapeMarkdown(text:string | undefined) {
  if (!text) return '';
  let escapedText = text.replace(/\\/g, '\\\\');
  escapedText = escapedText.replace(/[_*\[\]()~`>#+-=|{}.!]/g, match => '\\' + match);
  return escapedText;
}

async function setupApp() {
  await setupGlobal(config.connectionString);
  const logger = containerIoC.get<winston.Logger>(winston.Logger);
  setupGlobalErrorHandling(logger);
}
//#endregion

main();