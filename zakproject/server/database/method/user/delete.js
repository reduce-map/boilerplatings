const User = require('../../models/User').User;

async function deleteClientById(user, idClient) {
    if (user.myClient.indexOf(idClient) !== -1) {
        let index = user.myClient.indexOf(idClient),
            removed = user.myClient.splice(index, 1);
        console.log(removed);
        return await user.save((err, user) => {
            if (err) throw err;
            return user;
        })
    }
}

async function deleteUser(deleteValue, callback) {
    User.remove({mail: deleteValue}, err => {
        if (err) {
            console.error(`mail:${deleteValue} ${err}`);
        }
        console.log("del");
        callback(true);

    })

}

async function deleteAllUser(callback) {
    User.remove({}, err => {
        if (err) console.error(`${err}`);
        callback(true)
    });
}

module.exports = {
    clientById: deleteClientById,
    oneUser: deleteUser,
    allUser: deleteAllUser,
}