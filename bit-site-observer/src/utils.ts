import fs from 'fs-extra';
import path from 'path';
import type { ObserveSiteParams } from './index.ts';
import _ from 'lodash'

export function readJsonFile(fileName: string, params: ObserveSiteParams) {
  const dir = path.join('data', params.settings.type, params.url_name);
  const filePath = path.join(dir, `${fileName}.json`);

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }

  throw new Error(`File ${filePath} not found`);
}

export function writeJsonFile(fileName: string, data: any, params: ObserveSiteParams) {
  const dir = path.join('data', params.settings.type, params.url_name);
  const filePath = path.join(dir, `${fileName}.json`);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
}

export function getUniqueStories(existingStories: any[], newStories: any[]) {
  return _.unionBy(newStories, existingStories, 'storyHref');
}

// Функция для получения новых историй
export function getNewStories(existingStories: any[], newStories: any[]) {
  return _.differenceBy(newStories, existingStories, 'storyHref');
}

export function getFormattedDate(date?: Date): string {
  const localDate = date || new Date();

  const year = localDate.getFullYear();
  const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
  const day = localDate.getDate().toString().padStart(2, '0');

  const hours = localDate.getHours().toString().padStart(2, '0');
  const minutes = localDate.getMinutes().toString().padStart(2, '0');

  return `${day}_${month}_${year}_${hours}_${minutes}`;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function saveToFile(data: Record<string, any>, params: ObserveSiteParams, fileName: string): void {
  const dir = path.join('data', params.settings.type, params.url_name);
  const filePath = path.join(dir, `${fileName}.json`);

  fs.ensureDirSync(dir);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

export function timeAgoToMilliseconds(timeAgo:string) {
  const timeUnits: any = {
    min: 60 * 1000,
    hr: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000
  };

  const regex = /(\d+)\s*(min|hr|day)s?\s*ago/g;
  let match;
  let milliseconds = 0;

  while ((match = regex.exec(timeAgo)) !== null) {
    const value = parseInt(match[1], 10);
    const unit = match[2];
    milliseconds += value * timeUnits[unit];
  }

  return new Date().valueOf() - milliseconds;
}

export function getImpactFromClass(classList: string): { type: string; weight: number } {
  const classes = classList.trim().split(' '); // Удаляем лишние пробелы и разбиваем строку на массив
  const type = classes[classes.length - 1]; // Последнее слово в строке

  const weights: any = {
    high: 4,
    low: 3,
    none: 2
  };

  const weight = weights[type] ?? 1;

  return { type, weight };
}
