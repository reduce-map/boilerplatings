const appConfig = require('./src/app.config')
const { aliases } = require('./aliases.config')

const config = {
    lintOnSave: false,

    configureWebpack: {
        // We provide the app's title in Webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: appConfig.title,

        // Set up all the aliases we use in our app.
        resolve: {
            alias: {
                // Resolving the vue var for standalone build
                ...{ vue$: 'vue/dist/vue.esm.js' },
                ...aliases,
            },
        },
    },

    css: {
        // Enable CSS source maps.
        sourceMap: true,
    },

    devServer: {},
}

// if process.env.MOCKAPI is turned on
if (process.env.MOCKAPI) {
    config.devServer.before = require('./_mock-api')
}

module.exports = config
