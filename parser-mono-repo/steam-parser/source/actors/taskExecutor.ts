import ITask from "../actions/task";
import { TypedEvent } from "../events/typedEvent";
import { getTaskConfig } from "../configuration/taskSystem/taskConfig";
import { ErrorTypes } from "../errors/errorsTypes";
export default class TaskExecutor {
  private isBusy: boolean = false;
  private currentTask: ITask<TaskExecutor> | undefined;
  private cooldowns: string[] = [];
  private id: string;
  public onExecutorAvailable: TypedEvent<TaskExecutor> = new TypedEvent();

  //#region Getters
  public get IsBusy() {
    return this.isBusy;
  }
  public get CurrentTask() {
    return this.currentTask;
  }
  public get Id() {
    return this.id;
  }
  public get Cooldowns() {
    return this.cooldowns;
  }
  //#endregion

  constructor(id: string) {
    this.id = id;
    this.executeTask = this.executeTask.bind(this);
  }

  public async executeTask(task: ITask<TaskExecutor>) {
    if (!this.canExecuteTask(task.TaskType)) throw new Error("Executor can't execute this task");

    this.setupTask(task);

    try {
      await task.execute(this);
      this.setCooldown(task.TaskType, getTaskConfig(task.TaskType).interval);
    } catch (err) {
      if (err?.constructor.name == ErrorTypes.TooManyRequestsError)
        this.setCooldown(task.TaskType, getTaskConfig(task.TaskType).cooldownOn429);
      else this.setCooldown(task.TaskType, getTaskConfig(task.TaskType).cooldownOnError);
      throw err;
    } finally {
      this.releaseTask();
    }
  }

  private setCooldown(taskType: string, cooldown: number) {
    this.cooldowns.push(taskType);

    setTimeout(() => {
      this.cooldowns.splice(this.cooldowns.indexOf(taskType), 1);
      if (!this.isBusy) {
        this.onExecutorAvailable.emit(this);
      }
    }, cooldown);
  }

  private releaseTask() {
    this.currentTask = undefined;
    this.isBusy = false;
  }

  private setupTask(task: ITask<TaskExecutor> | undefined) {
    this.currentTask = task;
    this.isBusy = true;
  }
  public canExecuteTask(taskType: string): boolean {
    return !this.isBusy && !this.Cooldowns.includes(taskType);
  }
}
