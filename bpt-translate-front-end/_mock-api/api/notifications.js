const faker = require('faker')

module.exports = app => {
    app.get('/api/notifications', (request, response) => {
        const resp = Array.from(
            { length: faker.random.number({ min: 0, max: 10 }) },
            () => ({
                time: faker.date.past(),
                title: faker.lorem.slug(),
                notification: faker.lorem.text(),
            })
        )

        response.json(resp)
    })
}
