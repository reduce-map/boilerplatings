import puppeteer, { type Page, type GoToOptions, type Browser } from 'puppeteer';
import async from 'async';
import { saveToFile, sleep } from './utils';

// ### Local Things
const localParams = { // Local parameters for the scraper. Merged with the params from the user
  // script config
  sleepRange: [200, 300],

  // scrapper config
  puppeteerOptions: {
    headless: false
  },

  puppeteerGoToOptions: { waitUntil: 'networkidle2' }, // Options for puppeteer's page.goto
  viewportWidth: { width: 1280, height: 800 },

  // ### al config ###
  gdprAcceptButtonSelector: '#gdpr-new-container .btn-accept',

  // categories
  selectorToClickWhereGrabCategories: 'a.pc-store-nav-Products',
  categoriesHolderSelector: '#left',
  categoriesClickSelector: '#left span',
  // categoriesAmountSelector: '#right > div > div > span',

  // products
  // productGridSelector: '#right > div > div',
  // productGridSelectorFilterAttribute: 'grid',
  // productDetailsSelector: 'a[clk_trigger]',
}

function getRandomSleepTime(min: number = localParams.sleepRange[0], max: number = localParams.sleepRange[1]): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleepRandom() {
  return sleep(getRandomSleepTime());
}

// ### End of Local Things

// ### Core Functionality
export type ScrapeType = 'al' | 'am' | 'other'; // am and other is not included

export interface ScrapeParams {
  url_to_scrape: string; // URL to scrape
  url_name: string; // URL name or id to be used in the file name

  settings: {
    type: ScrapeType; // Type of the website to scrape
    sleepRange: [number, number]; // Sleep range in milliseconds will be used between steps
    headers: Record<string, string>; // HTTP headers as key-value pairs
    cookie: string; // Cookie string
    localStorage: Record<string, string>; // Local storage as key-value pairs
  };
}

export const scrape = async (params: ScrapeParams) => {
  beforeScrapeSetup(params); // #1
  const { page, browser } = await scrapeInit(); // #2

  async.auto({
    goto: function(callback) {
      (async () => {
        try {
          console.log(`🏃‍Going to the URL ${params.url_to_scrape}`);
          await page.goto(params.url_to_scrape, localParams.puppeteerGoToOptions as GoToOptions);
          await sleepRandom();
          callback(null);
        } catch (err) {
          callback(err as Error);
        }
      })();
    },
    sanitize: ['goto', function(results, callback) {
      (async () => {
        try {
          console.log(`🏃Sanitizing the page`);
          await sanitizePage(page);
          await sleepRandom();
          callback(null);
        } catch (err) {
          callback(err as Error);
        }
      })();
    }],
    categories: ['sanitize', function(results, callback) {
      (async () => {
        try {
          console.log(`🏃Getting categories`);
          const categories = await getCategories(page, localParams, params);
          console.info(`${categories.length} Categories:`, categories.map(category => category.categoryName).join(', '));
          await sleepRandom();
          callback(null, categories);
        } catch (err) {
          callback(err as Error);
        }
      })();
    }],
    products: ['categories', function(results, callback) {
      (async () => {
        try {
          const categories = results.categories;
          console.log(`🏃Getting products for ${results.categories.length} categories`);
          await getProductsFromCategoriesPage(categories, page, params);
          await sleepRandom();
          callback(null);
        } catch (err) {
          callback(err as Error);
        }
      })();
    }]
  }, async function(err) {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('Scraping process completed successfully.');
    }
    if (browser) {
      await browser.close();
    }
  });
};

// ### Before Scrape ("local env") set-up
function beforeScrapeSetup(params: ScrapeParams) {
  localParams.sleepRange = params.settings.sleepRange; // Set the sleep range from the params
}

// ### Scrape Init. Launches the browser, returns Page
async function scrapeInit(): Promise<{ page: Page, browser: Browser }> {
  const browser = await puppeteer.launch(localParams.puppeteerOptions);
  const page = await browser.newPage();
  await page.setViewport(localParams.viewportWidth);
  return { page, browser };
}

// ### Page Sanitization. Prepare page (if needed - Accept GDPR etc.)
async function sanitizePage(page: Page) {
  await acceptGDPR(page);
}

async function acceptGDPR(page: Page) {
  const gdprAcceptButtonSelector = localParams.gdprAcceptButtonSelector;
  const gdprContainerExists = await page.$(gdprAcceptButtonSelector);
  if (gdprContainerExists) {
    console.log(`🏃Accepting GDPR`);
    await page.hover(gdprAcceptButtonSelector);
    await page.click(gdprAcceptButtonSelector);
    console.log(`✅Accepted GDPR`);
  } else {
    console.log(`👀No GDPR. 🏃Going Next`);
  }
}

interface Category {
  categoryName: string;
  categoryUrl: string;
  itemCountText: string;
}

