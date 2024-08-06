import cron from 'node-cron';
import { DateTime } from 'luxon';
import { observeSite, type ObserveSiteParams } from './src';

const params: ObserveSiteParams = {
  url_to_observe: 'https://www.forexfactory.com/',
  url_name: 'forex-factory',
  settings: {
    type: 'ff',
    sleepRange: [450, 750],
    headers: {
      // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      // 'Accept': 'application/json, text/plain, */*',
      // 'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6,fr;q=0.5',
      // 'Dnt': '1',
      // 'If-Modified-Since': 'Tue, 11 Jun 2024 09:18:02 GMT',
      // 'Origin': 'https://www.forexfactory.com',
      // 'Referer': 'https://www.forexfactory.com/',
      // 'Sec-Ch-Ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      // 'Sec-Ch-Ua-Mobile': '?0',
      // 'Sec-Ch-Ua-Platform': '"macOS"',
      // 'Sec-Fetch-Dest': 'empty',
      // 'Sec-Fetch-Mode': 'cors',
      // 'Sec-Fetch-Site': 'same-site',
      // 'X-Csrf-Token': '57eb0056c76ad8d546e99d3da56290af',
    },
    // cookieValue: 'fflastvisit=1717921316; fflastactivity=0; _hjSessionUser_3279922=eyJpZCI6IjBjZjJiYmM4LTAyMGQtNWU0OC1iOThiLTRjOGNiYTVjM2QyYiIsImNyZWF0ZWQiOjE3MTc5MjEzMTgzNzIsImV4aXN0aW5nIjp0cnVlfQ==; flexHeight_787=undefined; _gid=GA1.2.1112793526.1718091189; flexHeight_177=undefined; flexHeight_192=undefined; fftab-history=news%2Cindex; ffmr_thread=1288135%3A1717921482%2C1288574%3A1718098475; _ga=GA1.2.826304144.1717921318; _ga_QFGG4THJR2=GS1.1.1718096448.4.1.1718098477.0.0.0; ffadon=0; sessions_live=1; ffflextime_flex_news_homepageRight1=1718103326-0',
    cookieValue: '',
    cookieSettings: {
      domain: 'forexfactory.com',
      url: 'https://www.forexfactory.com',
    },

    localStorage: {},
  },
};

function getNextExecutionTime() {
  const now = DateTime.local();
  const nextHour = now.plus({ hours: 1 }).startOf('hour');
  const timeUntilNextHour = nextHour.diff(now, ['hours', 'minutes', 'seconds']).toObject();
  return {
    nextHour,
    timeUntilNextHour
  };
}

// Вычислить и вывести время следующего выполнения
const logTime = () => {
  const { nextHour, timeUntilNextHour } = getNextExecutionTime();
  console.log(`Next execution at: ${nextHour.toISO()}`);
  console.log(`Time until next execution: ${Math.floor(timeUntilNextHour.hours || 0)} hours, ${Math.floor(timeUntilNextHour.minutes || 0)} minutes, ${Math.floor(timeUntilNextHour.seconds || 0)} seconds`);
}

// Schedule the task to run every hour
cron.schedule('0 * * * *', async () => {
  console.log('Running the cron job at the start of every hour');
  try {
    await observeSite(params);
  } catch (error) {
    console.error('Error observing site:', error);
    // await sendTelegramNotification(`Error observing site: ${error}`);
  }

  logTime()
});

await observeSite(params);
logTime()

