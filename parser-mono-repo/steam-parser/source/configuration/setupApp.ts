import { config, getItemDbConnectionString } from "./config";
import { setupExecutors } from "./taskSystem/setupExecutors";
import { AppIdContext, IoCContainerParams, setupIoC } from "./injection/setupIoC";
import { createDbContext } from "polyData";
import { LoggerTypes } from "./injection/types/logger.type";
import { log } from "console";
import { create } from "domain";
import { TaskFactory } from "../parser/tasks/infrastructure/tasksFactory";
import { ItemsController } from "../actors/itemsController";
import { ParsingService } from "../actors/parsingService";
import { setupGlobal } from "./global/setupGlobal";
import { Logger } from "winston";
import { ParsingServiceOperator } from "../parser/parsingServiceOperator";
import { startInitialParsing } from "../parser/initialParsingSetup";

export async function setupApp() {
    //#region Setup IoC And Databases Connections

    const container = setupIoC(await createIoCContainerParams());

    const logger = container.get<Logger>(LoggerTypes.Logger);
    const parsingService = container.get<ParsingService>(ParsingService);
    logger.debug(`IoC container setup completed`);
    //#endregion

    setupErrorHandling(logger);

    let taskFactory = new TaskFactory(container);
    setupGlobal(taskFactory);

    logger.debug("Setup postpone finish handling");
    const parsingServiceOperator = new ParsingServiceOperator(container, taskFactory, logger);
    parsingServiceOperator.processParsingServiceTaskFinish(parsingService);

    logger.debug("Setup executors");
    await setupExecutors(container);

    logger.info(`App initialization completed`);
    startInitialParsing(parsingService, taskFactory);
}

function setupErrorHandling(logger: Logger) {
    process.on("uncaughtException", (err) => {
        logger.error("Uncaught exception: " + err.message + err.stack);
        logger.info("Exception ignored");
    });

    process.on("unhandledRejection", (reason: any, promise: Promise<unknown>) => {
        logger.error("Unhandled rejection at: " + reason.message + reason.stack);
        logger.info("Rejection ignored");
    });
}

async function createIoCContainerParams(): Promise<IoCContainerParams> {
    const credentialsDbContext = await createDbContext(config.credentialsDbConnectionString);

    const appSpecificItemDbContexts: AppIdContext[] = [];

    for (let appId of config.gamesToParse) {
        const dbContext = await createDbContext(getItemDbConnectionString(appId), {
            authSource: config.steamItemsClusterAuthSource,
        });
        appSpecificItemDbContexts.push({ appId: appId, dbContext: dbContext });
    }

    return {
        credentialsDbContext: credentialsDbContext,
        appSpecificItemDbContexts: appSpecificItemDbContexts,
    };
}
