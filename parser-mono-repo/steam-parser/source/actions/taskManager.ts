import ITask from "./task";
import { TypedEvent } from "../events/typedEvent";
import TaskExecutor from "../actors/taskExecutor";
import { Logger } from "winston";
import { LinkedList } from "typescript-collections";

export default class TaskManager<Task extends ITask<TaskExecutor>> {
  private taskQueues: Map<string, LinkedList<Task>> = new Map();

  public onTaskAdded: TypedEvent<Task> = new TypedEvent();
  public onRunOutOfTasks: TypedEvent<void> = new TypedEvent();

  private lastLogTaskCount: number = 0;
  constructor(private logger: Logger) {
    this.setupTaskCountLogging();
  }

  private setupTaskCountLogging()
  {
    setInterval(() => {
      const taskTypes = Array.from(this.taskQueues.keys());
      if (taskTypes.length == 0) return;
      const tasksCount = taskTypes.map((x) => this.taskQueues.get(x)!.size()).reduce((a, b) => a + b);
      if(tasksCount == this.lastLogTaskCount) return; 
      this.lastLogTaskCount = tasksCount;
      this.logger.debug(
        `Total size of queue: ${tasksCount}, tasks in task manager:${taskTypes.map(
          (x) => " " + x + ": " + this.taskQueues.get(x)!.size()
        )}`
      );
    }, 5000);
  }

  public queueTask(task: Task, emitTaskAdded: boolean = true) {
    if (!this.taskQueues.has(task.TaskType)) this.taskQueues.set(task.TaskType, new LinkedList<Task>());
    this.taskQueues.get(task.TaskType)!.add(task);
    if (emitTaskAdded) this.onTaskAdded.emit(task);
  }
  public queueTasks(tasks: Task[], emitTaskAdded: boolean = true) {
    for (let task of tasks) {
      this.queueTask(task, emitTaskAdded);
    }
  }
  public attachTaskToStart(task: Task, emitTaskAdded: boolean = true) {
    if (!this.taskQueues.has(task.TaskType)) this.taskQueues.set(task.TaskType, new LinkedList<Task>());
    this.taskQueues.get(task.TaskType)!.add(task, 0); //add to start
    if (emitTaskAdded) this.onTaskAdded.emit(task);
  }

  public dequeueTask(taskType?: string): Task | undefined {
    const task = this.getTask(taskType);
    this.checkAndEmitIfQueueEmpty();
    if (task) {
      this.removeTask(task);
      return task;
    }
  }
  /**
   * @description returns all task types that now exist in task manager
   * @returns string[] of task types
   */
  public getTaskTypes(): string[] {
    return Array.from(this.taskQueues.keys());
  }
  private removeTask(task: Task): boolean {
    return this.taskQueues.get(task.TaskType)?.remove(task) ?? false;
  }
  private checkAndEmitIfQueueEmpty() {
    if (this.isQueueEmpty())
    this.onRunOutOfTasks.emit();
  }
  public isQueueEmpty(taskType?: string): boolean {
    for(let queue of this.taskQueues.values()){
      if(queue.size() > 0) return false;
    }
    return true;
  }


  private getTask(taskType?: string): Task | undefined {
    if (!taskType) {
      for (let queue of this.taskQueues.values()) {
        let task = queue.first();
        if (task) {
          return task;
        }
      }
      return undefined;
    }
    if (!this.taskQueues.has(taskType)) return undefined;
    let task = this.taskQueues.get(taskType)!.first();
    if (task) this.taskQueues.get(taskType);
    return task;
  }
}
