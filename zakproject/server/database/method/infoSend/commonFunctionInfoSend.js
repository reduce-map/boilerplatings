const addInfo = require('./add');
const deleteInfo = require('./delete');
const findInfo = require('./find');

async function addNewInfo(user, infoData) {
    let info = await new Promise(resolve => {
        addInfo.addInfo(user, infoData, resolve);
    });
    console.log(info + " addNewInfo");
    return info;
}

//нужен массив клиентов
function addMailClients(arrClient, info) {
    return addInfo.addMailClients(arrClient, info);
}

//нужен массив клиентов
function addIdClients(user, info) {
    addInfo.addIdClients(user, info);
}

//нужен массив клиентов
function addTelephoneClients(arrClient, info) {
    return addInfo.addTelephoneClients(arrClient, info);
}

//нужен Юзер
async function findAllInfoFromUser(user) {
    return await new Promise(resolve => {
        findInfo.findAllInfoFromUser(user, resolve);
    })
}

//нужен Юзер и idInfo
function findByIdFromUser(user, idInfo, callback) {
    findInfo.findByIdFromUser(user, idInfo, callback);
}

//нужен Юзер и head
function findInfoByValueFromUser(user, head) {
    return findInfo.findInfoByValueFromUser(user, head);
}

//нужен Юзер и idInfo
async function deleteInfoById(idInfo) {
    return await deleteInfo.deleteInfoById(idInfo);
}

//нужен Юзер
function deleteAllInfo(user, callback) {
    deleteInfo.deleteAllInfo(user, callback);
}

//нужен head
function deleteInfoByValue(head) {
    deleteInfo.deleteInfoByValue(head);
}


module.exports = {
    addNewInfo: addNewInfo,
    addMailClients: addMailClients,
    addIdClients: addIdClients,
    addTelephoneClients: addTelephoneClients,
    findAllInfoFromUser: findAllInfoFromUser,
    findByIdFromUser: findByIdFromUser,
    findInfoByValueFromUser: findInfoByValueFromUser,
    deleteInfoById: deleteInfoById,
    deleteAllInfo: deleteAllInfo,
    deleteInfoByValue: deleteInfoByValue,
}





