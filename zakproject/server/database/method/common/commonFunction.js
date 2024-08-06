const userFun = require('../user/commonFunctionUser');
const client = require('../client/commonFunctionClient');
const info = require('../infoSend/commonFunctionInfoSend');


//for Project////////////////////////////////////////////////////
async function registrationUser(dataUser) {
    let res = await userFun.findUser(dataUser.mail);
    console.log(res + " registrationUser");
    if (res) {
        console.log(`this User alresdy exist ${res}`);
        return false;
    } else {
        console.log('before registration');
        return await userFun.addUser(dataUser);
    }

}

async function authenticationUser(mailOrTelephone) {
    let user = await userFun.findUser(mailOrTelephone);
    if (!user) {
        console.log(`this User not exist ${user}`);
        return false;
    }
    return user;


}

async function removeAccount(userId, password) {
    let currentUser = await findUserById(userId);
    console.log(currentUser + " removeAccount");
    if (currentUser) {
        if (currentUser.password === password) {
            let res = await userFun.deleteUser(currentUser.mail);
            if (res) {
                console.log(res + "   res removeAccount after Delete");
                let countInfo = 0,
                    countClient = 0;
                res.myInfo.forEach(async id => {
                    let infoRemove = await info.deleteInfoById(id);
                    if (infoRemove) countInfo + 1;
                })
                res.myClient.forEach(async id => {
                    let infoRemove = await client.deleteClientById(id);
                    if (infoRemove) countClient + 1;
                })
                return countInfo === res.myInfo.length && countClient === res.myClient.length ? true : 0;
            } else {
                return false;
            }
        }
    }
}


async function addClient(userId, dataClient) {
    return  client.addNewClient(userId, dataClient);
}

async function addInfo(userId, infoData) {
    let currentUser,
        currentInfo;
    return await   findUserById(userId).then(async user => {
        currentUser = user;
        return await info.addNewInfo(user, infoData);
    }).then(async newInfo => {
        console.log(newInfo + "newInfo");
        currentInfo = newInfo;
        let clients = await client.findAllClient(currentUser);
        console.log(clients + " after find clients");
        if (Array.isArray(clients)) console.log("ARRRAAAAYYYYYY");
        currentInfo = info.addMailClients(clients, currentInfo);
        console.log(currentInfo + " after addMail clients");
        currentInfo = info.addTelephoneClients(clients, currentInfo);
        console.log(currentInfo + " after add data:{mail andtelephone}");
        await currentInfo.save();
        console.log(currentInfo + " after add data:{mail and telephone} and save");
        return currentInfo;
    })
}

async function findAllClients(userId) {
    return await findUserById(userId).then(async user => {
        return await client.findAllClient(user);
    })
}

async function getAllInfo(userId) {
    return await  findUserById(userId).then(async user => {
        return await info.findAllInfoFromUser(user);
    })
}

//return true if succes delete;
function removeClient(userId, objFind) {
    getData(findClientByValue(userId, objFind)
    ).then(clientUser => {
        return getData(client.deleteClientById(clientUser.user, clientUser.client._id));
    })
}

function removeInfo(userId, head) {
    findUserById(userId).then(user => {
        return info.findInfoByValueFromUser(user, head);
    })
}

//передавать объектом!!!!!!нужен Юзер
function findClientByValue(userId, objFind) {
    let currentUser;
    return findUserById(userId).then(user => {
        currentUser = user;
        return client.findClientByValueFromUser(currentUser, objFind);
    }).then(client => {
        return {
            client: client,
            user: currentUser
        }
    })
}

function findInfoByValue(userId, head) {
    findUserById(userId).then(currentUser => {
        return new Promise(resolve => {
            resolve(info.findInfoByValueFromUser(currentUser, head));
        });
    })
}

function getData(func, arg) {
    return new Promise(resolve => {
        resolve(func(arg));
    })
}

async function findUserById(userId) {
    return await  userFun.findUserById(userId);

}

//test/////////////////////////////////////////////////////////////
async function findAllUser() {
    return await userFun.findAllUser();
}

async function removeAllAccount() {
    return await userFun.deleteAllUser();
}


module.exports = {
    registrationUser: registrationUser,
    authenticationUser: authenticationUser,
    removeAccount: removeAccount,
    removeInfo: removeInfo,
    removeClient: removeClient,
    addClient: addClient,
    findAllClients: findAllClients,
    addInfo: addInfo,
    getAllInfo: getAllInfo,
    findClientByValue: findClientByValue,
    findInfoByValue: findInfoByValue,
    findUserById: findUserById,
    test: {
        findAllUser: findAllUser,
        removeAllAccount: removeAllAccount,
    }
}