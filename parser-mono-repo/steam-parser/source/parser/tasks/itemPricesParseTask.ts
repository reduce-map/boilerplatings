import SteamExecutor from "../steamExecutor";
import { Logger } from "winston";
import { MarketService, PriceHistoryItem, PriceHistoryResult } from "steam-interaction";
import { config } from "../../configuration/config";
import { ItemInfo, ItemPrices } from "polyData";
import { Task } from "../../actions/taskBase";
import { ItemsController } from "../../actors/itemsController";

export class ItemPricesParseTask extends Task<SteamExecutor> {
  public constructor(private logger: Logger, private item: ItemInfo, private itemsController: ItemsController) {
    super();
  }

  protected async executeTask(executor: SteamExecutor): Promise<void> {
    const marketService = executor.marketService!;
    if (!this.item._id) throw new Error(`Item ${this.item.itemName} doesn't have id`);
    //#region item price history
    const itemToGet: PriceHistoryItem = {
      currency: config.steamCurrency,
      appid: this.item.appID,
      itemName: this.item.itemName,
      encodedName: encodeURIComponent(this.item.itemName),
    };
    const priceHistoryResult: PriceHistoryResult[] = await this.tryGetItemPriceHistory(itemToGet, marketService);
    const itemPrices: ItemPrices = this.itemsController.parseItemPrices(priceHistoryResult);

    if (this.item.itemPrices) {
      itemPrices._id = this.item.itemPrices._id;
      await this.itemsController.updateItemPrices(itemPrices);
    } else {
      // if itemInfo doesn't have link to itemPrices yet
      const createdItemPrices = await this.itemsController.createItemPrices(itemPrices);
      this.item.itemPrices = createdItemPrices._id!;
      await this.itemsController.updateItem(this.item); //update itemInfo with new link to itemPrices
    }

    this.logger.debug(`PriceHistory successfully parsed of item ${itemToGet.itemName}`);
  }
  private async tryGetItemPriceHistory(
    itemToGet: PriceHistoryItem,
    marketService: MarketService
  ): Promise<PriceHistoryResult[]> {
    const priceHistory = await marketService.getPriceHistory(itemToGet);
    if (priceHistory.length != 0) return priceHistory;
    throw new Error(`Failed to get price history of item ${itemToGet.itemName}`);
  }
}
