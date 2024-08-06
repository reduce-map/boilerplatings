import ExecutorsController, { ExecuteTaskResult, ExecutorAvailableEventArgs } from "./executorsController";
import TaskManager from "../actions/taskManager";
import {ITask, TaskResult} from "../actions/task";
import { config } from "../configuration/config";
import { ProxyExecutor } from "./proxyExecutor";

export class RateLimitTesterService {
  public executorsController: ExecutorsController;
  public taskManager: TaskManager<ITask<ProxyExecutor>>;

  constructor() {
    this.executorsController = new ExecutorsController();
    this.taskManager = new TaskManager();

    //#region bind this to methods
    this.handleAndExecuteTask = this.handleAndExecuteTask.bind(this);
    //#endregion

    this.subscribeToEvents();
  }

  private subscribeToEvents() {
    this.executorsController.onExecutorAvailable.on(this.handleAndExecuteTask);
    this.taskManager.onTaskAdded.on(() => this.handleAndExecuteTask());
  }

  private async handleAndExecuteTask() {
    const task = this.taskManager.dequeueTask();

    if (!task) {
      return;
    }

    try {
      const executeTaskResult: ExecuteTaskResult = await this.executorsController.executeTask(task);

      if (executeTaskResult.failedToFindExecutor) {
        this.taskManager.queueTask(task, false);
      }
      this.handleTaskResult(executeTaskResult.taskResult!, task);
    } catch (err) {
      logger.error(
        `Error while executing task, task won't be added to queue again. Task URL: ${task.TaskURL} ; Error: ${
          (err as Error).message + (err as Error).stack
        }`
      );
    }
  }

  private handleTaskResult(taskResult: TaskResult, task: ITask<ProxyExecutor>)
  {
    switch (taskResult) {
      case TaskResult.Success:
        logger.info(`Task successfully executed. Task URL: ${task.TaskURL}`);
        break;
      case TaskResult.Retry:
        logger.info(`Task with url: ${task.TaskURL} returned retry result. Task will be added to queue again.`)
        const taskToQueue = task.getTaskForRetry();
        if(!taskToQueue)
          throw new Error("Can't get task for retry, Task returned undefined on getTaskForRetry()");
        this.taskManager.queueTask(taskToQueue);
        break;
      case TaskResult.Fail:
        logger.info(`Task with url: ${task.TaskURL} returned fail result. Task won't be added to queue again.`)
        break;
      default:
        throw new Error("Unknown task result");
    }
  }
}
