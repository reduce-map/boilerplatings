import { ParsingService } from "../actors/parsingService";
import { config } from "../configuration/config";
import { TaskFactory } from "./tasks/infrastructure/tasksFactory";

export function startInitialParsing(parsingService: ParsingService, taskFactory: TaskFactory){
    for (let gameId of config.gamesToParse)  {
      parsingService.taskManager.queueTask(taskFactory.createPageParseTasksTask(gameId));
    }
  }