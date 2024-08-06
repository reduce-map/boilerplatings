import { injectable } from "inversify";
import TaskExecutor from "./taskExecutor";
import ITask from "../actions/task";
import { TypedEvent } from "../events/typedEvent";
import { Logger } from "winston";
import { config } from "../configuration/config";
import { set } from "mongoose";

export enum ExecutorsControllerEvents {
    ExecutorAvailable = "executorAvailable",
    ExecutorBusy = "executorBusy",
}
export type ExecutorTaskEventArgs = { executor: TaskExecutor; handledTask: ITask<TaskExecutor> };

export type ExecutorAvailableEventArgs = { executor: TaskExecutor; taskType: string };
export type TaskFailedEventArgs = { executor: TaskExecutor; error: Error; task: ITask<TaskExecutor> };
@injectable()
class ExecutorsController {
    private availableExecutors: TaskExecutor[] = new Array<TaskExecutor>();
    private busyExecutors: TaskExecutor[] = new Array<TaskExecutor>();
    // string - executor id, number - count of failed tasks in a row
    private executorFailStat: Map<string, number> = new Map<string, number>();

    //#region  Events
    public onExecutorAvailable: TypedEvent<ExecutorAvailableEventArgs> = new TypedEvent<ExecutorAvailableEventArgs>();
    public onExecutorBusy: TypedEvent<ExecutorTaskEventArgs> = new TypedEvent<ExecutorTaskEventArgs>();
    public onExecutorFailed: TypedEvent<TaskFailedEventArgs> = new TypedEvent<TaskFailedEventArgs>();
    public onAllExecutorsAvailable: TypedEvent<void> = new TypedEvent<void>();
    //#endregion

    public constructor(private logger: Logger) {
        //#region bind this to methods
        this.attachExecutor = this.attachExecutor.bind(this);
        this.detachExecutor = this.detachExecutor.bind(this);
        this.handleExecutorTaskFailed = this.handleExecutorTaskFailed.bind(this);
        this.handleExecutorTaskReceived = this.handleExecutorTaskReceived.bind(this);
        this.handleExecutorTaskReleased = this.handleExecutorTaskReleased.bind(this);
        this.handleExecutorTaskSuccess = this.handleExecutorTaskSuccess.bind(this);
        this.emitExecutorAvailable = this.emitExecutorAvailable.bind(this);
        this.executeTask = this.executeTask.bind(this);
        this.removeExecutor = this.removeExecutor.bind(this);
        this.getAvailableExecutor = this.getAvailableExecutor.bind(this);
        this.getAvailableExecutors = this.getAvailableExecutors.bind(this);
        this.getBusyExecutors = this.getBusyExecutors.bind(this);
        this.clearAllExecutors = this.clearAllExecutors.bind(this);
        //#endregion
    }
    /**
     *
     * @param task
     * @returns false if no available executors for this type of task now
     */
    public async executeTask(task: ITask<TaskExecutor>): Promise<boolean> {
        let executor = this.getAvailableExecutorForTask(task.TaskType);
        if (!executor) return false;
        this.logger.debug(`${this.availableExecutors.length} available executors right now`);
        try {
            this.handleExecutorTaskReceived(executor);
            this.logger.debug(`Executor (${executor.Id}) received task: ${task?.TaskType}. Can retry task: ${task?.CanRetry}`);
            await executor.executeTask(task);

            this.handleExecutorTaskSuccess(executor);
            return true;
        } catch (error) {
            this.handleExecutorTaskFailed({ executor: executor, error: error as Error, task: task });
            throw error;
        } finally {
            this.handleExecutorTaskReleased(executor);
        }
    }

    //#region  Executor management
    public attachExecutor(executor: TaskExecutor) {
        if (executor.IsBusy) {
            this.busyExecutors.push(executor);
            this.onExecutorBusy.emit({ executor: executor, handledTask: executor.CurrentTask! });
        } else {
            this.availableExecutors.push(executor);
            this.emitExecutorAvailable(executor);
        }
        this.subscribeToExecutorEvents(executor);
    }

    public detachExecutor(executor: TaskExecutor) {
        this.removeExecutor(executor);
        this.unsubscribeFromExecutorEvents(executor);
    }

