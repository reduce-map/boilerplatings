const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')

module.exports = app => {
    app.use(bodyParser.json())
    // Register all routes inside /api.
    fs.readdirSync(path.join(__dirname, 'api')).forEach(routeFileName => {
        if (/\.js$/.test(routeFileName)) {
            require(`./api/${routeFileName}`)(app)
        }
    })
}
