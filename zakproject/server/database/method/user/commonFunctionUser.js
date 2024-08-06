const add = require('./add');
const find = require('./find');
const update = require('./update');
const remove = require('./delete');


async function addUser(dataUser, callback) {
    if (dataUser.name.first_name === "") {
        console.log(`dataUser.first_name is empty`)
    } else if (dataUser.name.second_name === "") {
        console.log(`dataUser.second_name is empty`)
    } else if (dataUser.mail === "") {
        console.log(`dataUser.mail is empty`)
    } else if (dataUser.password === "") {
        console.log(`dataUser.password is empty`);
    } else {
        console.log('addUser before ');
        return await  new Promise(async resolve => {
            add.user(dataUser.name.first_name, dataUser.name.second_name, dataUser.password, dataUser.mail, resolve);
        });

    }
}

async function addClient(user_id, dataClient) {
    return await new Promise(resolve => {
        add.client(user_id, methodAddClient, dataClient, resolve)
    })
}


async function findAllUser(callback) {
    return await find.all();
}

//Check mail or Telephone
async function findUser(mailOrTelephone) {
    console.log(mailOrTelephone + " mailOrTelephone comfunUser=>findUser")
    if (mailOrTelephone) {
        console.log("before FIND")
        return await find.one({mail: mailOrTelephone});
    } else {
        console.log("mailOrTelephone is undefined");
    }
}

async function findUserById(userId) {
    return await find.byId(userId);
}

function updateUser(callback, searchValue, keyField, value) {
    update.one(callback, find.one.bind(find), searchValue, keyField, value);
}


function updateAllUser(callback, field, value) {
    update.all(callback, find.all.bind(find), field, value);
}

function deleteClientById(callback, user, idClient) {
    remove.clientById(callback, user, idClient);
}


async function deleteUser(deleteValue) {
    let user = await findUser(deleteValue);
    let dataUser = {
        myClient: user.myClient,
        myInfo: user.myInfo
    }
    let result = await new Promise(resolve => {
        remove.oneUser(deleteValue, resolve);
    });
    console.log(result + " result deleteUser");
    return result ? dataUser : result;


}

async function deleteAllUser() {
    return await new Promise(resolve => {
        remove.allUser(resolve);
    })

}


module.exports = {
    addUser: addUser,
    addClient: addClient,
    findAllUser: findAllUser,
    findUser: findUser,
    findUserById: findUserById,
    updateUser: updateUser,
    updateAllUser: updateAllUser,
    deleteClientById: deleteClientById,
    deleteUser: deleteUser,
    deleteAllUser: deleteAllUser
}












