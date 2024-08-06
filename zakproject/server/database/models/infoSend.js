const mongoose = require('../dataMain')

let Schema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    mailSend: [],
    mailNoSent: [],
    telephoneSend: [],
    telephoneNoSent: [],
    message: {
        head: {
            type: String
        },
        body: {
            type: String
        },
    },
    idClientsNoSent: [],
    idClientsSend: []
});

exports.InfoSend = mongoose.model('InfoSend', Schema)
