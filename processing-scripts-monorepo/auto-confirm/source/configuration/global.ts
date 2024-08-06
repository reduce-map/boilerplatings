import 'reflect-metadata'
import 'module-alias/register'
import { Container } from "inversify";
import { setupDbContext, setupIoC } from "./setupIoC";

 declare global {
    var containerIoC: Container; 
}

global.containerIoC = new Container();
export async function setupGlobal(connectionString: string){
    await setupDbContext(global.containerIoC ,connectionString);
    setupIoC(global.containerIoC);
}

export default global;