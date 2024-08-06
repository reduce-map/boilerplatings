import { config } from "../config"
export type TaskConfig = {
    interval: number,
    cooldownOnError: number,
    cooldownOn429: number,
    retriesCount: number,
}

const taskConfig:{[key: string]: TaskConfig} = config.taskConfig;
export function getTaskConfig(taskType: string ): TaskConfig{
    if(taskType in taskConfig)
        return taskConfig[taskType];
    throw new Error(`Task config for ${taskType} not found`);
}
