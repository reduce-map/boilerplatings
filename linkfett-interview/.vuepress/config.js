const appConfig = require('../src/app.config')

module.exports = {
    title: appConfig.title + ' Docs',
    description: appConfig.description,
    themeConfig: {
        sidebar: [
            ['/', 'Introduction'],
            '/docs/development',
            '/docs/architecture',
            '/docs/tech',
            '/docs/routing',
            '/docs/state',
            '/docs/linting',
            '/docs/production',
            '/docs/troubleshooting',
        ],
    },
    port: 8081,
}
