import { scrape, type ScrapeParams } from './src';

const params: ScrapeParams = {
  // url_to_scrape: 'https://www.aliexpress.com/store/1102158815/pages/all-items.html?shop_sortType=new_desc', // "sort_by": "new", // best match, orders, new, price
  url_to_scrape: 'https://www.aliexpress.com/store/1103204630/pages/all-items.html?shop_sortType=bestmatch_sort', // "sort_by": "new", // best match, orders, new, price
  url_name: '1103204630', // url or id, now needed for file saving
  settings: {
    type: 'al',
    sleepRange: [450, 750],
    headers: {},
    cookie: '',
    localStorage: {},
  },
};

await scrape(params);
