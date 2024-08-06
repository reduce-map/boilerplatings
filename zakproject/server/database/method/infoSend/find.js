const Info = require('../../models/InfoSend').InfoSend;

function findAllInfoFromUser(user, callback) {
    let arrInfoPromise = user.myInfo.map(id => {
        return new Promise(resolve => {
            resolve(findById(id));
        });
    })
    Promise.all(arrInfoPromise).then(arrInfo => {
        console.log(arrInfo);
        callback(arrInfo);
    });

}

async function findById(id) {
    return await Info.findById({_id: id}, (err, doc) => {
        if (err) console.log("Cause err " + err);
        return doc;
    })
}

function findByIdFromUser(user, idInfo) {
    user.myClient.forEach(item => {
        if (user.myClient.indexOf(idClient) !== -1) {
            let index = user.myInfo.indexOf(idInfo);
            Info.findById({_id: user.myClient[index]}, function (err, doc) {
                if (err) throw err;
                return getCli(doc);
            });
        }
    })
}

function findInfoByValueFromUser(user, head) {
    getCli(
        findAllInfoFromUser(user)
    ).then(infoArr => {
        infoArr.forEach((info) => {
            if (info.message.head === head) {
                getCli(info);
            }
        })
    });
}

function getCli(clients) {
    return new Promise(resolve => {
        resolve(clients);
    })
}

module.exports = {
    findAllInfoFromUser: findAllInfoFromUser,
    findByIdFromUser: findByIdFromUser,
    findInfoByValueFromUser: findInfoByValueFromUser
}
