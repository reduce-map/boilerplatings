import puppeteer, { type Page, type GoToOptions, type Browser } from 'puppeteer';
import {
  getFormattedDate,
  getImpactFromClass, getNewStories,
  getUniqueStories,
  readJsonFile,
  saveToFile,
  sleep,
  timeAgoToMilliseconds,
  writeJsonFile
} from "./utils.ts";
// import async from 'async';

import axios from 'axios';

// ### Local Things
const localParams = { // Local parameters for the observer, merged with params
  sleepRange: [200, 300],

  // puppeteer config
  puppeteerOptions: {
    headless: false
  },

  puppeteerGoToOptions: { waitUntil: 'networkidle2' }, // Options for puppeteer's page.goto
  viewportWidth: { width: 1280, height: 800 },

  // ### site config ###
  gdprAcceptButtonSelector: '#gdpr-new-container .btn-accept',
}

// ### End of Local Things
export interface ObserveSiteParams {
  url_to_observe: string;
  url_name: string;
  settings: {
    type: string;
    sleepRange: number[];
    headers: Record<string, string>;
    cookieValue: string;
    cookieSettings: {
      domain: string;
      url: string;
    };
    localStorage: Record<string, any>
  };
}

const telegramBot = {
  token: '6810782390:AAH_IuGi4msBOqDCiTISv3fmLVD5TbkbEck',
  chat_id: '-4233250290'
}

async function sendTelegramNotification(message: string) {
  const url = `https://api.telegram.org/bot${telegramBot.token}/sendMessage`;
  const params = {
    chat_id: telegramBot.chat_id,
    text: message,
  };

  try {
    const response = await axios.post(url, params);
    console.log('Message sent:', response.data);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

export const observeSite = async (params: ObserveSiteParams) => {
  const { page, browser } = await observeInit();
  await sleep(300);

  console.log(`🏃‍Going to the URL ${params.url_to_observe}`);
  await page.goto(params.url_to_observe, localParams.puppeteerGoToOptions as GoToOptions);
  await sleep(1500);

  console.log(`🏃Getting latest stories`);
  const stories = await getLatestStories(page);

  console.log(`🏃Saving data to file`);
  saveToFile(stories, params, `${getFormattedDate()}-stories`);

  console.log('🏃Analysing continue. Notification if needed');
  const existingStories = readJsonFile('forex-factory-all', params);

  const uniqueStories = getUniqueStories(existingStories, stories);
  const newUniqueStories = getNewStories(existingStories, stories);

  console.log('uniqueStories', uniqueStories.length)
  console.log('newUniqueStories', newUniqueStories.length);

  writeJsonFile('forex-factory-all', uniqueStories, params);
  writeJsonFile('forex-factory-analysed-all', analise(uniqueStories), params);

  // ===
  const notificationData = readJsonFile('forex-factory-notification-data', params);

  const notificationDataUnique = getUniqueStories(notificationData, analise(newUniqueStories));
  const weight = notificationDataUnique.reduce((acc, story) => acc + story.weight, 0);
  console.log(weight, 'weight')
  writeJsonFile('forex-factory-notification-data', notificationDataUnique, params);

  if(weight > 4) {
    console.log('🏃Notification needed', notificationDataUnique);
    await sendTelegramNotification(`🏃Notification needed: \n ${notificationDataUnique.map((story: any) => `${story.weight} | ${story.storyTitle.slice(0, 40)}`).join('\n')}`);
    writeJsonFile('forex-factory-notification-data', [], params);
  }

  // const existingStories = readJsonFile('forex-factory', params);

  // console.log(`🏃Comparing data, notify if needed`);
  // await compareData(page);
  //
  // console.log(`🏃Comparing data, notify if needed`);
  // await observingPage(page);

  await browser.close();
}

// ### Scrape Init. Launches the browser, returns Page
async function observeInit(): Promise<{ page: Page, browser: Browser }> {
  const browser = await puppeteer.launch(localParams.puppeteerOptions);
  const page = await browser.newPage();
  await page.setViewport(localParams.viewportWidth);
  return { page, browser };
}

async function getLatestStories(page: Page) {
  const storiesFromPage = await page.evaluate(() => {
    const newsLatestStoriesHolder = document.querySelector('[data-compid="HomeNativeNewsOne"]');
    const storiesList = newsLatestStoriesHolder?.querySelectorAll('.flexposts__story') || [];

    const stories = Array.from(storiesList).map(story => {
      const storyTitleLinkElement: HTMLLinkElement | null = story.querySelector('.title a');

      const storyTitle = storyTitleLinkElement?.title || "No title";
      const storyHref = storyTitleLinkElement?.href || "No href";

      const storyTimeElement: HTMLSpanElement | null = story.querySelector('.flexposts__time');

      const timeText = storyTimeElement?.textContent || "No time";

      console.log(`🏃Found story: ${storyTitle} - ${storyHref} - ${timeText}`);

      return {
        storyTitle,
        storyHref,
        redirectUrl: `${storyHref}/hit`,
        timeText,
        when: new Date().toISOString(),
        whenNumber: new Date().valueOf(),
        storyClassList: story.className
      };
    });

    return stories;
  });

  storiesFromPage.forEach((story: any) => {
    console.log(`🏃Found story: ${story.storyTitle} - ${story.storyHref} - ${story.timeText} \n`);
  })

  return storiesFromPage;
}

function analise(stories: any) {
  const result = stories.map((story: any) => {
    const { type, weight } = getImpactFromClass(story.storyClassList);
    const timeAgo = timeAgoToMilliseconds(story.timeText);

    return {
      ...story,
      type,
      weight,
      timeAgo
    };
  });

  return result;
}
