import winston, { createLogger, format, transports } from "winston";
import path from "path";



export class AccountLoggerManager {
  private loggers: Map<string, winston.Logger>;
  colorize: winston.Logform.Colorizer;
  constructor(private folder: string = "account-logs", private maxLevelLength: number = 5, private maxAccountIdLength: number = 13) {
    this.loggers = new Map();
    this.colorize = format.colorize();
  }
  /**
   * Returns logger for account with given id
   * If logger doesn't exist, creates new one
   * @param accountId file name for logger
   * @returns logger for account with given id
   */
  getLogger(accountId: string, enableConsoleOutput: boolean = false): winston.Logger {
    if (!this.loggers.has(accountId)) {
      const fileName = path.join("./", this.folder, `${accountId}.log`);
      const loggerConfig: winston.LoggerOptions = {
        level: "debug",
        transports: [
          new transports.File({
            filename: fileName,
            format: format.combine(
              format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
              format.printf((info) => `${info.timestamp} ${info.level.toUpperCase().padEnd(this.maxLevelLength)}: ${info.message}`)
            ),
          }),
        ],
      };
      if (enableConsoleOutput)
        (loggerConfig.transports as winston.transport[]).push(
          new transports.Console({
            format: format.combine(
              format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
              format.printf(info => {
                const level = info.level.toUpperCase().padEnd(this.maxLevelLength);
                const coloredLevel = this.colorize.colorize(info.level, level);
                return `${info.timestamp} ${coloredLevel}: ${this.formatAccountMessage(accountId, info.message)}`;
              })
            ),
          })
        );
      const logger = createLogger(loggerConfig);
      this.loggers.set(accountId, logger);
      return logger;
    }
    return this.loggers.get(accountId)!;
  }
  formatAccountMessage(accountId: string, message: string): string {
    return `${accountId.padEnd(this.maxAccountIdLength)}➡️ : ${message}`;
  }
}
