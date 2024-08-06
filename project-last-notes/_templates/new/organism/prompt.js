module.exports = [
    {
        type: 'input',
        name: 'name',
        message: 'Name:',
        validate(value) {
            if (!value.length) {
                return 'type organism name'
            }
            return true
        },
    },
]
