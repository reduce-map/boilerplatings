const mongoose = require('../../../dataMain')

function addName(Client, objName) {
    Object.keys(objName).forEach(key => {
        if (!isUndefined(objName[key])) {
            if (!isEmpty(objName[key])) {
                Client.name[key] = objName[key];
            }
        } else {
            console.log(`is Undefined ${objName[key]} meyhod/client/clientInside`);
        }
    })
    return Client;
}

function addData(Client, objData) {
    let keys = Object.keys(objData);
    console.log(keys);
    keys.forEach(key => {
        if (!isUndefined(objData[key])) {
            if (Array.isArray(objData[key])) {
                objData[key].forEach(value => {
                    Client.data[key].push(value);
                })
            } else {
                Client.data[key].push(objData[key]);
            }
        } else {
            console.log(`is Undefined ${objData[key]} meyhod/client/clientInside`);
        }
    });
    return Client;
}

function addPostSendMessageItems(Client, key, value) {
    if (!isUndefined(value)) {
        if (key === 'message') {
            return addMessage(Client, key, value);
        } else {
            Client[key].push(value);
            return Client;
        }
    } else {
        console.log(`is Undefined ${objData[key]} meyhod/client/clientInside`);
    }

}

function addMessage(Client, key, value) {
    value.message_id = mongoose.Types.ObjectId();
    Client[key].push(value);
    return Client;
}

function isUndefined(value) {
    return value === undefined;
}

function isEmpty(value) {
    return value === "";
}

function isPostSendMessageItems(valueData) {
    if (valueData === 'post' || valueData === 'send' || valueData === 'message' || valueData === 'items') {
        return 'postSendMessageItems';
    }
}

module.exports = {
    addName: addName,
    addData: addData,
    addPostSendMessageItems: addPostSendMessageItems,
}