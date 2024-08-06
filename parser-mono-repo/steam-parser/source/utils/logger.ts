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

const logFile = path.join(logDir, `${now.format('YYYY_MM_DD-HHmmss')}.log`);

const pad = (str: string, len: number) => (str.length >= len ? str : str + " ".repeat(len - str.length));

const truncateErrors = format.printf(({ level, message, err, timestamp, label }) => {
  let output = `${timestamp}`;
  if (level) {
    const formattedLevel = pad(level, 7);
    output += ` ${formattedLevel}`;
  }
  output += `: ${message}`;

  if (err) {
    const truncatedError = typeof err === "object" ? err.message : err;
    output += ` | error: ${truncatedError}`;
  }

  return output;
});

const sharedFileTransport = new transports.File({
  filename: logFile,
  format: format.combine(truncateErrors),
});

const loggerFormat = format.combine(
  format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss.SSS",
  }),
  format((info) => {
    info.level = info.level.toUpperCase();
    return info;
  })()
);

const logger = createLogger({
  level: "debug",
  format: loggerFormat,
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), truncateErrors),
    }),
    sharedFileTransport
  ],
});


const fileOnlyLogger = createLogger({
  level: "debug",
  format: loggerFormat,
  transports: [sharedFileTransport],
});



export { logger, fileOnlyLogger };
