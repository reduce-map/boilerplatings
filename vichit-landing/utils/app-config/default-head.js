export function getDefaultHead() {
  return {
    title:
      'VICHIT.TECH | Web & mobile custom development solutions and dedicated teams services',
    // htmlAttrs: {
    //   lang: 'en',
    // },
    meta: [
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1',
      },
      {
        name: 'og:site_name',
        content: 'VICHIT.TECH',
      },
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1',
      },
      {
        name: 'MobileOptimized',
        content: '350',
      },
      {
        name: 'HandheldFriendly',
        content: 'true',
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:image:url',
        content: `${process.env.NUXT_ENV_BASE_URL}/logo-main-description.svg`,
      },
      {
        property: 'og:image:secure_url',
        content: `${process.env.NUXT_ENV_BASE_URL}/logo-main-description.svg`,
      },
    ],

    // Hubspot
    script: [
      {
        type: 'text/javascript',
        id: 'hs-script-loader',
        async: true,
        defer: true,
        src: '//js-eu1.hs-scripts.com/25403859.js',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'true',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Outfit:wght@200;300;400;500;600;700;800&display=swap',
      },
    ],
  }
}
