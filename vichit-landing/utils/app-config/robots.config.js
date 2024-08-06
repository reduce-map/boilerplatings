export default function getRobotsConfig() {
  return {
    UserAgent: '*',
    Disallow: '/design/',
    // https://developers.google.com/search/docs/advanced/robots/create-robots-txt?hl=ru#create_rules
    Sitemap: 'https://www.vichit.tech/sitemap.xml',
  }
}
