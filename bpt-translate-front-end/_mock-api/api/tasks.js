const faker = require('faker')

module.exports = app => {
    app.get('/api/tasks', (request, response) => {
        const tasks = Array.from(
            { length: faker.random.number({ min: 10, max: 50 }) },
            () => ({
                uuid: faker.random.uuid(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.past(),
                createdBy: {
                    uuid: faker.random.uuid(),
                    login: faker.internet.email(),
                },
                updatedBy: {
                    uuid: faker.random.uuid(),
                    login: faker.internet.email(),
                },
                assignedTo: {
                    uuid: faker.random.uuid(),
                    login: faker.internet.email(),
                },
                targetLanguage: 'string',
                status: faker.random.arrayElement([
                    'todo',
                    'in_progress',
                    'completed',
                ]),
                title: faker.lorem.word(),
                description: faker.lorem.words(),
                selectionKind: 'all',
                resourceRequest: {
                    tags: ['string'],
                    keys: ['string'],
                },
            })
        )

        response.json({
            items: tasks,
            meta: {
                pageNum: 1,
                totalItems: tasks.length,
            },
        })
    })
}
