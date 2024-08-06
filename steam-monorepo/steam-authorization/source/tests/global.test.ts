import 'reflect-metadata'
import 'module-alias/register'
import { Container } from "inversify";
import { setupDbContext, setupIoC } from "./config/setupIoC";

 declare global {
    var containerIoC: Container; 
}

global.containerIoC = new Container();
export async function setupGlobal(){
    await setupDbContext(global.containerIoC ,"mongodb://localhost:27017/steamAccount");
    setupIoC(global.containerIoC);
}

export default global;