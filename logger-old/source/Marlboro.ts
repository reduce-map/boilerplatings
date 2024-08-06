import 'reflect-metadata';
import { injectable } from 'inversify';
import { mkdirSync } from 'fs';
import * as path from 'path';
import * as winston from 'winston';
import { format, transports } from 'winston';
type logDirTree = {
    year: string,
    month: string,
    day: string
};

type logMethod = 'info' | 'warn' | 'error';

const WINSTON_FORMAT = winston.format;

const LOG_FORMAT = WINSTON_FORMAT.combine(
    WINSTON_FORMAT.timestamp(),
    WINSTON_FORMAT.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
);

@injectable()
export class Marlboro {
    private logFilePath: string | null;
    private logFileName: string;
    private logger: winston.Logger | null;
    private fileTransport: winston.transports.FileTransportInstance | null;
    private consoleTransport: winston.transports.ConsoleTransportInstance | null;
    private currentLogDirTree: logDirTree;
    private maxLevelLength: number = 5;
    private colorize: winston.Logform.Colorizer;

    constructor(filename: string, private logToConsole: boolean = false) {
        this.logFilePath = '';
        this.logFileName = filename;
        this.currentLogDirTree = {
            year: '',
            month: '',
            day: ''
        };
        this.fileTransport = null;
        this.consoleTransport = this.logToConsole ? this.getConsoleTransport(): null;
        this.logger = null;
        this.colorize = winston.format.colorize();
        this.setFilePath();
    }

    public info(message: string) {
        this.log(message, 'info');
    }

    public warn(message: string) {
        this.log(message, 'warn');
    }

    public error(message: string) {
        this.log(message, 'error');
    }

    private log(message: string, method: logMethod = 'info') {
        try {
            this.setFilePath();
            switch (method) {
                case 'info':
                    this.logger!.info(message);
                    break;
                case 'warn':
                    this.logger!.warn(message);
                    break;
                case 'error':
                    this.logger!.error(message);
                    break;
                default:
                    throw new ReferenceError('Incorrect logging type');
            }
        } catch (error) {
            console.error('Error writing log:', error);
        } 
    }

    private updateWinstonTransport(newLogFilePath: string): void {
        this.fileTransport = new winston.transports.File({ filename: newLogFilePath });
        const transports: winston.transport[] = [this.fileTransport];
        if(this.consoleTransport)
            transports.push(this.consoleTransport);
        if (!this.logger) {
            this.logger = winston.createLogger({
                format: LOG_FORMAT,
                transports: transports
            });
        } else {
            this.logger.clear();
            for(const transport of transports) {
                this.logger.add(transport);
            }
        }
    }

    private getConsoleTransport(): winston.transports.ConsoleTransportInstance {
       return new transports.Console({
            format: format.combine(
              format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
              format.printf(info => {
                const level = info.level.toUpperCase().padEnd(this.maxLevelLength);
                const coloredLevel = this.colorize.colorize(info.level, level);
                return `${info.timestamp} ${coloredLevel}: ${info.message}`;
              })
            ),
          })
    }

    private setFilePath(): void {
        const currentDate = this.getTypedCurrentDate();
        const pathNeedUpdate = this.getPathNeedUpdate(currentDate);

        if (!pathNeedUpdate) return;

        this.updateLogDirectoryHierarchy(currentDate);

        const foldersHierarchyPath = path.join('logs', this.currentLogDirTree.year, this.currentLogDirTree.month, this.currentLogDirTree.day);

        this.logFilePath = path.join(foldersHierarchyPath, this.logFileName);

        this.updateWinstonTransport(this.logFilePath);

        mkdirSync(foldersHierarchyPath, { recursive: true });
    }

    private getTypedCurrentDate(): logDirTree {
        const currentDate = new Date();

        return {
            year: currentDate.getFullYear().toString(),
            month: (currentDate.getMonth() + 1).toString().padStart(2, '0'),
            day: currentDate.getDate().toString().padStart(2, '0')
        };
    }

    private getPathNeedUpdate(currentFilePath: logDirTree): boolean {
        let result = false;

        if (
            this.currentLogDirTree.year     != currentFilePath.year ||
            this.currentLogDirTree.month    != currentFilePath.month ||
            this.currentLogDirTree.day      != currentFilePath.day
        ) result = true;

        return result;
    }

    private updateLogDirectoryHierarchy(currentHierarchy: logDirTree): void {
        this.currentLogDirTree.year     = currentHierarchy.year;
        this.currentLogDirTree.month    = currentHierarchy.month;
        this.currentLogDirTree.day      = currentHierarchy.day;
    }
}
