const appConfig = require('../src/app.config')

module.exports = {
    title: appConfig.title + ' Docs',
    description: appConfig.description,
    themeConfig: {
        sidebar: [
            ['/', 'Introduction'],
            '/_docs/development',
            '/_docs/architecture',
            '/_docs/tech',
            '/_docs/routing',
            '/_docs/state',
            '/_docs/tests',
            '/_docs/linting',
            '/_docs/editors',
            '/_docs/production',
            '/_docs/troubleshooting',
        ],
    },
}
