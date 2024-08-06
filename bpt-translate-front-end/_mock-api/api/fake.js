const faker = require('faker')

module.exports = app => {
    app.get('/api/fake', (request, response) => {
        // TODO with Array.from({},()=>{}).map
        const resp = [
            ...new Array(faker.random.number({ min: 6, max: 20 })),
        ].map(() => {
            return {
                amount: faker.random.number({ min: 700, max: 12000 }),
                src: faker.image.avatar(),
                list: [
                    ...new Array(faker.random.number({ min: 6, max: 20 })),
                ].map(() => {
                    return {
                        name: faker.helpers.createCard().name,
                        logo: faker.image.avatar(),
                        text: faker.hacker.phrase(),
                        amount: faker.random.number({ min: 10, max: 1500 }),
                    }
                }),
            }
        })

        response.json(resp)
    })
}
