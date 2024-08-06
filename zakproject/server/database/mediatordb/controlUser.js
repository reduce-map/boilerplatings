const user = require('../method/user');
const client = require('../method/client');
const validation = require('./validation')

function addUser(first_name, second_name, password, mail, callback) {
    let isAdd = true;
    if (!validation.isUndefined(...[first_name, second_name, password, mail])) {
        isAdd = false;
        callback(`isUndefined: first_name = ${first_name} second_name = ${second_name} password = ${password} mail = ${mail}`)
    }
    if (!validation.name(...[first_name, second_name])) {
        isAdd = false;
        callback(`name is : first_name = ${first_name} second_name = ${second_name}`)
    }
    if (!validation.password(password)) {
        isAdd = false;
        callback(`password is failed`)
    }
    if (isAdd) user.addUser(first_name, second_name, password, mail, callback);
    callback(`Add User is failed`);
}

function findAllUser(callback) {
    user.findAllUser(callback);
}

function findUser(callback, searchValue) {
    user.findUser(callback, searchValue);
}

function deleteUser(callback, deleteValue, successful, resolution) {
    if (resolution) {
        user.deleteUser(callback, deleteValue, successful);
    } else {
        callback(`delete User is impossible`)
    }

}

function deleteAllUser(callback, resolution) {
    if (resolution) {
        user.deleteAllUser(callback);
    } else {
        callback(`delete All User is impossible`)
    }
}

function updateUser(callback, searchValue, field, value) {
    user.updateUser(callback, searchValue, field, value);
}

function updateAllUser(callback, field, value, resolution) {
    if (resolution) {
        user.updateAllUser(callback, field, value);
    } else {
        callback(`updateAllUser is impossible`)
    }

}

function addClient(User, first_name, second_name, patronymic, mail, site, telephone, items, post, message) {
    client.addClient(User, first_name, second_name, patronymic, mail, site, telephone, items, post, message);
}


module.exports = {
    addUser: addUser,
    findAllUser: findAllUser,
    findUser: findUser,
    deleteUser: deleteUser,
    deleteAllUser: deleteAllUser,
    updateUser: updateUser,
    updateAllUser: updateAllUser,
}