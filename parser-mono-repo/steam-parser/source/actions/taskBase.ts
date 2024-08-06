import axios, { HttpStatusCode } from "axios";
import TaskExecutor from "../actors/taskExecutor";
import { getTaskConfig } from "../configuration/taskSystem/taskConfig";
import ITask from "./task";
import { TooManyRequestsError } from "../errors/tooManyRequestsError";

export abstract class Task<Executor extends TaskExecutor> implements ITask<Executor> {
  protected abstract executeTask(executor: Executor): Promise<void>;
  private retriesLeft: number = getTaskConfig(this.TaskType).retriesCount;

  get TaskType(): string {
    return this.constructor.name;
  }
  get CanRetry(): boolean {
    return this.retriesLeft > 0;
  }
  
  async execute(executor: Executor): Promise<void> {
    try {
      await this.executeTask(executor);
    } catch (err) {
      this.retriesLeft--;
      if (axios.isAxiosError(err) && err?.response?.status == HttpStatusCode.TooManyRequests)
        throw new TooManyRequestsError(err.message);
      throw err;
    }
  }
}
