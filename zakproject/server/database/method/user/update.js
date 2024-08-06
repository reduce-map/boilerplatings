const find = require('./find');

function updateUser(callback,methodFindOne, searchValue, keyField, value) {
    new Promise(resolve => {
        methodFindOne.one(resolve, searchValue);
    }).then(user => {
        updateValueUser(user, keyField, value);
        user.save((err, user) => {
            callback(user);
        });

    })
}


function updateAllUser(callback, methodFindOne,field, value) {
    new Promise(resolve => {
        methodFindOne.all(callback);
    }).then(users => {
        users.forEach(user => {
            updateValueUser(user, field, value);
            user.save((err, user) => {
                callback(user);
            });
        })
    })
}


function updateValueUser(user, key, value) {
    if (key.data !== undefined) {
        key.data.first_name === "" ? key.data.second_name === "" ? 0 : user.data.second_name = value : user.data.first_name = value;
        console.log(`Update ${key.data.first_name} or ${key.data.second_name}`)
    } else if (key === 'password' || key === 'mail') {
        user[key] = value;
    } else {
        console.log(`update user is impossible ${key}`);
    }
}

module.exports = {
    one: updateUser,
    all: updateAllUser
}