# Architecture

-   [`_templates`](#_templates)
-   [`docs`](#docs)
-   [`public`](#public)
    -   [`index.html`](#indexhtml)
-   [`src`](#src)
    -   [`assets`](#assets)
    -   [`components`](#components)
    -   [`design`](#design)
    -   [`router`](#router)
    -   [`state`](#state)
    -   [`utils`](#utils)
    -   [`app.config.js`](#appconfigjs)
    -   [`app.vue`](#appvue)
    -   [`main.js`](#mainjs)

## `_templates`

Generator templates to speed up development. See [the development doc](development.md#generators) for more.

## `_mock-api`

Express mock api with [faker.js](https://github.com/marak/Faker.js/). [Here](https://rawgit.com/Marak/faker.js/master/examples/browser/index.html) you can play with it

## `docs`

You found me! :wink:

## `public`

Where you'll keep any static assets, to be added to the `dist` directory without processing from our build system.

### `index.html`

This one file actually _does_ get processed by our build system, allowing us to inject some information from Webpack with [EJS](http://ejs.co/), such as the title, then add our JS and CSS.

## `src`

Where we keep all our source files.

### `assets`

This project manages assets via Vue CLI. Learn more about [its asset handling here](https://cli.vuejs.org/guide/html-and-static-assets.html).

### `components`

This project uses Design System for common visual language - [Atomic design](http://www.atomicdesign.bradfrost.com/). It reduces design debt, accelerates the design process, and builds bridges between teams working in concert to bring products to life.

### `design`

Where we keep our [design variables and tooling](tech.md#design-variables-and-tooling).

### `router`

Where the router, routes, and any routing-related components live. See [the routing doc](routing.md) for more.

### `state`

Where all our global state management lives. See [the state management doc](state.md) for more.

### `utils`

These are utility functions you may want to share between many files in your application. They will always be pure and never have side effects, meaning if you provide a function the same arguments, it will always return the same result. These should also never directly affect the DOM or interface with our Vuex state.

### `app.config.js`

Contains app-specific metadata.

### `app.vue`

The root Vue component that simply delegates to the router view. This is typically the only component to contain global CSS.

### `main.js`

The entry point to our app, were we create our Vue instance and mount it to the DOM.
