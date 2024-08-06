import SteamExecutor from "../steamExecutor";
import { MarketService } from "steam-interaction";
import { Logger } from "winston";
import { ParsingService } from "../../actors/parsingService";
import { Task } from "../../actions/taskBase";
import { config } from "../../configuration/config";

export class CreatePageParseTasksTask extends Task<SteamExecutor> {
  public constructor(
    private logger: Logger,
    public appId: number,
    public itemsPerPage: number,
    private parsingService: ParsingService
  ) {
    super();
  }
  async executeTask(executor: SteamExecutor): Promise<void> {
    const marketService = executor.marketService!;

    const itemsCount = await this.tryGetCountOfItems(marketService);

    let pagesCount = Math.ceil(itemsCount! / this.itemsPerPage);
    this.logger.info(`start creating tasks for parsing ${pagesCount} pages on app ${this.appId}`);

    for (let i = 0; i < pagesCount; i++) {
      this.parsingService.taskManager.queueTask(
        taskFactory.createPageParseTask(i + 1, this.appId, config.countItemsPerPage)
      );
    }
    this.logger.info(`tasks for parsing ${pagesCount} pages on app ${this.appId} created`);
  }

  private async tryGetCountOfItems(marketService: MarketService): Promise<number> {
    const itemsCount = await marketService.getMarketItemsCount(this.appId);
    if (!itemsCount) throw new Error(`Failed to get items count on app ${this.appId}`);
    return itemsCount;
  }
}
