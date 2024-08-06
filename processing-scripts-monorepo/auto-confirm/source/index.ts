import "reflect-metadata";
import "module-alias/register";

import { setupGlobal } from "./configuration/global";
import { AccountWebAuthorizationService } from "steam-authorization";
import { SteamAccount, IRepository } from "polyData";
import { REPOSITORIES_TYPES } from "./configuration/injection/repositories.types";
import socks5List from "./configuration/socks5List.json";
import axios from "axios";
import { SocksProxyAgent } from "socks-proxy-agent";
import {
  Confirmation,
  ConfirmationAction,
  ConfirmationService,
  ConfirmationServiceSettings,
  EConfirmationType,
  convertCookieEntriesToCookieContract,
} from "steam-interaction";
import winston from "winston";
import { AccountLoggerManager } from "./utils/accountLoggerManager";
import { formatMilliseconds } from "./utils/formatMilliseconds";
import path from "path";
import fs from "fs";

/*
    Important! READ BEFORE USE:
    Your proxies must have equal amount of proxies as accounts.
    If you have 40 accounts, you must have 40 proxies.
    
    To update count of processed accounts, change the number in slice() method in line 34.
    To update filtration of processed account: change the condition in line 34.


    To update proxy list, change the file socks5List.json

    If you want to support all other types of confirmations, change the condition in isTypeSupportedToConfirm
    If you want to change the way how to process confirmations, change the code in processAccount method.
    If you want to change the way how to login, change the code in loginAccount method.

    Important Part about Login: DO NOT ATTEMPT to login with same account from different proxies at the same time.
    Also do not attempt to provide login in async context. Only sync way is ALLOWED
*/
const config = {
  retryConfirmCheck: {
    retryDelay: 1 * 60 * 1000, // 1 min
    stopOnFailsInRow: 5,
  },
  checkConfirmationEvery: 30000,
  accFilters: [{}],
  updateCookiesEvery: 120000, // 2 hours
  showAccountLogsToConsole: true,
  removeProxyOnFailsInRow: 3,
  connectionString: "mongodb://localhost:27017/steamAccount",
  removedProxiesFilePath: "./source/configuration/removedProxies.json",
  proxiesFilePath: "./source/configuration/socks5List.json",
  telegramBotToken: "6788492901:AAFBEqQNJXZIgQTRgUicHGyH9yNFAY2Kt2M",
  telegramChatId: "-4195510133",
};

let cookieUpdateAwaiters: ((value?: any | PromiseLike<any>) => void)[] = [];
const proxyFailsInRow: Map<string, number> = new Map();

function getProxyString(index: number) {
  if(index < 0) throw new Error(`Index ${index} is invalid`);
  if(socks5List.length === 0) throw new Error("Socks5 list is empty");
  if (index >= socks5List.length) index = index % socks5List.length;
  return socks5List[index];
}

function removeProxy(proxy: string) {
  if (!socks5List.includes(proxy)) throw new Error(`Proxy ${proxy} is not in the list`);
  const index = socks5List.indexOf(proxy);
  const proxiesPath = path.resolve(config.proxiesFilePath);
  const removedProxiesPath = path.resolve(config.removedProxiesFilePath);
  // removing from memory
  socks5List.splice(index, 1);
  // removing from file
  fs.writeFileSync(proxiesPath, JSON.stringify(socks5List, null, 2));
  // adding to removed proxies file
  const removedProxies: string[] = JSON.parse(fs.readFileSync(removedProxiesPath, "utf-8"));
  if(!removedProxies.includes(proxy))
  {
  removedProxies.push(proxy);
  fs.writeFileSync(removedProxiesPath, JSON.stringify(removedProxies, null, 2));
  }
}

async function isProxyValid(proxy: string): Promise<boolean> {
  try {
    const socksAgent = new SocksProxyAgent(proxy);
    const response = await axios.get("https://api.ipify.org?format=json", { httpsAgent: socksAgent });
    const proxyIp = extractIpAddressFromProxy(proxy);
    if (proxyIp && response.data.ip == proxyIp) return true;
    return false;
  } catch (error) {
    return false;
  }
}

function extractIpAddressFromProxy(proxy: string): string | null {
  const regex = /@(.*?):/;
  const match = proxy.match(regex);
  return match ? match[1] : null;
}

function getAccountId(acc: SteamAccount) {
  return `${acc._id ?? "account"}_`;
}

type AppConfig = { accounts: SteamAccount[] };

const runTimeConfig: AppConfig = {
  accounts: [],
};

