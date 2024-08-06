import colors from 'ansi-colors'
import { MessageStatus } from "./messageStatuses";

export interface LoggerFormat {
    formatMessage(message: string, status: string, messagePainter: (target: string) => string): string;
}

export class ConsoleLogFormat implements LoggerFormat {
    formatMessage(message: string, status: string, textPainter: (target: string) => string): string {
        let colorfulStatus = textPainter(`[${status}]`);
        return `${colorfulStatus}: ${message}`;
    }
}

export class ConsoleLogger {
    private format: LoggerFormat;

    constructor(format: LoggerFormat) {
        this.format = format;
    }

    public info(message: string) {
        this.log(message, MessageStatus.Information);
    }

    public warn(message: string) {
        this.log(message, MessageStatus.Warning);
    }

    public error(message: string) {
        this.log(message, MessageStatus.Error);
    }

    private log(message: string, method: MessageStatus) {
        let formattedMessage = this.format.formatMessage(message, method.toString(), this.getConsolePainter(method));
        switch (method) {
            case MessageStatus.Information:
                console.info(formattedMessage);
                break;
            case MessageStatus.Warning:
                console.warn(formattedMessage);
                break;
            default:
                console.error(formattedMessage);
        }
    }

    private getConsolePainter(method: MessageStatus) {
        switch (method) {
            case MessageStatus.Information:
                return colors.blue;
            case MessageStatus.Warning:
                return colors.yellow;
            default:
                return colors.red;
        }
    }
}

export { MessageStatus };
