import { SteamAccount, AccountCookie, Cookie, IRepository, ModelRepository, createSteamAccountModel, createDbContext} from 'polyData';
import { REPOSITORIES_TYPES } from './injection/repositories.types';
import { Connection } from 'mongoose';
import { Container } from 'inversify';
import {AccountWebAuthorizationService, AccountRepositoryController} from 'steam-authorization';
import winston from 'winston';
import logger from '../utils/logger';
import { AccountLoggerManager } from '../utils/accountLoggerManager';

export async function setupDbContext(containerIoC : Container,connectionString: string){
    containerIoC.bind<Connection>(Connection).toConstantValue(await createDbContext(connectionString));
}

export function setupIoC(containerIoC : Container){
    setupLoggers(containerIoC);
    setupRepositories(containerIoC);
    
    containerIoC.bind<AccountRepositoryController>(AccountRepositoryController).toDynamicValue(() =>{
        let accountRepository = containerIoC.get<IRepository<SteamAccount>>(REPOSITORIES_TYPES.AccountRepository);
        return new AccountRepositoryController(accountRepository);
    });

    containerIoC.bind<AccountWebAuthorizationService>(AccountWebAuthorizationService).toSelf().inSingletonScope();
}

function setupLoggers(containerIoC : Container){
    containerIoC.bind<winston.Logger>(winston.Logger).toConstantValue(logger)
    containerIoC.bind<AccountLoggerManager>(AccountLoggerManager).toConstantValue(new AccountLoggerManager());
}

function setupRepositories(containerIoC : Container){
    const context = containerIoC.get<Connection>(Connection);
    const accountModel = createSteamAccountModel(context);
    containerIoC.bind<IRepository<SteamAccount>>(REPOSITORIES_TYPES.AccountRepository).toConstantValue(new ModelRepository(accountModel));
}