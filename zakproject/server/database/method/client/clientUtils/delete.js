function removeData(ClientData, ObjData) {
    Object.keys(ObjData).forEach(key => {
        if (key === 'telephone') {
            removeFromObj(ClientData[key], 'number', ObjData[key]);
        } else {
            removeValueFromArr(ClientData[key], ObjData[key])
        }
    })
}

function removePostSendMessageItems(ClientData, ObjData) {
    Object.keys(ObjData).forEach(key => {
        if (key === 'items') {
            // removeItems(ClientData[key], ObjData[key]);
        } else if (key === 'message') {
            removeFromObj(ClientData[key], 'message_id', ObjData[key]);
        } else {
            removeValueFromArr(ClientData[key], ObjData[key]);
        }
    })
}

function removeValueFromArr(valueClient, valueDelete) {
    valueDelete.forEach(deleter => {
        let index = valueClient.indexOf(deleter);
        if (index !== -1) {
            valueClient.splice(index, 1);
        }
    })
}

function removeFromObj(dataClient, keyField, valuesDelete) {
    valuesDelete.forEach(valDel => {
        dataClient.forEach((valueClient, index) => {
            if (valueClient[keyField] === valDel[keyField]) {
                dataClient.splice(index, 1);
            }
        })
    })
}

module.exports = {
    removeData: removeData,
    removePostSendMessageItems: removePostSendMessageItems,
}


