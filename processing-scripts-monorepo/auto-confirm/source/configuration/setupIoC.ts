import { SteamAccount, AccountCookie, Cookie, IRepository, ModelRepository, createSteamAccountModel, createDbContext} from 'polyData';
import { REPOSITORIES_TYPES } from './injection/repositories.types';
import { Connection } from 'mongoose';
import { Container } from 'inversify';
import {AccountRepositoryController, AccountWebAuthorizationService} from 'steam-authorization';
import logger from '../utils/logger';
import { AccountLoggerManager } from '../utils/accountLoggerManager';
import { Logger } from 'winston';

export async function setupDbContext(containerIoC : Container,connectionString: string){
    containerIoC.bind<Connection>(Connection).toConstantValue(await createDbContext(connectionString));
}

export function setupIoC(containerIoC : Container){
    setupRepositories(containerIoC);
    
    containerIoC.bind<AccountRepositoryController>(AccountRepositoryController).toDynamicValue(() =>{
        let accountRepository = containerIoC.get<IRepository<SteamAccount>>(REPOSITORIES_TYPES.AccountRepository);
        return new AccountRepositoryController(accountRepository);
    });
    const accountRepositoryController = containerIoC.get(AccountRepositoryController)
    containerIoC.bind<AccountWebAuthorizationService>(AccountWebAuthorizationService).toConstantValue(new AccountWebAuthorizationService(accountRepositoryController))
    setupLoggers(containerIoC);
}

function setupRepositories(containerIoC : Container){
    const context = containerIoC.get<Connection>(Connection);
    const accountModel = createSteamAccountModel(context);
    
    containerIoC.bind<IRepository<SteamAccount>>(REPOSITORIES_TYPES.AccountRepository).toConstantValue(new ModelRepository(accountModel));
}

function setupLoggers(containerIoC : Container)
{
 containerIoC.bind<AccountLoggerManager>(AccountLoggerManager).toConstantValue(new AccountLoggerManager());
 containerIoC.bind<Logger>(Logger).toConstantValue(logger);
}