import { FilterQuery } from "mongoose";
import { IRepository, ItemInfo, ItemListings, ItemOrders, ItemPrices, Listing } from "polyData";
import { OrdersHistogram, Page, PageItem, PriceHistoryResult } from "steam-interaction";

export class ItemsController {
    constructor(
        private itemInfoRepository: IRepository<ItemInfo>,
        private itemPricesRepository: IRepository<ItemPrices>,
        private itemListingsRepository: IRepository<ItemListings>,
        private itemOrdersRepository: IRepository<ItemOrders>
    ) {}
    //#region ItemInfo
    getItemsByNames(names: string[]): Promise<ItemInfo[]> {
        return this.itemInfoRepository.findManyAsync({ itemName: { $in: names } });
    }
    getItems(filter: FilterQuery<ItemInfo>): Promise<ItemInfo[]> {
        return this.itemInfoRepository.findManyAsync(filter);
    }
    createItem(item: ItemInfo): Promise<ItemInfo> {
        return this.itemInfoRepository.createAsync(item);
    }
    updateItem(item: ItemInfo): Promise<ItemInfo> {
        if (!item._id) throw new Error("Item doesn't have id");
        return this.itemInfoRepository.updateAsync(item._id.toString(), item);
    }
    parseItem(pageItem: PageItem, nameId: number): ItemInfo {
        const itemToCreate = new ItemInfo();
        itemToCreate.appID = pageItem.asset_description.appid;
        itemToCreate.itemName = pageItem.hash_name;
        itemToCreate.commodity = pageItem.asset_description.commodity == 1;
        itemToCreate.lastParseTimestamp = Date.now();
        itemToCreate.itemLink = `https://steamcommunity.com/market/listings/${itemToCreate.appID}/${encodeURIComponent(
            pageItem.hash_name
        )}`;
        itemToCreate.nameID = nameId;
        return itemToCreate;
    }
    //#endregion
    //#region ItemPrices
    createItemPrices(itemPrices: ItemPrices): Promise<ItemPrices> {
        return this.itemPricesRepository.createAsync(itemPrices);
    }

    updateItemPrices(itemPrices: ItemPrices): Promise<ItemPrices> {
        if (!itemPrices._id) throw new Error("ItemPrices doesn't have id");
        return this.itemPricesRepository.updateAsync(itemPrices._id.toString(), itemPrices);
    }

    parseItemPrices(priceHistoryResult: PriceHistoryResult[]): ItemPrices {
        const itemPrices: ItemPrices = {
            prices: priceHistoryResult.map((price) => {
                return {
                    date: price.date.toString(),
                    price: price.price,
                    salesCount: price.count,
                };
            }),
            lastParseTimestamp: Date.now(),
        };
        return itemPrices;
    }
    //#endregion
    //#region ItemListings
    createItemListings(itemListings: ItemListings): Promise<ItemListings> {
        return this.itemListingsRepository.createAsync(itemListings);
    }
    updateItemListings(itemListings: ItemListings): Promise<ItemListings> {
        if (!itemListings._id) throw new Error("ItemListings doesn't have id");
        return this.itemListingsRepository.updateAsync(itemListings._id.toString(), itemListings);
    }
    clearItemListings(itemListingsId: string): Promise<void> {
        return this.itemListingsRepository.updateAsync(itemListingsId, {
            listings: [],
            lastParseTimestamp: Date.now(),
        });
    }
    concatItemListings(itemListingsId: string, listings: Listing[]): Promise<void> {
        return this.itemListingsRepository.updateManyAsync(
            { _id: itemListingsId },
            { $push: { listings: { $each: listings }, lastParseTimestamp: Date.now() } }
        );
    }
    parseItemListings(page: Page): Listing[] {
        if (!page.data || page.data.length == 0) throw new Error("Page doesn't have data");
        const listings: Listing[] = [];
        for (const pageListing of page.data) {
            const target: any = new Listing();
            const source: any = pageListing;
            for (let targetProp in target) {
                if (source[targetProp]) {
                    target[targetProp] = source[targetProp];
                }
            }
            listings.push(target);
        }
        return listings;
    }

    //#endregion
    //#region ItemOrders
    createItemOrders(itemOrders: ItemOrders): Promise<ItemOrders> {
        return this.itemOrdersRepository.createAsync(itemOrders);
    }
    updateItemOrders(itemOrders: ItemOrders): Promise<ItemOrders> {
        if (!itemOrders._id) throw new Error("ItemOrders doesn't have id");
        return this.itemOrdersRepository.updateAsync(itemOrders._id.toString(), itemOrders);
    }
    parseItemOrders(ordersHistory: OrdersHistogram): ItemOrders {
        return { ...ordersHistory, lastParseTimestamp: Date.now() };
    }
    //#endregion
}
