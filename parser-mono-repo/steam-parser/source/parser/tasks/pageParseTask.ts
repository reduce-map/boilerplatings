import SteamExecutor from "../steamExecutor";
import { Logger } from "winston";
import { MarketService, PageItem, ItemInfo as SteamItemInfoResult } from "steam-interaction";
import { TooManyRequestsError } from "../../errors/tooManyRequestsError";
import { ParsingService } from "../../actors/parsingService";
import { Task } from "../../actions/taskBase";
import { HttpStatusCode } from "axios";
import { ItemsController } from "../../actors/itemsController";

export class PageParseTask extends Task<SteamExecutor> {
  public constructor(
    private logger: Logger,
    private page: number,
    private countToParse: number,
    private appId: number,
    private parsingService: ParsingService,
    private itemsController: ItemsController
  ) {
    super();
  }

  async executeTask(executor: SteamExecutor): Promise<void> {
    const marketService = executor.marketService!;
    const parsedItems: PageItem[] = await this.tryGetItemsFromPage(marketService);

    //already stored items in database
    const alreadyStoredItems = await this.itemsController.getItemsByNames(parsedItems.map((item) => item.hash_name));
    //items parsed from page but not stored in database, need to parse and be created
    const itemsToCreate = parsedItems.filter(
      (item) => !alreadyStoredItems.find((storedItem) => storedItem.itemName == item.hash_name)
    );

    //creating task for parsing item which is not created
    for (let itemToCreate of itemsToCreate)
      this.parsingService.taskManager.queueTask(taskFactory.createParsePageItemTask(itemToCreate, this.appId));

    //creating task for parsing item data(prices, orders, listings) for already created items
    for (let alreadyStoredItem of alreadyStoredItems) {
      const parsedItem = parsedItems.find((item) => item.hash_name == alreadyStoredItem.itemName);
      if (!parsedItem) throw new Error(`Failed to find parsed item ${alreadyStoredItem.itemName}`);
      this.parsingService.taskManager.queueTasks(
        await taskFactory.createDistinctItemDataParseTasks(alreadyStoredItem, parsedItem.sell_listings)
      );
    }

    this.logger.debug(
      `successfully parsed ${parsedItems!.length} items  from page ${this.page} with appid ${this.appId}. ${
        itemsToCreate.length
      } items to create`
    );
  }

  private async tryGetItemsFromPage(marketService: MarketService): Promise<PageItem[]> {
    const items = await marketService.getItemsFromPage(this.page, this.appId, this.countToParse);
    if (items.length != 0) return items;
    throw new Error(`Failed to get items from page ${this.page} with appid ${this.appId}`);
  }
}
