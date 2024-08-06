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
    },

    css: {
        // Enable CSS source maps.
        sourceMap: true,
    },

    devServer: {
        proxy: {
            '/v1': {
                target: 'https://api.open-meteo.com/v1',
                changeOrigin: true,
                pathRewrite: {
                    '^/v1': '',
                },
            },
        },
        before: require('./_mock-api'),
    },
}

module.exports = config