async function setupApp() {
  const logger = containerIoC.get<winston.Logger>(winston.Logger);
  logger.info("Starting app🚀");
  const accountRepository = containerIoC.get<IRepository<SteamAccount>>(REPOSITORIES_TYPES.AccountRepository);
  const accountLoggerManager = containerIoC.get<AccountLoggerManager>(AccountLoggerManager);
  const accountService = containerIoC.get<AccountWebAuthorizationService>(AccountWebAuthorizationService);

  setupGlobalErrorHandling(logger);

  let accounts: SteamAccount[] = [];

  for (const filter of config.accFilters) {
    const loadedAccount = await accountRepository.findManyAsync(filter);
    logger.info(`Loaded ${loadedAccount.length} accounts from DB🗄 with filter ${JSON.stringify(filter, null, 2)}`);
    accounts.push(...loadedAccount);
  }

  let accountWithoutCookieCounter = 0;
  for (let acc of accounts) {
    let accountLogger = accountLoggerManager.getLogger(getAccountId(acc), config.showAccountLogsToConsole);
    accountLogger.info("-----------------------------");
    accountLogger.info(`Account loaded👤✅`);
    if (!acc.attached?.cookie?.webCookies) {
      accountLogger.info(`Account attachedCookie.webCookies is undefined, removing from app accounts pull❌`);
      accounts.splice(
        accounts.findIndex((x) => x == acc),
        1
      );
      accountWithoutCookieCounter++;
    }
  }

  if (accountWithoutCookieCounter > 0)
    logger.info(`Filtered ${accountWithoutCookieCounter} accounts without cookies❌🍪`);

  //runTimeConfig.accounts = accounts.sort((x) => x.);

  logger.info(`Loaded total ${accounts.length}👤accounts and ${socks5List.length} proxies🧦`);

  setInterval(() => updateCookies(logger, accountLoggerManager, accountRepository), config.updateCookiesEvery);
  logger.info(`Updating cookies every ${formatMilliseconds(config.updateCookiesEvery)}🍪⏳`);

  setupConfirmationProcessing(accountService, logger, accountLoggerManager);

  logger.info("App started🚀✅");
}

async function updateCookies(
  logger: winston.Logger,
  accountLoggerManager: AccountLoggerManager,
  accountRepository: IRepository<SteamAccount>
) {
  logger.info("Loading accounts from DB⬇️ 🗄, and updating cookies🍪");
  const oldAccsIds = runTimeConfig.accounts.map((x) => x._id);
  let accounts = await accountRepository.findManyAsync({ _id: { $in: oldAccsIds } }); // loading only accounts with which we are working
  logger.info(`Loaded ${accounts.length} accounts from DB🗄`);
  let successfulUpdateCounter = 0;
  for (let oldAccount of runTimeConfig.accounts) {
    const newAccount = accounts.find((newAcc) => oldAccount._id?.equals(newAcc._id!));
    if (newAccount?.attached?.cookie?.webCookies && oldAccount.attached?.cookie?.webCookies) {
      oldAccount.attached.cookie.webCookies = newAccount.attached.cookie.webCookies;
      successfulUpdateCounter++;
      accountLoggerManager.getLogger(getAccountId(oldAccount)).info(`Cookie updated🍪`);
    }
  }
  logger.info(`Updated ${successfulUpdateCounter}/${runTimeConfig.accounts.length}✅ accounts' cookies🍪`);
  if(cookieUpdateAwaiters.length > 0) {
    logger.info(`Reanabling confirmation processing for ${cookieUpdateAwaiters.length} accounts`);
    await fireAllCookieUpdateAwaiters();
  }
}

async function setupConfirmationProcessing(
  accountService: AccountWebAuthorizationService,
  logger: winston.Logger,
  accountLoggerManager: AccountLoggerManager
) {
  const promises = [];

  for (const account of runTimeConfig.accounts)
    promises.push(
      setupConfirmationsProcessing(
        account,
        accountService,
        accountLoggerManager.getLogger(getAccountId(account)),
        logger,
        accountLoggerManager
      )
    );

  //await Promise.all(promises);
}

