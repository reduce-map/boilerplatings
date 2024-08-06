import { Marlboro } from "logger";
import { MessageDescriber, MessageDescriberOptions, createMessageDescriber } from "./messageDescriber";
import { MessageStatus } from "./log/messageStatuses";



export class RateLimitTesterLogger {
    defaultMessageDescriber:MessageDescriber;
    resultMessageDescriber:MessageDescriber;

    constructor(logFileName:string, resultLogFileName:string) {
        this.defaultMessageDescriber = createMessageDescriber(logFileName);
        this.resultMessageDescriber = createMessageDescriber(resultLogFileName);
    }
    
    info(message: string, isResultLog:boolean = false) {
        this.defaultMessageDescriber.writeMessage(message, MessageStatus.Information);
        if(isResultLog){
            this.resultMessageDescriber.writeMessage(message, MessageStatus.Information, MessageDescriberOptions.LogFile);
        }
    };

    warn(message: string, isResultLog:boolean = false) {
        this.defaultMessageDescriber.writeMessage(message, MessageStatus.Warning);
        if(isResultLog) {
            this.resultMessageDescriber.writeMessage(message, MessageStatus.Warning, MessageDescriberOptions.LogFile);
        }
    };

    error(message: string, isResultLog:boolean = false) {
        this.defaultMessageDescriber.writeMessage(message, MessageStatus.Error);
        if(isResultLog) {
            this.resultMessageDescriber.writeMessage(message, MessageStatus.Error, MessageDescriberOptions.LogFile);
        }
    };

}