    private removeExecutor(executor: TaskExecutor) {
        if (this.busyExecutors.includes(executor)) {
            this.busyExecutors.splice(this.busyExecutors.indexOf(executor), 1);
        } else if (this.availableExecutors.includes(executor)) {
            this.availableExecutors.splice(this.availableExecutors.indexOf(executor), 1);
        }
    }

    public isExecutorAttached(executor: TaskExecutor): boolean {
        return this.busyExecutors.includes(executor) || this.availableExecutors.includes(executor);
    }

    public clearAllExecutors() {
        this.availableExecutors = [];
        this.busyExecutors = [];
    }

    public getAvailableExecutors(): TaskExecutor[] {
        return this.availableExecutors;
    }

    public getAvailableExecutor(): TaskExecutor | undefined {
        if (this.availableExecutors.length > 0) {
            return this.availableExecutors[0];
        } else {
            return undefined;
        }
    }

    getAvailableExecutorForTask(taskType: string): TaskExecutor | undefined {
        return this.availableExecutors.find((executor) => executor.canExecuteTask(taskType));
    }

    public getBusyExecutors(): TaskExecutor[] {
        return this.busyExecutors;
    }

    public isAllExecutorsAvailable(): boolean {
        return this.busyExecutors.length == 0 && this.availableExecutors.length > 0;
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
        //emitting executor available event for all available tasks in this moment for executor
        taskFactory
            .getCurrentTaskTypes()
            .filter((task) => !executor.Cooldowns.includes(task))
            .forEach((procurableTask) => {
                this.onExecutorAvailable.emit({ executor: executor, taskType: procurableTask });
            });
        if (this.isAllExecutorsAvailable()) this.onAllExecutorsAvailable.emit();
    }
    //#endregion
    //#region Event handlers

    private handleExecutorTaskFailed(taskFailedArgs: TaskFailedEventArgs) {
        this.logger.error(
            `Executor ${taskFailedArgs.executor.Id} failed to execute task ${taskFailedArgs.task.TaskType} with error ${taskFailedArgs.error}`
        );
        let executorFailsInRow = this.executorFailStat.get(taskFailedArgs.executor.Id) || 0;
        this.executorFailStat.set(taskFailedArgs.executor.Id, ++executorFailsInRow);
        if (config.detachExecutorOnFailInRow.enabled && executorFailsInRow >= config.detachExecutorOnFailInRow.failCount) {
            this.detachExecutor(taskFailedArgs.executor);
            this.logger.warn(`Executor ${taskFailedArgs.executor.Id} detached from controller`);
        }
        else if(config.fullCooldownExecutorOnFailInRow.enabled && executorFailsInRow >= config.fullCooldownExecutorOnFailInRow.failCount){
            const randomCooldown = Math.floor(Math.random() * config.fullCooldownExecutorOnFailInRow.randomWindow);
            const cooldown = config.fullCooldownExecutorOnFailInRow.baseCooldown + randomCooldown;
            this.logger.warn(`Executor ${taskFailedArgs.executor.Id} set to full cooldown. Full cooldown time: ${cooldown} ms`);
            this.detachExecutor(taskFailedArgs.executor);
            this.executorFailStat.set(taskFailedArgs.executor.Id, 0);
            setTimeout(() => {
                this.logger.info(`Executor ${taskFailedArgs.executor.Id} cooldown finished`)
                this.attachExecutor(taskFailedArgs.executor);
            }, cooldown);
        }
        this.onExecutorFailed.emit(taskFailedArgs);
    }
    

    private handleExecutorTaskSuccess(executor: TaskExecutor) {
        this.executorFailStat.set(executor.Id, 0);
    }
    
    private handleExecutorTaskReleased(executor: TaskExecutor) {
        if(!this.isExecutorAttached(executor)) 
            return;
        this.removeExecutor(executor);
        this.availableExecutors.push(executor);
        this.emitExecutorAvailable(executor);
        this.logger.debug(`Executor ${executor.Id} released task`);
    }

    private handleExecutorTaskReceived(executor: TaskExecutor) {
        if(!this.isExecutorAttached(executor)) throw new Error(`Executor ${executor.Id} is not attached to the controller`);
        this.removeExecutor(executor);
        this.busyExecutors.push(executor);
        this.onExecutorBusy.emit({ executor: executor, handledTask: executor.CurrentTask! });
    }
    //#endregion
}

export default ExecutorsController;
