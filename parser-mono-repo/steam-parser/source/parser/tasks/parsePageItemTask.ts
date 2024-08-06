import { inject } from "inversify";
import ITask from "../../actions/task";
import SteamExecutor from "../steamExecutor";

import { writeFile } from "fs";
import { Logger } from "winston";
import { MarketService, PageItem, ItemInfo as SteamItemInfoResult } from "steam-interaction";
import { TooManyRequestsError } from "../../errors/tooManyRequestsError";
import { Task } from "../../actions/taskBase";
import { HttpStatusCode } from "axios";
import { ItemsController } from "../../actors/itemsController";
import { ParsingService } from "../../actors/parsingService";
import { ListingRequestTask } from "./infrastructure/listingRequestTask";

export class ParsePageItemTask extends ListingRequestTask {
  //how to link tasks
  public constructor(
    private logger: Logger,
    private itemToProcess: PageItem,
    private itemsController: ItemsController,
    private parsingService: ParsingService
  ) {
    super();
  }
  async executeTask(executor: SteamExecutor): Promise<void> {
    const marketService = executor.marketService!;
    const nameId = await this.tryGetItemNameId(
      this.itemToProcess.hash_name,
      this.itemToProcess.asset_description.appid,
      marketService
    );
    let item = this.itemsController.parseItem(this.itemToProcess, nameId);
    item = await this.itemsController.createItem(item);
    this.parsingService.taskManager.queueTasks(
      await taskFactory.createDistinctItemDataParseTasks(item, this.itemToProcess.sell_listings)
    );
    this.logger.debug(`successfully created itemInfo with nameid for ${item.itemName}`);
  }
    private async tryGetItemNameId(itemName: string, appId: number, marketService: MarketService) {
    const result = await marketService.getItemInfo(appId, itemName);
    const nameId = result?.nameId;
    if (!nameId) throw new Error(`Failed to get nameId of item ${itemName} on app ${appId}`);
    return nameId;
  }
}
