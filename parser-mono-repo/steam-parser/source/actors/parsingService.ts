import { Logger } from "winston";
import ExecutorsController, { ExecutorAvailableEventArgs } from "./executorsController";
import TaskManager from "../actions/taskManager";
import ITask from "../actions/task";
import SteamExecutor from "../parser/steamExecutor";
import { TypedEvent } from "../events/typedEvent";

export class ParsingService {
    public executorsController: ExecutorsController;
    public taskManager: TaskManager<ITask<SteamExecutor>>;

    public onAllTasksFinished: TypedEvent<ParsingService> = new TypedEvent<ParsingService>();

    constructor(private logger : Logger) {
        this.executorsController = new ExecutorsController(this.logger);
        this.taskManager = new TaskManager(this.logger);

        //#region bind this to methods
        this.handleExecutorAvailable = this.handleExecutorAvailable.bind(this);
        this.handleAndExecuteTask = this.handleAndExecuteTask.bind(this);
        this.handleAllTasksFinished = this.handleAllTasksFinished.bind(this);
        //#endregion

        this.subscribeToEvents();
    }

    private subscribeToEvents() {
        this.executorsController.onExecutorAvailable.on(this.handleExecutorAvailable);
        this.taskManager.onRunOutOfTasks.on(this.handleAllTasksFinished);
        this.taskManager.onTaskAdded.on(() => this.handleAndExecuteTask());
    }

    private async handleExecutorAvailable(eventArgs: ExecutorAvailableEventArgs) {
        if (eventArgs.executor.IsBusy) return;
        this.handleAndExecuteTask(eventArgs.taskType);
    }

    private async handleAndExecuteTask(targetTaskType?: string) {
        const task = this.taskManager.dequeueTask(targetTaskType);
        
        if (!targetTaskType && !task) {
            this.logger.warn("TaskManager returned undefined task on task added event. Queue is empty.");
        }

        if (!task) {
            return;
        }

        try {
            const successExecution = await this.executorsController.executeTask(task);
            if (!successExecution) {
                this.taskManager.queueTask(task, false);
            }
        } catch (err) {
            this.logger.error(`Error while executing task ${task.TaskType}`, { err });
            if (task.CanRetry) {
                this.taskManager.attachTaskToStart(task, false);
                this.logger.info(`Retrying task ${task.TaskType}, attached to start`);
            }
        }
    }

    private handleAllTasksFinished() {

        if (!this.taskManager.isQueueEmpty()) {
            return;
        }
        this.logger.info("All task finished, emitting subscribed events on end of parsing");
        this.onAllTasksFinished.emit(this);
    }

}
