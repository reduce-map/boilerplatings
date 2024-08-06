const faker = require('faker')

module.exports = app => {
    app.get('/api/resources', (request, response) => {
        const languagesCodes = [
            ...new Array(faker.random.number({ min: 1, max: 3 })),
        ].map(() => {
            // https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%B4%D1%8B_%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%B2
            return faker.random.arrayElement([
                'rus',
                'jpn',
                'eng',
                'esp',
                'dan',
            ])
        })

        let data = [...new Array(faker.random.number({ min: 0, max: 15 }))].map(
            () => {
                return {
                    translations: [...new Array(languagesCodes.length)].map(
                        () => {
                            return faker.lorem.text()
                        }
                    ),
                    key: faker.company.catchPhrase(),
                }
            }
        )

        const resp = {
            page: faker.random.number({ min: 1, max: 5 }),
            pages: 10,
            data,
            languagesCodes,
        }

        response.json(resp)
    })
}
