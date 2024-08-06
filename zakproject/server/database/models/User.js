const mongoose = require('../dataMain')
const bcrypt = require('bcrypt');

let Schema = mongoose.Schema({
    name: {
        first_name: {
            type: String,
        },
        second_name: {
            type: String,
        }
    },
    password: {
        type: String,
    },
    mail: {
        type: String,
        unique: true
    },
    myClient: {
        type: [],
    },
    myInfo: {
        type: []
    },
    created: {
        type: Date,
        default: Date.now
    }

});


Schema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (error, matches) => {
        if (error) return callback(error);
        callback(null, matches);
    });
};


exports.User = mongoose.model('User', Schema)