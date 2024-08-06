import { createLogger, format, transports } from "winston";
import fs from "fs";
import path from "path";
import moment from "moment";
const now = moment();
const year = now.format("YYYY");
const month = now.format("MM");

const logDir = path.join("./", "logs", year, month);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFile = path.join(logDir, `${now.format('YYYY_MM_DD')}.log`);
const maxLevelLength = 5;
const colorize = format.colorize();
const logger = createLogger({
  level: "debug",
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(info => {
          const level = info.level.toUpperCase().padEnd(maxLevelLength);
          const coloredLevel = colorize.colorize(info.level, level);
          return `${info.timestamp} ${coloredLevel}: ${info.message}`;
        })
      ),
    }),
    new transports.File({
      filename: logFile,
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf((info) => `${info.timestamp} ${info.level.toUpperCase().padEnd(maxLevelLength)}: ${info.message}`)
      ),
    }),
  ],
});

export default logger;
