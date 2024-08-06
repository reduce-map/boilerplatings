import TaskExecutor from "../actors/taskExecutor";

export default interface ITask<Executor extends TaskExecutor> {    
     execute(executor: Executor) : Promise<void>;
     /**
      * @description decrement retries left
      * @returns true if task retries left
      * @returns false if task retries is over
      */
     get CanRetry(): boolean;     
     get TaskType(): string;  
}
