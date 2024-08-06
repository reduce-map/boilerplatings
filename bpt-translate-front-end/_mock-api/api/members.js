const faker = require('faker')

module.exports = app => {
    app.get('/api/members', (request, response) => {
        let data = [...new Array(faker.random.number({ min: 0, max: 15 }))].map(
            () => {
                return {
                    languagesCodes: [
                        ...new Array(faker.random.number({ min: 0, max: 3 })),
                    ].map(() => {
                        // https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%B4%D1%8B_%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%B2
                        return faker.random.arrayElement([
                            'rus',
                            'jpn',
                            'eng',
                            'heb',
                        ])
                    }),
                    loginEmail: faker.internet.email(),
                    name: faker.name.findName(),
                    role: faker.random.arrayElement([
                        'admin',
                        'owner',
                        'developer',
                        'translator',
                    ]),
                }
            }
        )

        const resp = {
            page: faker.random.number({ min: 1, max: 5 }),
            pages: 10,
            data,
        }

        response.json(resp)
    })
}
