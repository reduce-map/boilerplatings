import { countries, getEmojiFlag } from 'countries-list';

const prioritizedCountries = {
  USD: '🇺🇸', // США
  EUR: '🇪🇺', // Евросоюз
  GBP: '🇬🇧', // Великобритания
  CHF: '🇨🇭', // Швейцария
  PLN: '🇵🇱', // Польша
  ILS: '🇮🇱', // Израиль
  CNY: '🇨🇳', // Китай
  TRY: '🇹🇷', // Турция
  CAD: '🇨🇦', // Канада
  AUD: '🇦🇺', // Австралия
  SEK: '🇸🇪', // Швеция
  CZK: '🇨🇿', // Чехия
  HUF: '🇭🇺', // Венгрия
  AED: '🇦🇪', // ОАЭ
  HKD: '🇭🇰', // Гонконг
  UAH: '🇺🇦', // Украина
};

// 1. Функция для получения просто массива уникальных валют
export const getAllCurrencies = () => {
  const uniqueCurrencies = Object.keys(countries).reduce((acc, countryCode) => {
    const country = countries[countryCode];
    if (country.currency && Array.isArray(country.currency)) {
      country.currency.forEach((currency) => acc.add(currency));
    }
    return acc;
  }, new Set());

  return Array.from(uniqueCurrencies); // Преобразуем Set в массив
};

// 2. Функция для получения корректного флага по валюте
export const getFlagByCurrency = (currency) => {
  if (prioritizedCountries[currency]) {
    return prioritizedCountries[currency];
  }

  for (const countryCode of Object.keys(countries)) {
    const country = countries[countryCode];
    if (country.currency && country.currency.includes(currency)) {
      return getEmojiFlag(countryCode);
    }
  }

  return null; // Если не найдено
};

// 3. Функция для получения всех валют с флагами
export const getAllCurrenciesWithFlags = () => {
  const currencyToCountries = {};

  Object.keys(countries).forEach((countryCode) => {
    const country = countries[countryCode];
    if (country.currency && Array.isArray(country.currency)) {
      country.currency.forEach((currency) => {
        if (!currencyToCountries[currency]) {
          currencyToCountries[currency] = [];
        }
        currencyToCountries[currency].push(getEmojiFlag(countryCode));
      });
    }
  });

  return Object.entries(currencyToCountries).map(([currency, flags]) => {
    const flag = prioritizedCountries[currency] || flags[0];
    return `${currency} ${flag}`;
  });
};

// 4. Функция для получения всех флагов стран
export const getAllFlags = () => {
  return Object.keys(countries).map((countryCode) => getEmojiFlag(countryCode));
};

// 5. Функция для проверки наличия нескольких валют у стран
export const getCountriesWithMultipleCurrencies = () => {
  return Object.keys(countries)
    .filter((countryCode) => {
      const country = countries[countryCode];
      return country.currency && country.currency.length > 1;
    })
    .map((countryCode) => ({
      countryCode,
      country: countries[countryCode],
      currencies: countries[countryCode].currency,
      name: countries[countryCode].name,
      flag: getEmojiFlag(countryCode),
    }));
};

// 6. Функция для получения всех валют только из prioritizedCountries
export const getAllCurrenciesFromPrioritizedCountries = () => {
  return Object.keys(prioritizedCountries);
};

// // Пример использования
// const allCurrencies = getAllCurrencies();
// console.log('All Currencies:', allCurrencies, countries);
//
// const usdFlag = getFlagByCurrency('USD');
// console.log('Flag for USD:', usdFlag);
//
// const allCurrenciesWithFlags = getAllCurrenciesWithFlags();
// console.log('Currencies with Flags:', allCurrenciesWithFlags);
//
// const allFlags = getAllFlags();
// console.log('All Flags:', allFlags);
//
// const countriesWithMultipleCurrencies = getCountriesWithMultipleCurrencies();
// console.log('Countries with Multiple Currencies:', countriesWithMultipleCurrencies);

export function formatDateTime(date = new Date(), includeTime = true) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  if (includeTime) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    // const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}(${hours}:${minutes})`;
  }

  return `${year}-${month}-${day}`;
}

// // Пример использования
// console.log(formatDateTime()); // Включает время
// console.log(formatDateTime(new Date(), false)); // Без времени
// console.log(formatDateTime(new Date('2024-06-13T08:02:00Z'), true)); // С конкретной датой и временем
// console.log(formatDateTime(new Date('2024-06-13T08:02:00Z'), false)); // С конкретной датой без времени
