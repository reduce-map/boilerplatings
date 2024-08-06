import 'server-only';

type Dictionaries = {
  [key: string]: () => Promise<Record<string, any>>;
};

const dictionaries: Dictionaries = {
  en: () => import('@/app/messages/en.json').then((module) => module.default),
  ua: () => import('@/app/messages/ua.json').then((module) => module.default),
  ru: () => import('@/app/messages/ru.json').then((module) => module.default),
};

export const getDictionary = async (locale: string = 'en'): Promise<Record<string, string>> => {
  if (!dictionaries[locale]) {
    throw new Error(`No dictionary found for locale: ${locale}`);
  }
  return dictionaries[locale]();
};
