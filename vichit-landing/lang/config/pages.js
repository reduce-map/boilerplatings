// https://i18n.nuxtjs.org/custom-paths
// rename path
export default function pages() {
  return {
    parsePages: false,
    pages: {
      'design/locales': {
        en: '/design/locales', // -> accessible at /about-us (no prefix since it's the default locale)
        nl: '/design/lokaal', // -> accessible at /nl/francais-locales
      },
    },
  }
}
