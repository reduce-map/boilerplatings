const faker = require('faker')

module.exports = app => {
    app.get('/api/project-statistic', (request, response) => {
        const resp = {
            inProgress: {
                state: faker.random.number({ min: 20, max: 90 }),
                title: 'inProgress',
                data: [
                    ...new Array(faker.random.number({ min: 2, max: 4 })),
                ].map(() => {
                    // https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%B4%D1%8B_%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%B2
                    return {
                        state: faker.random.number({ min: 20, max: 90 }),
                        lang: faker.random.arrayElement([
                            'rus',
                            'jpn',
                            'eng',
                            'heb',
                        ]),
                    }
                }),
            },
            inBacklog: {
                state: faker.random.number({ min: 20, max: 90 }),
                title: 'inProgress',
                data: [
                    ...new Array(faker.random.number({ min: 2, max: 4 })),
                ].map(() => {
                    // https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%B4%D1%8B_%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%B2
                    return {
                        state: faker.random.number({ min: 20, max: 90 }),
                        lang: faker.random.arrayElement([
                            'rus',
                            'jpn',
                            'eng',
                            'heb',
                        ]),
                    }
                }),
            },
        }

        response.json(resp)
    })
}
