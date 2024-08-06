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
```