async function setupConfirmationsProcessing(
  account: SteamAccount,
  accountService: AccountWebAuthorizationService,
  accountLogger: winston.Logger,
  logger: winston.Logger,
  accountLoggerManager: AccountLoggerManager
) {
  let failInRowCounter = 0;
  while (true) {
    try {
      const accountIndex = runTimeConfig.accounts.findIndex((x) => x == account);
      while (true) {
        const accountProxy = getProxyString(accountIndex);
        if(!await isProxyValid(accountProxy)) {
          accountLogger.error(`Proxy ${accountProxy} is invalid❌, retrying`);
          let countOfFails = proxyFailsInRow.get(accountProxy) ?? 0;
          proxyFailsInRow.set(accountProxy, ++countOfFails);
          if(countOfFails >= config.removeProxyOnFailsInRow) {
            logger.error(`Proxy ${accountProxy} reached max fails in row, removing from the list🧦🗑 Account will work with another proxy`);
            accountLogger.error(`Proxy ${accountProxy} reached max fails in row, removing from the list🧦🗑 Account will work with another proxy`);
            removeProxy(accountProxy);
          }
          continue;
        }
        else {
          proxyFailsInRow.set(accountProxy, 0);
        }
        if (!(await accountService.isCookieSessionValid(account.attached?.cookie!.webCookies as any, accountProxy)))
          throw new Error("Cookie session is invalid");

        const startTime = Date.now();
        const confirmationsCount = await processAccount(account, accountProxy, accountLogger);
        if (confirmationsCount > 0)
          accountLogger.info(`Confirmations successfully proceeded in ${formatMilliseconds(Date.now() - startTime)}📝`);

        await sleep(config.checkConfirmationEvery);
        failInRowCounter = 0;
      }
    } catch (error) {
      failInRowCounter++;
      accountLogger.error(
        `Error during proceeding confirmation ❌ ${(error as Error).message} ${(error as Error).stack}`
      );
      if (config.retryConfirmCheck.stopOnFailsInRow - failInRowCounter > 0)
        accountLogger.warn(
          `${
            config.retryConfirmCheck.stopOnFailsInRow - failInRowCounter
          } fails in row left to disable this account❗️ next run in ${formatMilliseconds(
            config.retryConfirmCheck.retryDelay
          )}`
        );
    }
    if (failInRowCounter >= config.retryConfirmCheck.stopOnFailsInRow) {
      accountLogger.error(
        `Account disabled❗️ because of ${config.retryConfirmCheck.stopOnFailsInRow} fails in row, it will be reenabled after new cookies received`
      );
      logger.error(
        accountLoggerManager.formatAccountMessage(
          getAccountId(account),
          `Account disabled❗️ because of ${config.retryConfirmCheck.stopOnFailsInRow} fails in row, it will be reenabled after new cookies received`
        )
      );
      await waitCookieUpdate();
      failInRowCounter = 0;
    } else await sleep(config.retryConfirmCheck.retryDelay);
    
  }
}

async function processAccount(account: SteamAccount, proxy: string, logger: winston.Logger): Promise<number> {
  if (!account.attached?.cookie?.webCookies) {
    throw new Error("Account cookie is undefined");
  }

  let settings: ConfirmationServiceSettings = {
    mobileOs: "android",
    profileId64: account?.steamId64,
  };

  let cookie = convertCookieEntriesToCookieContract(account.attached?.cookie.webCookies as any, "steamcommunity.com");
  let confirmationService = new ConfirmationService(cookie, settings, account.credentials.identity_secret, proxy);

  return await acceptConfirmations(confirmationService, account, logger);
}

async function acceptConfirmations(confService: ConfirmationService, account: SteamAccount, logger: winston.Logger) {
  let confirmations: Confirmation[] = await confService.getConfirmations();

  if (confirmations.length === 0) return 0;

  logger.info(`Received ${confirmations.length} confirmations, confirming🔃`);
  const filteredConfirmations = confirmations.filter((x) => isTypeSupportedToConfirm(x.type));
  if (filteredConfirmations.length < confirmations.length)
    logger.info(
      `Filtered🧹🧹 ${confirmations.length - filteredConfirmations.length} confirmations, because of unsupported type`
    );
  if (filteredConfirmations.length === 0) return 0;
  const confIds = filteredConfirmations.map((conf) => conf.id);
  const confNonces = filteredConfirmations.map((conf) => conf.nonce);

  await confService.respondToConfirmationById(confIds, confNonces, ConfirmationAction.Accept);
  logger.info(`All confirmations successfully proceeded✅`);
  return filteredConfirmations.length;
}

function isTypeSupportedToConfirm(type: number) {
  return type == EConfirmationType.MarketListing;
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitCookieUpdate() {
  return new Promise<void>((resolve, reject) => {
    cookieUpdateAwaiters.push(resolve);
  });
}

async function fireAllCookieUpdateAwaiters() {
  for (const resolve of cookieUpdateAwaiters) resolve();
  cookieUpdateAwaiters = [];
}

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

async function sendErrorToTelegram(error: Error) {

  let message = `*Project:* 📝auto\\-confirm
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

async function main() {
  await setupGlobal(config.connectionString);
  await setupApp();
}

main();
