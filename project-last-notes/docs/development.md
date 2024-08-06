# Setup and development

-   [First-time setup](#first-time-setup)
-   [Installation](#installation)
-   [Dev server](#dev-server)
-   [Generators](#generators)
-   [Aliases](#aliases)

## First-time setup

Make sure you have the following installed:

-   [Node](https://nodejs.org/en/) (at least the latest LTS)
-   [Yarn](https://yarnpkg.com/lang/en/docs/install/) (at least 1.0)

Then update the following files to suit your application:

-   `src/app.config.js` (provides metadata about your app)

## Installation

```bash
# Install dependencies from package.json
yarn install
```

## Dev server

> Note: If you're on Linux and see an `ENOSPC` error when running the commands below, you must [increase the number of available file watchers](https://stackoverflow.com/questions/22475849/node-js-error-enospc#answer-32600959).

```bash
# Launch the dev server
yarn dev

# Launch the dev server and automatically open it in
# your default browser when ready
yarn dev --open

# Launch the dev server with the Cypress client for
# test-driven development in a friendly interface
yarn dev:e2e
```

## Generators

This project includes generators to speed up common development tasks. Commands include:

```bash
# Generate a new component with adjacent unit test
yarn new component

# Generate a new view component with adjacent unit test
yarn new view

# Generate a new layout component with adjacent unit test
yarn new layout

# Generate a new Vuex module with adjacent unit test
yarn new module

# Generate a new utility function with adjacent unit test
yarn new util

# Generate a new end-to-end spec
yarn new e2e
```

Update existing or create new generators in the `_templates` folder, with help from the [Hygen docs](http://www.hygen.io/).

## Aliases

To simplify referencing local modules and refactoring, you can set aliases to be shared between dev and unit tests in `aliases.config.js`. As a convention, this project uses an `@` prefix to denote aliases.
