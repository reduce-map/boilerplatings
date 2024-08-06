import { TaskFactory } from "../../parser/tasks/infrastructure/tasksFactory";


export function setupGlobal(taskFactory:TaskFactory){
    global.taskFactory = taskFactory;
    global.appStartTime = new Date();
}   