module.exports = [
    {
        type: 'input',
        name: 'name',
        message: 'Name:',
        validate(value) {
            if (!value.length) {
                return 'type atom name'
            }
            return true
        },
    },
]