// ### Get Categories. Integration routing which is unique to the website
async function getCategories(page: Page, localParams: any, params: ScrapeParams): Promise<Category[]> {
  // Go to the products tab where the categories will be scraped
  const productsTabSelector = localParams.selectorToClickWhereGrabCategories;
  await page.waitForSelector(productsTabSelector);
  await page.click(productsTabSelector);
  await page.waitForNavigation(localParams.puppeteerGoToOptions as GoToOptions);
  await page.waitForSelector(localParams.categoriesHolderSelector);

  // Get the categories buttons - "span elements"
  const spanElements = await page.$$(localParams.categoriesClickSelector);
  const categories: Category[] = [];
  await sleepRandom()

  for (let i = 0; i < spanElements.length; i++) {
    const element = spanElements[i];
    const name = await page.evaluate((el) => el.textContent?.trim(), element);

    try {
      await element.hover();
      await element.click();

      const { itemCountText, url } = await page.evaluate(() => {
        const span = document.querySelector('#right > div > div > span');
        const itemCountText = span && span.textContent ? span.textContent?.trim() : 'No category items amount found';
        return {
          itemCountText,
          url: window.location.href,
        };
      });

      categories.push({
        categoryName: name || 'No Name Category Found',
        categoryUrl: url,
        itemCountText,
      });

      // console.log(`Added Category: ${name}, URL: ${url} (${itemCountText})`); // time to write log file
    } catch (error) {
      console.log(`Error clicking or navigating for element ${name}:`, error); // time to write log file
    }
  }

  saveToFile(categories, params, 'categories');
  return categories;
}

interface ProductsFromCategoryPage {
  categoryName: string;
  categoryUrl: string;
  products: ProductDetails[];
}

async function getProductsFromCategoriesPage(categories: Category[], page: Page, params: ScrapeParams) : Promise<ProductsFromCategoryPage[]> {
  const productsFromCategoryPage: ProductsFromCategoryPage[] = await categories.reduce(
    async (accPromise, category) => {
      const acc = await accPromise;

      await page.goto(category.categoryUrl, localParams.puppeteerGoToOptions as GoToOptions);
      console.log('Get Products From Category Page:', category.categoryName);
      const products = await getProductsFromCategoriesGridPage(page, category, params); // get products from grid without iterating over pagination

      acc.push({
        categoryName: category.categoryName,
        categoryUrl: category.categoryUrl,
        products,
      });

      console.log(
        `${products.length} Products: \n`,
        products.map(product => `Sold amount: ${product.soldAmount} | ${product.productName} | ${product.price} | ${product.oldPrice}`).join('\n')
      );

      return acc;
    },
    Promise.resolve([] as ProductsFromCategoryPage[])
  );

  saveToFile(productsFromCategoryPage, params, `all_products_from_categories_pages`);

  return productsFromCategoryPage;
}

interface ProductDetails {
  productName: string;
  productLink: string;
  imageUrl: string;
  price: string;
  oldPrice: string;
  soldAmount: string;
  currency: string;
  rating: string;
}

async function getProductsFromCategoriesGridPage(page: Page, category: Category, params: ScrapeParams): Promise<ProductDetails[]> {
  const products: ProductDetails[] = await page.evaluate(() => {
    // Get the grid container
    const gridContainer = Array.from(document.querySelectorAll('#right > div > div')).find((el) => {
      return window.getComputedStyle(el).display === 'grid';
    });

    if (!gridContainer) {
      return [];
    }

    // Select product elements within the grid
    const productElements: NodeListOf<HTMLLinkElement> = gridContainer.querySelectorAll('a[clk_trigger]');

    const productDetails: ProductDetails[] = Array.from(productElements).map((product) => {
      const productLink = product?.href || 'no product link';
      const imageUrl = product.querySelector('img')?.src || 'no image name';
      const productName = product.querySelector('span')?.textContent?.trim() || 'no product name';
      const divs = product.querySelectorAll('div') || [];
      const priceDiv = divs[divs.length - 1];

      const priceSpans = priceDiv ? Array.from(priceDiv.querySelectorAll('span')) : [];

      const price =
        priceSpans.length >= 3
          ? priceSpans.slice(1, 4).reduce((acc: string, span: HTMLSpanElement) => acc + (span.textContent || ''), '')
          : 'Price not available';

      const oldPrice = product.querySelector('span[style*="text-decoration: line-through"]')?.textContent || 'No old price';
      const soldAmount =
        product.querySelector('div+div>div>div')?.textContent || 'No sold amount';

      const currency = product.querySelector('span')?.textContent || 'no currency';

      // Rating calculation
      const ratingElement: HTMLDivElement | null = product.querySelector(
        'div[style*="background: rgb(25, 25, 25); height: 10px;"]',
      );
      let rating = 'No rating';
      if (ratingElement) {
        const width = parseFloat(ratingElement.style.width);
        rating = (width / 10.8).toFixed(1); // Assuming 5 stars = 54px width
      }

      return {
        productName,
        productLink,
        imageUrl,
        price,
        oldPrice,
        soldAmount,
        currency,
        rating,
      };
    });

    return productDetails;
  });

  saveToFile(products, params, `category_${category.categoryName}_products_from_pagination_page`);

  return products;
}

