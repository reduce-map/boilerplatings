import {ITask, TaskResult} from "../actions/task";
import { config } from "../configuration/config";
import { TypedEvent } from "../events/typedEvent";

export default abstract class TaskExecutor {
  private currentTasks: Map<string, ITask<TaskExecutor>> = new Map<string, ITask<TaskExecutor>>(); // task url - task
  private cooldowns: string[] = []; // urls of tasks that can't be executed right now
  private id: string;
  public onExecutorAvailable: TypedEvent<TaskExecutor> = new TypedEvent();

  //#region Getters
  public get CurrentTasks() {
    return this.currentTasks;
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

  protected abstract executeTaskCore(task: ITask<TaskExecutor>): Promise<TaskResult>;

  public async executeTask(task: ITask<TaskExecutor>): Promise<TaskResult> {
    if (!this.canExecuteTask(task.TaskURL)) throw new Error("Executor can't execute this task");
    this.setupTask(task);
    try {
      return await this.executeTaskCore(task);
    } catch (err) {
      throw err;
    } finally {
      this.setCooldown(task.TaskURL, config.appConfig.proxyFullRecoveryCooldown);
      this.releaseTask(task);
    }
  }

  private setCooldown(taskURL: string, cooldown: number) {
    this.cooldowns.push(taskURL);

    setTimeout(() => {
      this.cooldowns.splice(this.cooldowns.indexOf(taskURL), 1);
      this.onExecutorAvailable.emit(this);
    }, cooldown);
  }

  private releaseTask(task: ITask<TaskExecutor>) {
    this.CurrentTasks.delete(task.TaskURL);
  }

  private setupTask(task: ITask<TaskExecutor>) {
    this.CurrentTasks.set(task.TaskURL, task);
  }
  public canExecuteTask(taskURL: string): boolean {
    return !this.Cooldowns.includes(taskURL) && !this.CurrentTasks.has(taskURL);
  }
}
