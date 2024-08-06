const mongoose = require('../dataMain')

let Schema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        first_name: {
            type: String,
        },
        second_name: {
            type: String,

        }, patronymic: {
            type: String,
        }
    },
    data: {
        site: [],
        mail: [],
        telephone: [],
    },
    items: [{}],
    message: [],
    post: [],
});

exports.Client = mongoose.model('Client', Schema)