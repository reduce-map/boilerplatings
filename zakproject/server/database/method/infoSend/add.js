const Info = require('../../models/InfoSend').InfoSend;
const mongoose = require('../../dataMain');

async function addInfo(user, infoData, callback) {
    return await new Promise(resolve => {
        someInfo(user, infoData, resolve);
    }).then(info => {
        callback(info);
    })

}


function someInfo(user, infoData, callback) {
    new Info({
        _id: mongoose.Types.ObjectId(),
        mailSend: [],
        mailNoSent: [],
        telephoneSend: [],
        telephoneNoSent: [],
        message: {
            head: infoData.head || '',
            body: infoData.body || ''
        },
        idClients: user.myClient
    }).save( async(err, info) => {
        if (err) throw err;
        user.myInfo.push(info._id);
        await user.save();
        console.log(info);
        callback(info);
    });
}

function addIdClients(user, info, callback) {
    info.myClients = user.idClient;
    callback(info);
}

function addMailClients(arrClient, info) {
    arrClient.forEach(client => {
        client.data.mail.forEach(mailClient => {
            info.mailNoSent.push(mailClient);
        })
    })
    return info;
}

function addTelephoneClients(arrClient, info) {
    arrClient.forEach(client => {
        client.data.telephone.forEach(telephoneClient => {
            info.telephoneNoSent.push(telephoneClient);
        })
    })
    return info;
}

function getCli(data) {
    return new Promise(resolve => {
        resolve(data);
    })
}

module.exports = {
    addInfo: addInfo,
    addIdClients: addIdClients,
    addMailClients: addMailClients,
    addTelephoneClients: addTelephoneClients
}

