function updateName(ClientName, field, oldValue, newValue) {
    if (ClientName[field] === oldValue) {
        ClientName[field] = newValue;
    }
}


function updateData(ClientData, field, oldValue, newValue) {
    if (field === 'telephone') {
        updateFromObj(ClientData[field], oldValue, newValue);
    } else {
        updateValueFromArr(ClientData[field], oldValue, newValue);
    }

}

///Допелить!!!!
function updatePostSendMessageItems(ClientData, field, oldValue, newValue) {
    if (field === 'items') {
        // updateItems(ClientData[key], ObjData[key]);
    } else if (field === 'message') {
        updateFromObj(ClientData[field], oldValue, newValue);
    } else {
        updateValueFromArr(ClientData[field], oldValue, newValue);
    }

}


function updateValueFromArr(ClientData, oldValue, newValue) {
    ClientData.forEach((value, index) => {
        if (value[value] === oldValue) {
            value.splice(index, 1, newValue);
        }
    })
}

//Проверить
function updateFromObj(ClientData, oldValue, newValue) {
    ClientData.forEach((value, index) => {
        Object.keys(value).forEach((key) => {
            if (value[key] === oldValue) {
                value.splice(index, 1, newValue);
            }
        })
    })
}

module.exports = {
    updateName: updateName,
    updateData: updateData,
    updatePostSendMessageItems: updatePostSendMessageItems,
}
