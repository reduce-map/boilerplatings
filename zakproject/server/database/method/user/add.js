const mongoose = require('../../dataMain')
const User = require('../../models/User').User;


async function addUser(first_name, second_name, password, mail, callback) {
    await new User({
        name: {
            first_name: first_name,
            second_name: second_name
        },
        password: password,
        mail: mail,
        myClient: [],
        myInfo: []
    }).save((err, user) => {
        if (err) callback(false);
        callback(user);
    });
}


async function addClient(user_id, dataClient, callback) {
    await new Promise(resolve => {
        console.log(`addClient before  methodAddClient.addClient(user, dataClient, resolve);`)
        methodAddClient(user, dataClient, resolve);
    }).then((res, err) => {
        if (err) console.log(err);
        console.log(`addClient after  methodAddClient.addClient(user, dataClient, resolve);`);
        callback(user);

    })
}

function getData(data) {
    return new Promise(resolve => {
        resolve(data);
    })
}

module.exports = {
    user: addUser,
    client: addClient

}