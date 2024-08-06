import { createI18n } from 'vue-i18n';
import enLocal from './locales/en.json';
import uaLocal from './locales/ua.json';

import en from 'view-ui-plus/dist/locale/en-US';
import ua from 'view-ui-plus/dist/locale/uk-UA';

const messages = {
  'en-US': {
    ...en,
    ...enLocal,
  },
  'uk-UA': {
    ...ua,
    ...uaLocal,
  },
};

const i18n = createI18n({
  allowComposition: true,
  globalInjection: true,
  legacy: false,
  locale: 'en-US',
  // locale: 'en', // set default locale
  fallbackLocale: 'en-US', // set fallback locale
  messages,
});

export default i18n;
