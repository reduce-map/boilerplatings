// https://www.npmjs.com/package/@nuxtjs/sitemap

export default function getSitemapConfig() {
  return {
    hostname: 'https://www.vichit.tech/',
    i18n: true,
    filter({ routes }) {
      // exclude routes from source map
      const omitValues = [
        'consulting',
        'custom-software-development',
        'mobile-application-development',
        'web-development',
        'contact-us',
        'design',
        'about-us',
        'industries',
        'solutions',
        'technologies',
      ]
      return routes.filter(
        (route) => !omitValues.some((value) => route.url.includes(value))
      )
    },
  }
}
