const appConfig = require('./src/app.config')

const config = {
    lintOnSave: false,

    configureWebpack: {
        // We provide the app's title in Webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: appConfig.title,

        resolve: {
            alias: {
                ...{ vue$: 'vue/dist/vue.esm.js' }, // Resolving the vue var for standalone build,
            },
        },

        devServer: {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        },
    },

    css: {
        // Enable CSS source maps.
        sourceMap: true,
    },
}

module.exports = config
