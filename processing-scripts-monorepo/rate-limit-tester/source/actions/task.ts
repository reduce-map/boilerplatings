import TaskExecutor from "../actors/taskExecutor";

export enum TaskResult {
     Success,
     Fail,
     Retry
}

export interface ITask<Executor extends TaskExecutor> {    
     execute(executor: Executor) : Promise<TaskResult>;
     /**
      * @description decrement retries left
      * @returns true if task retries left
      * @returns false if task retries is over
      */    
     get TaskURL(): string;
     getTaskForRetry(): ITask<Executor> | undefined;
}
