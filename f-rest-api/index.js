const fs = require('fs')
const path = require('path')
const express = require('express')
const cors = require('cors')
const app = express()


app.use(express.json( { limit: '50mb' }))
    .use(cors({
        origin(origin, callback) {
            callback(null, true)
        }
    }))
    .use(express.urlencoded())

    
const loadScripts = fileName => /\.js$/.test(fileName) && require(`./routes/${fileName}`)(app)

fs.readdirSync(path.join(__dirname, 'routes')).forEach(loadScripts)

app.listen(9090, () => {
    console.log(`http://localhost:9090`)
})

// for vue config
module.exports = () => {}
