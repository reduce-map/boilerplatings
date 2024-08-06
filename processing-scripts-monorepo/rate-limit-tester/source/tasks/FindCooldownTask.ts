import { AxiosError } from "axios";
import { ITask, TaskResult } from "../actions/task";
import { ProxyExecutor } from "../actors/proxyExecutor";
import { config } from "../configuration/config";
import { formatMilliseconds } from "../utils/formatMilliseconds";

export class FindCooldownTask implements ITask<ProxyExecutor> {
  private non429ErrorCount = 0;
  private taskToRetry: FindCooldownTask | undefined;
  constructor(
    private urlToTest: string,
    private cooldownTestingRange: number[],
    private lastSuccessfulCooldown?: number
  ) {}

  async execute(executor: ProxyExecutor): Promise<TaskResult> {
    const middle = Math.floor(this.cooldownTestingRange.length / 2);
    const cooldownToTest = this.cooldownTestingRange[middle];

    for (let i = 0; i < config.appConfig.testRequestsCount; i++) {
      try {
        await executor.RequestManager.get(this.urlToTest);
      } catch (error) {
        const errorHandleResult = this.handleError(error as AxiosError, cooldownToTest, middle);
        if (errorHandleResult) return errorHandleResult;
      } finally {
        await this.delay(cooldownToTest);
      }
    }

    if (this.cooldownTestingRange.length === 1) {
      logger.info(
        `Cooldown for: "${this.TaskURL}" successfully found. Cooldown: ${formatMilliseconds(cooldownToTest)}`,
        true
      );
      return TaskResult.Success;
    }

    logger.info(
      `Cooldown ${formatMilliseconds(cooldownToTest)} for: "${this.TaskURL}" is high enough. Testing lower cooldowns.`
    );
    this.setTaskToRetry(this.cooldownTestingRange.slice(0, middle), cooldownToTest); // if cooldown is high enough, we need to test lower cooldowns
    return TaskResult.Retry;
  }

  //#region Error handling

  private handleError(error: AxiosError, cooldownToTest: number, middle: number): TaskResult | undefined {
    logger.error(
      `Error while testing cooldown ${formatMilliseconds(cooldownToTest)} for ${this.TaskURL}. Error: ${error.message}`
    );
    if (error?.response?.status === 429) {
      return this.handle429Error(cooldownToTest, middle);
    }
    return this.handleNon429Error(error, cooldownToTest);
  }

  private handle429Error(cooldown: number, middle: number): TaskResult {
    if (this.cooldownTestingRange.length === 1 && !this.lastSuccessfulCooldown) {
      logger.error(
        `Cooldown for: "${this.TaskURL}" not found. Exit because of 429 error, and no cooldown for further tests.`,
        true
      );
      return TaskResult.Fail;
    }

    if (this.cooldownTestingRange.length === 1 && this.lastSuccessfulCooldown) {
      logger.info(
        `Cooldown for: "${this.TaskURL}" successfully found. Cooldown: ${formatMilliseconds(
          this.lastSuccessfulCooldown
        )}`,
        true
      );
      return TaskResult.Success;
    }

    logger.info(
      `Cooldown ${formatMilliseconds(cooldown)} for ${this.TaskURL}" is too low (got 429). Testing higher cooldowns.`
    );
    this.setTaskToRetry(this.cooldownTestingRange.slice(middle + 1), this.lastSuccessfulCooldown); // if cooldown is too low, we need to test higher cooldowns
    return TaskResult.Retry;
  }

  private handleNon429Error(error: AxiosError, cooldown: number): TaskResult | undefined {
    this.non429ErrorCount++;
    if (this.non429ErrorCount < config.appConfig.taskIgnoreNon429ErrorsCount) {
      logger.warn(
        `Non-429 error received while testing CD ${formatMilliseconds(cooldown)} for ${
          this.TaskURL
        }. Ignoring this error. Non-429 error count: ${this.non429ErrorCount} Error: ${error.message + error.stack}}`
      );
      return;
    }
    logger.error(
      `Cooldown for: "${this.TaskURL}" not found. Exit because of non-429 errors limit exceeded. Error: ${
        error.message + error.stack
      }`,
      true
    );
    return TaskResult.Fail;
  }

  //#endregion
  private setTaskToRetry(cooldownTestingRange: number[], lastSuccessfulCooldown?: number) {
      this.taskToRetry = new FindCooldownTask(this.urlToTest, cooldownTestingRange, lastSuccessfulCooldown)
  }

  getTaskForRetry(): ITask<ProxyExecutor> | undefined {
    return this.taskToRetry;
  }

  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  get TaskURL(): string {
    return this.urlToTest;
  }
}
