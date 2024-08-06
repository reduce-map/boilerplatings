// https://docs.cypress.io/guides/guides/plugins-guide.html

// if you need a custom webpack configuration you can uncomment the following import
// and then use the `file:preprocessor` event
// as explained in the cypress docs
// https://docs.cypress.io/api/plugins/preprocessors-api.html#Examples

/* eslint-disable import/no-extraneous-dependencies, global-require, arrow-body-style */
// const webpack = require('@cypress/webpack-preprocessor')

// module.exports = (on, config) => {
//   // on('file:preprocessor', webpack({
//   //  webpackOptions: require('@vue/cli-service/webpack.config'),
//   //  watchOptions: {}
//   // }))
//
//   return Object.assign({}, config, {
//     fixturesFolder: 'tests/e2e/fixtures',
//     integrationFolder: 'tests/e2e/specs',
//     screenshotsFolder: 'tests/e2e/screenshots',
//     videosFolder: 'tests/e2e/videos',
//     supportFile: 'tests/e2e/support/index.js'
//   })
// }

// https://docs.cypress.io/guides/guides/plugins-guide.html
module.exports = (on, config) => {
    // Dynamic configuration
    // https://docs.cypress.io/guides/references/configuration.html
    return Object.assign({}, config, {
        // ===
        // General
        // https://docs.cypress.io/guides/references/configuration.html#Global
        // ===
        watchForFileChanges: true,
        // ===
        // Environment variables
        // https://docs.cypress.io/guides/guides/environment-variables.html#Option-1-cypress-json
        // ===
        env: {
            CI: process.env.CI,
        },
        // ===
        // Viewport
        // https://docs.cypress.io/guides/references/configuration.html#Viewport
        // ===
        viewportWidth: 1280,
        viewportHeight: 720,
        // ===
        // Animations
        // https://docs.cypress.io/guides/references/configuration.html#Animations
        // ===
        waitForAnimations: true,
        animationDistanceThreshold: 4,
        // ===
        // Timeouts
        // https://docs.cypress.io/guides/references/configuration.html#Timeouts
        // ===
        defaultCommandTimeout: 4000,
        execTimeout: 60000,
        pageLoadTimeout: 60000,
        requestTimeout: 5000,
        responseTimeout: 30000,
        // ===
        // Main Directories
        // https://docs.cypress.io/guides/references/configuration.html#Folders-Files
        // ===
        supportFile: 'tests/e2e/support/setup.js',
        integrationFolder: 'tests/e2e/specs',
        fixturesFolder: 'tests/e2e/fixtures',
        // ===
        // Videos & Screenshots
        // https://docs.cypress.io/guides/core-concepts/screenshots-and-videos.html
        // ===
        videoUploadOnPasses: true,
        videoCompression: 32,
        videosFolder: 'tests/e2e/videos',
        screenshotsFolder: 'tests/e2e/screenshots',
    })
}
