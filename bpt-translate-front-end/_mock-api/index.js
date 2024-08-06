const busboy = require('connect-busboy')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(busboy())
    //  Register all routes inside tests/mock-api/routes.
    fs.readdirSync(path.join(__dirname, 'api')).forEach(routeFileName => {
        if (/\.js$/.test(routeFileName)) {
            require(`./api/${routeFileName}`)(app)
        }
    })
}
