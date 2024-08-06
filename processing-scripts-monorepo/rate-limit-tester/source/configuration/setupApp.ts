import exp from "constants";
import { RateLimitTesterService } from "../actors/rateLimitTesterService";
import { config } from "./config";
import { ProxyExecutor } from "../actors/proxyExecutor";
import { FindCooldownTask } from "../tasks/FindCooldownTask";
import { RateLimitTesterLogger } from "../utils/rateLimitTesterLogger";

export async function setupApp() {
  setupErrorHandling();
  setupGlobal();

  setupExecutors();
  loadTasks();
}

function setupExecutors() {
  let idCounter = 1;
  for (let executorConfig of config.workersConfig.workers) {
    const executor = new ProxyExecutor(`executor-${idCounter++}`, executorConfig.proxy, executorConfig.cookie);
    rateLimitTesterService.executorsController.attachExecutor(executor);
  }
}

function loadTasks() {
  const testingLimits = config.appConfig.cooldownTestingLimits;
  if (testingLimits.length < 2) throw new Error("Cooldown testing limits must have at least 2 elements");
  
  if(testingLimits[0] <= 0) throw new Error("Cooldown testing limits must be greater than 0");

  const isSortAscending = testingLimits.every((limit, index) => {
    return index === testingLimits.length - 1 || limit < testingLimits[index + 1];
  });

  if (!isSortAscending) throw new Error("Cooldown testing limits must be  sorted ascending");

  let testingRange: Array<number> = [];

  if(config.appConfig.cooldownTestingCoefficient.enabled && config.appConfig.cooldownTestingCoefficient.value <= 1)
    throw new Error("Cooldown testing coefficient must be greater than 1");

  for (let i = 0; i < testingLimits.length - 1; i++) {
    const lowerLimit = testingLimits[i];
    const upperLimit = testingLimits[i + 1];
    if (config.appConfig.cooldownTestingCoefficient.enabled) {
      for (let j = lowerLimit; j < upperLimit; j = Math.ceil(j * config.appConfig.cooldownTestingCoefficient.value)) {
        testingRange.push(j);
      }
    }
    else
      testingRange.push(lowerLimit);
  }
  testingRange.push(testingLimits[testingLimits.length - 1]);

  logger.info(`Cooldown testing range created, cooldowns count: ${testingRange.length}`);

  for (let urlConfig of config.urlsConfig.urls) {
    const task = new FindCooldownTask(urlConfig.url, testingRange);
    rateLimitTesterService.taskManager.queueTask(task);
  }
}

function setupErrorHandling() {
  process.on("uncaughtException", (err) => {
    logger.error("Uncaught exception: " + err.message + err.stack);
    process.exit(1);
  });

  process.on("unhandledRejection", (reason: any, promise) => {
    logger.error("Unhandled rejection at: " + reason.message + reason.stack);
    process.exit(1);
  });
}

function setupGlobal() {
  global.logger = new RateLimitTesterLogger(config.logFileName, config.resultFileName);
  global.rateLimitTesterService = new RateLimitTesterService();
}
