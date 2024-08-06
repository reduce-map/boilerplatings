const path = require('path')

module.exports = {
    title: 'Application Style Guide',
    // defaultExample: true,
    sections: [
        {
            name: 'Atoms',
            components: 'src/components/atoms/*/*.vue',
        },
    ],
    require: [path.join(__dirname, 'styleguide.plugins.config.js')],
}
