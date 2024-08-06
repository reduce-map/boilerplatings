import TaskExecutor from "./taskExecutor";
import { ITask, TaskResult } from "../actions/task";
import { TypedEvent } from "../events/typedEvent";
import { config } from "../configuration/config";

export type ExecutorTaskEventArgs = { executor: TaskExecutor; handledTask: ITask<TaskExecutor> };

export type ExecutorAvailableEventArgs = { executor: TaskExecutor };
export type TaskFailedEventArgs = { executor: TaskExecutor; error: Error; task: ITask<TaskExecutor> };

export type ExecuteTaskResult = { taskResult?: TaskResult; executor?: TaskExecutor; failedToFindExecutor: boolean };
class ExecutorsController {
  private executors: TaskExecutor[] = new Array<TaskExecutor>();
  private executorFailStat: Map<string, number> = new Map<string, number>();

  //#region  Events
  public onExecutorAvailable: TypedEvent<ExecutorAvailableEventArgs> = new TypedEvent<ExecutorAvailableEventArgs>();
  public onExecutorFailed: TypedEvent<TaskFailedEventArgs> = new TypedEvent<TaskFailedEventArgs>();
  //#endregion

  public constructor() {
    //#region bind this to methods
    this.attachExecutor = this.attachExecutor.bind(this);
    this.detachExecutor = this.detachExecutor.bind(this);
    this.handleExecutorTaskFailed = this.handleExecutorTaskFailed.bind(this);
    this.handleExecutorTaskReceived = this.handleExecutorTaskReceived.bind(this);
    this.handleExecutorTaskReleased = this.handleExecutorTaskReleased.bind(this);
    this.handleExecutorTaskSuccess = this.handleExecutorTaskSuccess.bind(this);
    this.emitExecutorAvailable = this.emitExecutorAvailable.bind(this);
    this.executeTask = this.executeTask.bind(this);
    this.clearAllExecutors = this.clearAllExecutors.bind(this);
    //#endregion
  }
  /**
   *
   * @param task
   * @returns false if no available executors for this type of task now
   */
  public async executeTask(task: ITask<TaskExecutor>): Promise<ExecuteTaskResult> {
    let executor = this.getAvailableExecutorForTask(task.TaskURL);
    if (!executor) return { failedToFindExecutor: true };
    try {
      this.handleExecutorTaskReceived(executor, task);

      const taskResult: TaskResult = await executor.executeTask(task);

      this.handleExecutorTaskSuccess(executor);
      return { executor: executor, taskResult: taskResult, failedToFindExecutor: false };
    } catch (error) {
      this.handleExecutorTaskFailed({ executor: executor, error: error as Error, task: task });
      throw error;
    } finally {
      this.handleExecutorTaskReleased(executor, task);
    }
  }

  //#region  Executor management
  public attachExecutor(executor: TaskExecutor) {
    this.executors.push(executor);
    this.emitExecutorAvailable(executor);
    this.subscribeToExecutorEvents(executor);
  }

  public detachExecutor(executor: TaskExecutor) {
    this.executors.splice(this.executors.indexOf(executor), 1);
    this.unsubscribeFromExecutorEvents(executor);
  }

  public clearAllExecutors() {
    this.executors = [];
  }

  getAvailableExecutorForTask(taskURL: string): TaskExecutor | undefined {
    return this.executors.find((executor) => executor.canExecuteTask(taskURL));
  }

  //#endregion
  //#region Events management
  private subscribeToExecutorEvents(executor: TaskExecutor) {
    executor.onExecutorAvailable.on(this.emitExecutorAvailable);
  }

  private unsubscribeFromExecutorEvents(executor: TaskExecutor) {
    executor.onExecutorAvailable.off(this.emitExecutorAvailable);
  }

  private emitExecutorAvailable(executor: TaskExecutor) {
    this.onExecutorAvailable.emit({ executor: executor });
  }
  //#endregion
  //#region Event handlers

  private handleExecutorTaskFailed(taskFailedArgs: TaskFailedEventArgs) {
    logger.error(
      `Executor ${taskFailedArgs.executor.Id} failed to execute task ${taskFailedArgs.task.TaskURL} with error ${taskFailedArgs.error}`
    );
    let executorFailsInRow = this.executorFailStat.get(taskFailedArgs.executor.Id) || 0;
    this.executorFailStat.set(taskFailedArgs.executor.Id, ++executorFailsInRow);
    if (executorFailsInRow >= config.appConfig.detachExecutorOnFailInRow) {
      this.detachExecutor(taskFailedArgs.executor);
      logger.warn(`Executor ${taskFailedArgs.executor.Id} detached from controller`);
    }
    this.onExecutorFailed.emit(taskFailedArgs);
  }

  private handleExecutorTaskSuccess(executor: TaskExecutor) {
    this.executorFailStat.set(executor.Id, 0);
  }

  private handleExecutorTaskReleased(executor: TaskExecutor, task: ITask<TaskExecutor>) {
    this.emitExecutorAvailable(executor);
    logger.info(`Executor ${executor.Id} released task with url: "${task.TaskURL}"`);
  }

  private handleExecutorTaskReceived(executor: TaskExecutor, task: ITask<TaskExecutor>) {
    logger.info(`Executor ${executor.Id} received task with url: "${task.TaskURL}"`);
  }
  //#endregion
}

export default ExecutorsController;
