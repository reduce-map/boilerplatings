function getTemplateClient() {
    return {
        name: {
            first_name: '',
            second_name: '',
            patronymic: ''
        },
        data: {
            site: [],
            mail: [],
            telephone: [{
                name: '',
                number: ''
            }],
        },
        items: [{}],
        message: [{
            head: '',
            body: '',
        }],
        post: [],
        send: [],
    }
}

module.exports = {
    getTemplateClient: getTemplateClient
}

