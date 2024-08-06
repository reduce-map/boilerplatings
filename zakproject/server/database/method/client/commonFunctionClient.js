const change = require('./clientUtils/mainUtils');
const changeClient = change.changeClient.bind(change);
const find = require('./find');
const remove = require('./delete');
const update = require('./update');



async function findAllClient(user) {
    return await new Promise(resolve => {
        find.findAllClientFromUser(user, resolve);
    })

}



function findByIdFromUser(callback, user, idClient) {
    new Promise(resolve => {
        find.findByIdFromUser(resolve, user, idClient);
    }).then(clien => {
        callback(clien);
    }).catch(reason => {
        throw reason;
    })
}

function findClientByValueFromUser(user, objFind) {
    getClients(find.findClientByValueFromUser(user, changeClient, objFind))
        .then(cliens => {
            return getClients(cliens);
        }).catch(reason => {
        throw reason;
    })
}

function deleteAllClient(callback, user) {
    new Promise(resolve => {
        remove.deleteAllClient(callback, user);
    }).then(client => {
        callback(client);
    }).catch(reason => {
        throw reason;
    })
}

async function deleteClientById(idClient,) {
    return await remove.deleteClientById(idClient);

}

function deleteValueInClient(callback, Client, objData) {
    new Promise(resolve => {
        remove.deleteValueInClient(callback, Client, objData, changeClient);
    }).then(client => {
        callback(client);
    }).catch(reason => {
        throw reason;
    })
}

function updateFieldClient(callback, client, data) {
    new Promise(resolve => {
        rupdate.updateFieldClient(callback, client, data, changeClient);
    }).then(client => {
        callback(client);
    }).catch(reason => {
        throw reason;
    });
}

function getClients(clients) {
    return new Promise(resolve => {
        resolve(cliens);
    })
}

module.exports = {
    findAllClient: findAllClient,
    findByIdFromUser: findByIdFromUser,
    findClientByValueFromUser: findClientByValueFromUser,
    deleteAllClient: deleteAllClient,
    deleteClientById: deleteClientById,
    deleteValueInClient: deleteValueInClient,
    updateFieldClient: updateFieldClient
}