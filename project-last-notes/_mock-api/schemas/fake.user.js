module.exports = {
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
}
