const jsf = require('json-schema-faker')
const userSchema = require('../schemas/fake.user.js')
const userData = jsf.generate(userSchema)

module.exports = app => {
    app.post('/api/session', (request, response) => {
        response.json({ ...userData })
    })

    app.get('/api/session', (request, response) => {
        response.json({ ...userData })
    })
}
