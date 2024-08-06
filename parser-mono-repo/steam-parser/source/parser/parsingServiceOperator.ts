import { Logger } from "winston";
import { ItemsController } from "../actors/itemsController";
import { ParsingService } from "../actors/parsingService";
import { config } from "../configuration/config";
import { Container } from "inversify";
import { startInitialParsing } from "./initialParsingSetup";
import { TaskFactory } from "./tasks/infrastructure/tasksFactory";

export class ParsingServiceOperator {
    private recrudescentAppCircleTimeout: NodeJS.Timeout | undefined;
    private logger: Logger;
    private containerIoC: Container;
    private taskFactory: TaskFactory;

    constructor(containerIoC: Container, taskFactory: TaskFactory, logger: Logger) {
        this.logger = logger;
        this.containerIoC = containerIoC;
        this.taskFactory = taskFactory;

        this.onAllTasksFinished = this.onAllTasksFinished.bind(this);
        this.addTasksForItemsToParse = this.addTasksForItemsToParse.bind(this);
    }

    public processParsingServiceTaskFinish(targetService: ParsingService) {
        targetService.onAllTasksFinished.on(this.onAllTasksFinished);
    }

    private onAllTasksFinished(parsingService: ParsingService) {
        if (this.recrudescentAppCircleTimeout) {
            clearTimeout(this.recrudescentAppCircleTimeout);
            this.recrudescentAppCircleTimeout = undefined;
        }
        this.recrudescentAppCircleTimeout = setTimeout(
            () => this.addTasksForItemsToParse(parsingService),
            config.doubleCheckQueueEmptyTimeout
        );
    }

    private async addTasksForItemsToParse(parsingService: ParsingService) {
        this.logger.info("All tasks finished, start adding tasks for items to parse");

        for (let appId of config.gamesToParse) {
            await this.provideDeprecatedItemsRefresh(appId, parsingService);
        }

        //if queue is empty, it means that all items are parsed and we can try to parse it again from scratch
        if (parsingService.taskManager.isQueueEmpty() && config.allowCyclicalParsing) {
            this.logger.info("All items parsed, start initial parsing again");
            startInitialParsing(parsingService, this.taskFactory);
        }

        this.recrudescentAppCircleTimeout = undefined;
    }

    private async provideDeprecatedItemsRefresh(appId: number, parsingService: ParsingService) {
        const itemsController = this.containerIoC.getNamed<ItemsController>(ItemsController, appId.toString());
        const itemsToParse = await itemsController.getItems({ lastParseTimestamp: { $lt: appStartTime } }); //where ts older than app start time
        this.logger.info(`In database found ${itemsToParse.length} items to parse for app ${appId}`);

        if (itemsToParse.length > 0) {
            for (let item of itemsToParse) {
                parsingService.taskManager.queueTasks(await taskFactory.createDistinctItemDataParseTasks(item, 0));
            }
            this.logger.info(`Tasks for parsing items orders and prices from database for app ${appId} created`);
        } else {
            this.logger.info(`No deprecated items to parse for app ${appId}`);
        }
    }
}
