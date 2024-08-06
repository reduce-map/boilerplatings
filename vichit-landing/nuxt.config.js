import { getDefaultHead } from './utils/app-config/default-head'
import getSitemapConfig from './utils/app-config/sitemap.config'
import getI18NConfig from './lang'
import getRobotsConfig from './utils/app-config/robots.config'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  loading: '~/components/Loading/MainLoadingNuxt.vue',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: getDefaultHead(),
  robots: getRobotsConfig(),
  sitemap: getSitemapConfig(),
  i18n: getI18NConfig(),

  css: [
    // Global CSS: https://go.nuxtjs.dev/config-css
    '@/design/index.scss',
    'animate.css/animate.min.css',
  ],

  plugins: [
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    { src: '~/plugins/typer.js', mode: 'client' }, // only on client side
    { src: '~/plugins/design-system' },
    { src: '~/plugins/meta-mixin' },
    { src: '~/plugins/tippy-css.js' },
    { src: '~/plugins/telegram.js' },
    { src: '~/plugins/v-mask.js' },
  ],

  components: false, // Auto import components: https://go.nuxtjs.dev/config-components

  buildModules: [
    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    [
      '@nuxtjs/eslint-module', // https://go.nuxtjs.dev/eslint '@nuxtjs/eslint-module',
      {
        fix: true, // fix on save https://gist.github.com/imShara/453e31c259659ac81eeec72b6012227c
      },
    ],
    '@nuxtjs/stylelint-module', // https://go.nuxtjs.dev/stylelint
    '@nuxt/postcss8', // https://tailwindcss.com/docs/guides/nuxtjs
    '@nuxtjs/svg', // https://www.npmjs.com/package/@nuxtjs/svg
    '@nuxtjs/device',
    '@nuxtjs/fontawesome',
  ],

  device: {
    // option for @nuxtjs/device
    refreshOnResize: true,
  },

  fontawesome: {
    icons: {
      solid: true,
      brands: true,
    },
  },

  modules: [
    // Modules: https://go.nuxtjs.dev/config-modules
    '@nuxtjs/gtm',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    [
      'nuxt-log',
      {
        // https://www.npmjs.com/package/nuxt-log
        isEnabled: process.env.NUXT_ENV_DEBUG_APP === 'true',
        logLevel: 'debug',
        showLogLevel: true,
        showMethodName: true,
      },
    ],
    '@nuxtjs/axios',
  ],

  router: {
    middleware: ['handleRoute'],
  },

  gtm: {
    id: process.env.NUXT_ENV_GTM_ID,
    debug: !process.env.NUXT_ENV_PROD,
    enabled: true,
    pageTracking: process.env.NUXT_ENV_PROD,
  },

  // enable this first in case GTM doesn't work
  // publicRuntimeConfig: {
  //   gtm: {
  //     id: GTM_ID
  //   }
  // },

  build: {
    // Build Configuration: https://go.nuxtjs.dev/config-build
    transpile: ['gsap'],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    hotMiddleware: {
      client: {
        overlay: false, // turn off client overlay when errors are present
      },
    },
    terser: {
      // https://github.com/terser/terser#compress-options
      terserOptions: {
        compress: {
          drop_console: process.env.NUXT_ENV_PROD,
        },
      },
    },
  },

  vue: {
    config: {
      lintOnSave: false,
    },
  },

  generate: {
    exclude: [/^\/design-system/],
  },
}
