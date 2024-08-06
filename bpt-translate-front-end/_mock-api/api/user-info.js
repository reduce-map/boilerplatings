const faker = require('faker')

module.exports = app => {
    app.get('/api/user-info', (request, response) => {
        const resp = {
            avatarUrl: faker.image.avatar(),
        }

        response.json(resp)
    })
}
