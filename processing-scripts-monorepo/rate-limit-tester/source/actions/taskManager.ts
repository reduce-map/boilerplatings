import {ITask} from "./task";
import TaskExecutor from "../actors/taskExecutor";
import { Queue } from "typescript-collections";
import { TypedEvent } from "../events/typedEvent";

export default class TaskManager<Task extends ITask<TaskExecutor>> {
  private taskQueue: Queue<Task> = new Queue();

  public onTaskAdded: TypedEvent<Task> = new TypedEvent();
  public onRunOutOfTasks: TypedEvent<void> = new TypedEvent();
  
  constructor() {}

  public queueTask(task: Task, emitTaskAdded: boolean = true) {
    this.taskQueue.enqueue(task);
    if (emitTaskAdded) this.onTaskAdded.emit(task);
  }
  public queueTasks(tasks: Task[], emitTaskAdded: boolean = true) {
    for (let task of tasks) {
      this.queueTask(task, emitTaskAdded);
    }
  }

  public dequeueTask(): Task | undefined {
    const task = this.taskQueue.dequeue();
    this.checkAndEmitIfQueueEmpty();
    return task;
  }

  private checkAndEmitIfQueueEmpty() {
    if (this.taskQueue.isEmpty())
    this.onRunOutOfTasks.emit();
  }

}
