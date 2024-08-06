const Info = require('../../models/User').InfoSend;


function deleteAllInfo(user, callback) {
    new Promise(resolve => {
        resolve(user.myInfo.map(id => {
            return new Promise(resolve => {
                Client.remove({_id: id}, err => {
                    if (!err) resolve(true);
                });
            })
        }));
    }).then(arrInfoPromise => {
        Promise.all(arrInfoPromise).then((arrRes) => {
            let arrLength = user.myClient.length;
            user.myInfo = [];
            console.log(`delete ${arrRes.length} of ${arrLength}`);
            user.save((err, user) => {
                if (err) throw err;
                callback(user);
            })
        });
    });
}


async function deleteInfoById(idInfo) {
    await Info.remove({_id: id}, err => {
        if (!err) return true;
    });

}

function removeInfoInUserById(user, idInfo) {
    let index = user.myInfo.indexOf(idInfo);
    if (index !== -1) {
        user.myInfo.splice(index, 1);
        return user;
    }
    return user;

}

function deleteInfoByValue(head) {
    Info.remove({message: {head: head}}, err => {
        if (!err) {
            console.log(`Info with head ${head} already delete`);
        }

    });
}


module.exports = {
    deleteInfoById: deleteInfoById,
    deleteAllInfo: deleteAllInfo,
    deleteInfoByValue: deleteInfoByValue


}