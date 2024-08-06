const jsf = require('json-schema-faker')
const scheme = require('../schemas/fake.schema.js')

module.exports = app => {
    app.get('/api/fake', (request, response) => {
        const fakeData = jsf.generate(scheme)

        response.json({ fakeData })
    })
}
