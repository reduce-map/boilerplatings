// https://i18n.nuxtjs.org/routing
export default function getLocalesOption() {
  return {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en-US.js', name: 'English' },
      // { code: 'nl', iso: 'nl-NL', file: 'nl-NL.js', name: 'Netherlands' },
    ],
    defaultLocale: 'en',
    langDir: 'lang/languages/',
  }
}
