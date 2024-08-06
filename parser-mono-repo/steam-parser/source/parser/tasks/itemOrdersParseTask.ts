import SteamExecutor from "../steamExecutor";
import { Logger } from "winston";
import { BuyOrderService, ItemOrdersHistogramBrowserSimulationParams, OrdersHistogram } from "steam-interaction";
import { config } from "../../configuration/config";
import { ItemInfo } from "polyData";
import { Task } from "../../actions/taskBase";
import { ItemsController } from "../../actors/itemsController";

export class ItemOrdersParseTask extends Task<SteamExecutor> {
  public constructor(private logger: Logger, private item: ItemInfo, private itemsController: ItemsController) {
    super();
  }

  protected async executeTask(executor: SteamExecutor): Promise<void> {
    if (!this.item._id) throw new Error(`Item ${this.item.itemName} doesn't have id`);
    const buyOrderService = executor.buyOrderService!;
    const itemOrdersHistogramParams: ItemOrdersHistogramBrowserSimulationParams = {
      nameId: this.item.nameID.toString(),
      currency: config.steamCurrency,
      appId: this.item.appID,
      itemName: this.item.itemName,
      retryCount: config.taskConfig.ItemOrdersParseTask.requestConfig.browserSimulationRetryCount,
      minRetryDelay: config.taskConfig.ItemOrdersParseTask.requestConfig.browserSimulationMinRetryInterval,
    };
    const ordersHistogram = await this.tryGetItemOrdersHistogram(
      itemOrdersHistogramParams,
      buyOrderService
    );
    const itemOrders = this.itemsController.parseItemOrders(ordersHistogram);

    if (this.item.itemOrders) {
      itemOrders._id = this.item.itemOrders._id;
      await this.itemsController.updateItemOrders(itemOrders);
    } else {
      const createdItemOrders = await this.itemsController.createItemOrders(itemOrders);
      this.item.itemOrders = createdItemOrders._id!;
      await this.itemsController.updateItem(this.item);
    }
    this.logger.debug(`Buy orders history successfully parsed of item ${this.item.itemName}`);
  }
  private async tryGetItemOrdersHistogram(
    itemOrdersHistogramParams: ItemOrdersHistogramBrowserSimulationParams,
    buyOrderService: BuyOrderService
  ): Promise<OrdersHistogram> {
    const ordersHistogram = await buyOrderService.getItemOrdersHistogramWithBrowserSimulation(itemOrdersHistogramParams);
    if (ordersHistogram) return ordersHistogram;
    throw new Error(`Failed to get orders histogram for item ${itemOrdersHistogramParams.itemName}`);
  }
}
