import fs from 'fs-extra';
import path from 'path';
import type { ScrapeParams } from './index.ts';

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

export function saveToFile(data: Record<string, any>, params: ScrapeParams, fileName: string): void {
  const dir = path.join('data', params.settings.type, params.url_name, getFormattedDate());
  const filePath = path.join(dir, `${fileName}.json`);

  fs.ensureDirSync(dir);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}
