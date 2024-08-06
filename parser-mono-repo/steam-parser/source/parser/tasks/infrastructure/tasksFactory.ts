import { CreatePageParseTasksTask } from "../createPageParseTasksTask";
import { LoggerTypes } from "../../../configuration/injection/types/logger.type";
import { ItemInfo, ItemListings } from "polyData";
import { ParsingService } from "../../../actors/parsingService";
import { config } from "../../../configuration/config";
import { Container } from "inversify";
import { PageParseTask } from "../pageParseTask";
import { ParsePageItemTask } from "../parsePageItemTask";
import { PageItem } from "steam-interaction";
import { ItemsController } from "../../../actors/itemsController";
import { ItemPricesParseTask } from "../itemPricesParseTask";
import { ItemOrdersParseTask } from "../itemOrdersParseTask";
import SteamExecutor from "../../steamExecutor";
import ITask from "../../../actions/task";
import { ItemListingsParseTask } from "../itemListingsParseTask";
import { Logger } from "winston";

export class TaskFactory {
    private logger: Logger;
    private parsingService: ParsingService;

    constructor(private containerIoC: Container) {
        this.logger = containerIoC.get<Logger>(LoggerTypes.Logger);
        this.containerIoC = containerIoC;
        this.parsingService = containerIoC.get<ParsingService>(ParsingService);
    }

    createPageParseTasksTask(appId: number) {
        return new CreatePageParseTasksTask(this.logger, appId, config.countItemsPerPage, this.parsingService);
    }

    createPageParseTask(page: number, appId: number, countToParse: number) {
        return new PageParseTask(
            this.logger,
            page,
            countToParse,
            appId,
            this.parsingService,
            this.getItemsController(appId)
        );
    }

    createParsePageItemTask(item: PageItem, appId: number) {
        return new ParsePageItemTask(this.logger, item, this.getItemsController(appId), this.parsingService);
    }

    getCurrentTaskTypes(): string[] {
        return this.parsingService.taskManager.getTaskTypes();
    }
    /**
     * Create task for parse item prices and item orders if enabled in config.
     * create tasks for parse item listings if enabled in config.
     * count of parsing listings pages limited by config.maxListingPagesToParseCount.
     * also create item listings object in db if it doesn't exist.
     * and clear old listings if they exist.
     */
    async createDistinctItemDataParseTasks(item: ItemInfo, totalSellListingsCount: number): Promise<ITask<SteamExecutor>[]> {
        const tasks: ITask<SteamExecutor>[] = [];
        if (config.itemDataParseConfig.parseItemPrices) tasks.push(this.createItemPricesParseTask(item));
        if (config.itemDataParseConfig.parseItemOrders) tasks.push(this.createItemOrdersParseTask(item));
        if (!config.itemDataParseConfig.parseItemListings || item.commodity) {
            return tasks;
        }

        const itemsController = this.getItemsController(item.appID);
        if (item.itemListings) {
            //clear old listings
            await itemsController.clearItemListings(item.itemListings.toString());
        } else {
            // if we don't have listings object in db asociated with item, create new one
            const itemListings = await itemsController.createItemListings(new ItemListings());
            item.itemListings = itemListings._id;
            await itemsController.updateItem(item);
        }

        let pagesCount = Math.ceil(totalSellListingsCount! / config.countListingsPerPage);
        if (config.maxListingPagesToParseCount){
          pagesCount = pagesCount > config.maxListingPagesToParseCount 
          ? config.maxListingPagesToParseCount : pagesCount;
        }

        for (let i = 0; i < pagesCount; i++) {
            tasks.push(this.createItemListingsParseTask(item, i, config.countListingsPerPage));
        }

        return tasks;
    }

    createItemPricesParseTask(item: ItemInfo) {
        return new ItemPricesParseTask(this.logger, item, this.getItemsController(item.appID));
    }
    createItemOrdersParseTask(item: ItemInfo) {
        return new ItemOrdersParseTask(this.logger, item, this.getItemsController(item.appID));
    }
    createItemListingsParseTask(item: ItemInfo, page: number, countPerPage: number) {
        return new ItemListingsParseTask(this.logger, item, page, countPerPage, this.getItemsController(item.appID));
    }
    private getItemsController(appId: number) {
        return this.containerIoC.getNamed<ItemsController>(ItemsController, appId.toString());
    }
}
