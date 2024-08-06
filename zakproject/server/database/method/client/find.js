const Client = require('../../models/dataClient').Client;

function findAllClientFromUser(user, callback) {
    let arrClientPromise = user.myClient.map(id => {
        return getCli(findByIdFromUser, id);
    })
    Promise.all(arrClientPromise).then(clients => {
        callback(clients);
    });
}

async function findById(id) {
    return await Client.findById({_id: id}, (err, doc) => {
        if (err) console.log("Err from client/find " + err);
        return doc;
    })
}

function findByIdFromUser(user, idClient) {
    user.myClient.forEach(item => {
        if (user.myClient.indexOf(idClient) !== -1) {
            let index = user.myClient.indexOf(idClient);
            Client.findById({_id: user.myClient[index]}, function (err, doc) {
                if (err) throw err;
                return getCli(doc);
            });
        }
    })
}

function findClientByValueFromUser(user, changeClient, objFind) {
    getCli(findAllClientFromUser(resolve, user)
    ).then(clients => {
        getCli(clients.filter((client) => {
            return changeClient(client, objFind, 'find');
        }));
    })
}

function getCli(fun, id) {
    return new Promise(resolve => {
        resolve(findById(id));
    })
}

module.exports = {
    findAllClientFromUser: findAllClientFromUser,
    findByIdFromUser: findByIdFromUser,
    findClientByValueFromUser: findClientByValueFromUser
}
