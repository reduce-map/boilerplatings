import "../global/global";
import { Logger } from "winston";
import { LoggerTypes } from "./types/logger.type";
import {logger, fileOnlyLogger} from "../../utils/logger";
import { Connection } from "mongoose";
import { Container } from "inversify";
import {
    Account,
    Proxy,
    IRepository,
    ModelRepository,
    RepositoryTypes,
    createAccountModel,
    createProxyModel,
    createItemInfoModel,
    createItemPricesModel,
    createItemOrdersModel,
    createItemListingsModel,
    ItemInfo,
    ItemListings,
    ItemOrders,
    ItemPrices,
    createAccountCookieModel,
} from "polyData";
import DbContexts from "./types/dbContexts.type";
import Tables from "./types/dbTables.type";
import { getAppDbContextType } from "./types/appDbContext.type";
import { ItemsController } from "../../actors/itemsController";
import { ParsingService } from "../../actors/parsingService";
export type AppIdContext = { appId: number; dbContext: Connection };
export type IoCContainerParams = {
    credentialsDbContext: Connection;
    appSpecificItemDbContexts: AppIdContext[];
};

function setupModelRepositories(container: Container, params: IoCContainerParams) {
    //#region  setup database contexts
    const credentialsDbContext = container.get<Connection>(DbContexts.Credentials);

    //#region Model creation
    const AccountModel = createAccountModel(credentialsDbContext, Tables.Accounts);
    const AccountCookieModel = createAccountCookieModel(credentialsDbContext, Tables.AccountCookies);
    const ProxyModel = createProxyModel(credentialsDbContext, Tables.Proxies);
    //#endregion

    //#region  app id specific models and repositories initialization
    for (let appIdContext of params.appSpecificItemDbContexts) {
        const dbContext = appIdContext.dbContext;
        const ItemInfoModel = createItemInfoModel(dbContext, Tables.ItemInfos);
        const ItemListingsModel = createItemListingsModel(dbContext, Tables.ItemListings);
        const ItemOrdersModel = createItemOrdersModel(dbContext, Tables.ItemOrders);
        const ItemPricesModel = createItemPricesModel(dbContext, Tables.ItemPrices);

        container
            .bind<IRepository<ItemInfo>>(RepositoryTypes.ItemInfoRepository)
            .toConstantValue(new ModelRepository<ItemInfo>(ItemInfoModel))
            .whenTargetNamed(appIdContext.appId.toString());

        container
            .bind<IRepository<ItemListings>>(RepositoryTypes.ItemListingsRepository)
            .toConstantValue(new ModelRepository<ItemListings>(ItemListingsModel))
            .whenTargetNamed(appIdContext.appId.toString());

        container
            .bind<IRepository<ItemOrders>>(RepositoryTypes.ItemOrdersRepository)
            .toConstantValue(new ModelRepository<ItemOrders>(ItemOrdersModel))
            .whenTargetNamed(appIdContext.appId.toString());

        container
            .bind<IRepository<ItemPrices>>(RepositoryTypes.ItemPricesRepository)
            .toConstantValue(new ModelRepository<ItemPrices>(ItemPricesModel))
            .whenTargetNamed(appIdContext.appId.toString());
    }

    //#endregion

    //#region Repositories binding

    container
        .bind<IRepository<Account>>(RepositoryTypes.AccountRepository)
        .toConstantValue(new ModelRepository<Account>(AccountModel));
    container
        .bind<IRepository<Proxy>>(RepositoryTypes.ProxyRepository)
        .toConstantValue(new ModelRepository<Proxy>(ProxyModel));

    //#endregion
}
function setupDbContexts(container: Container, params: IoCContainerParams) {
    container.bind<Connection>(DbContexts.Credentials).toConstantValue(params.credentialsDbContext);

    for (let appIdContext of params.appSpecificItemDbContexts)
        container.bind<Connection>(getAppDbContextType(appIdContext.appId)).toConstantValue(appIdContext.dbContext);
}

function setupItemControllers(container: Container, params: IoCContainerParams) {
    for (let appIdContext of params.appSpecificItemDbContexts) {
        const itemsInfoRepository = container.getNamed<IRepository<ItemInfo>>(
            RepositoryTypes.ItemInfoRepository,
            appIdContext.appId.toString()
        );
        const itemsPricesRepository = container.getNamed<IRepository<ItemPrices>>(
            RepositoryTypes.ItemPricesRepository,
            appIdContext.appId.toString()
        );
        const itemsListingsRepository = container.getNamed<IRepository<ItemListings>>(
            RepositoryTypes.ItemListingsRepository,
            appIdContext.appId.toString()
        );
        const itemsOrdersRepository = container.getNamed<IRepository<ItemOrders>>(
            RepositoryTypes.ItemOrdersRepository,
            appIdContext.appId.toString()
        );
        container
            .bind<ItemsController>(ItemsController)
            .toConstantValue(
                new ItemsController(
                    itemsInfoRepository,
                    itemsPricesRepository,
                    itemsListingsRepository,
                    itemsOrdersRepository
                )
            )
            .whenTargetNamed(appIdContext.appId.toString());
    }
}

export function setupIoC(params: IoCContainerParams) {
    const container = new Container();
    container.bind<Logger>(LoggerTypes.Logger).toConstantValue(logger);
    container.bind<Logger>(LoggerTypes.FileOnly).toConstantValue(fileOnlyLogger);
    setupDbContexts(container, params);
    setupModelRepositories(container, params);
    setupItemControllers(container, params);
    container.bind<ParsingService>(ParsingService).toConstantValue(new ParsingService(logger));
    return container;
}
