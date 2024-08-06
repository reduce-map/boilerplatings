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
                ...{ vue$: 'vue/dist/vue.esm.js' }, // Resolving the vue var for standalone build,
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

module.exports = config
