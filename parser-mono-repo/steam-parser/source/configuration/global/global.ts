import { TaskFactory } from "../../parser/tasks/infrastructure/tasksFactory";

declare global {
  var taskFactory: TaskFactory;
  var appStartTime: Date;
}
