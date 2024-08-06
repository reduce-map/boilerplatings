import { Marlboro } from "logger";
import { ConsoleLogFormat, ConsoleLogger, MessageStatus } from "./log/consoleLogger";
import { config } from "../configuration/config";

export enum MessageDescriberOptions {
    LogFile = 1,
    LogConsole = 2,
}

export class MessageDescriber {
    constructor(private fileLogger: Marlboro, private consoleLogger: ConsoleLogger) {}


    public writeMessage(
        message: string,
        level: MessageStatus,
        logOption: MessageDescriberOptions = MessageDescriberOptions.LogConsole | MessageDescriberOptions.LogFile
    ) {
        if (logOption & MessageDescriberOptions.LogFile) {
            this.writeMessageToFile(message, level);
        }

        if (logOption & MessageDescriberOptions.LogConsole) {
            this.writeMessageToConsole(message, level);
        }
    }

    private writeMessageToConsole(message: string, level: MessageStatus) {
        switch (level) {
            case MessageStatus.Information:
                this.consoleLogger.info(message);
                break;
            case MessageStatus.Warning:
                this.consoleLogger.warn(message);
                break;
            case MessageStatus.Error:
                this.consoleLogger.error(message);
                break;
            default:
                this.fileLogger.info(message);
        }
    }

    private writeMessageToFile(message: string, level: MessageStatus) {
        switch (level) {
            case MessageStatus.Information:
                this.fileLogger.info(message);
                break;
            case MessageStatus.Warning:
                this.fileLogger.warn(message);
                break;
            case MessageStatus.Error:
                this.fileLogger.error(message);
                break;
            default:
                this.fileLogger.info(message);
        }
    }
}

export function createMessageDescriber(logFileName: string) {
    let fileLogger = new Marlboro(logFileName);
    let consoleLogger = new ConsoleLogger(new ConsoleLogFormat());
    return new MessageDescriber(fileLogger, consoleLogger);
}


