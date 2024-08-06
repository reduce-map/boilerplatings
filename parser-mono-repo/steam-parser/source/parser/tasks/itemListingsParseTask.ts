import SteamExecutor from "../steamExecutor";
import { Logger } from "winston";
import { ExtendedListingsPage, MarketService, Page } from "steam-interaction";
import { config } from "../../configuration/config";
import { ItemInfo, Listing } from "polyData";
import { ItemsController } from "../../actors/itemsController";
import { ListingRequestTask } from "./infrastructure/listingRequestTask";

export class ItemListingsParseTask extends ListingRequestTask {
  public constructor(
    private logger: Logger,
    private item: ItemInfo,
    private page: number,
    private countPerPage: number,
    private itemsController: ItemsController
  ) {
    super();
  }

  protected async executeTask(executor: SteamExecutor): Promise<void> {
    if (!this.item._id) throw new Error(`Item ${this.item.itemName} doesn't have id`);
    if(this.item.commodity) throw new Error (`Item ${this.item.itemName} is commodity, listings parsing is not supported`);
    const marketService = executor.marketService!;
    const listingRequestParams: ExtendedListingsPage = {
      currentPage: this.page,
      cntPerPage: this.countPerPage,
      currency: config.steamCurrency,
      marketItemName: this.item.itemName,
      appId: this.item.appID,
    };
    const page = await this.tryGetItemListings(listingRequestParams, marketService);

    const listings = this.itemsController.parseItemListings(page);

    if (this.item.itemListings) {
      await this.itemsController.concatItemListings(this.item.itemListings.toString(), listings);
    } else
      throw new Error(
        `ItemInfo of ${this.item.itemName} doesn't have item listings, write operation cannot be performed`
      );
    this.logger.debug(`Listings successfully parsed of item ${this.item.itemName}`);
  }
  private async tryGetItemListings(listingsParams: ExtendedListingsPage, marketService: MarketService): Promise<Page> {
    const itemListings = await marketService.getMarketListings(listingsParams);
    if (itemListings.data && itemListings.data.length > 0) return itemListings;
    throw new Error(`Failed to get buy orders history of item ${this.item.itemName}`);
  }
}
