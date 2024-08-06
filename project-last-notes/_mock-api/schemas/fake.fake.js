module.exports = {
    users: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                    minimum: 0,
                    exclusiveMinimum: true,
                },
                name: {
                    type: 'string',
                    faker: 'name.findName',
                },
                email: {
                    type: 'string',
                    format: 'email',
                },
            },
            required: ['id', 'name', 'email'],
        },
        minItems: 10,
        maxItems: 100,
    },
}
