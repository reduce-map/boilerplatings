const Client = require('../../models/dataClient').Client;

function deleteAllClient(callback, user) {
    new Promise(resolve => {
        resolve(user.myClient.map(id => {
            return new Promise(resolve => {
                Client.remove({_id: id}, err => {
                    if (!err) resolve(true);
                });
            })
        }));
    }).then(arrClientPromise => {
        Promise.all(arrClientPromise).then((arrRes) => {
            let arrLength = user.myClient.length;
            user.myClient = [];
            console.log(`delete ${arrRes.length} of ${arrLength}`);
            user.save((err, user) => {
                if (err) throw err;
                callback(user);
            })
        });
    });
}

async function deleteClientById(idClient) {
    await Client.remove({_id: id}, err => {
        if (!err) return true;
    });
}

function removeClientInUserById(user, idClient) {
    let index = user.myClient.indexOf(idClient);
    if (index !== -1) {
        user.myClient.splice(index, 1);
        return user;
    }
    return user;
}

function deleteValueInClient(callback, Client, objData, changeClient) {
    new Promise(resolve => {
        resolve(changeClient(Client, objData, 'remove'));
    }).then(client => {
        client.save(err => {
            if (!err) callback(client);
        })
    })

}

module.exports = {
    deleteAllClient: deleteAllClient,
    deleteClientById: deleteClientById,
    deleteValueInClient: deleteValueInClient,
}