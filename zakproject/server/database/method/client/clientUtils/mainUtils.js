const append = require('./add');
const removeVal = require('./delete');
const templateClient = require('../../../templateObjClient')
const updateVal = require('./update');
const search = require('./find');

//data for update data={field:'', oldValue:'', newValue:''}

function changeClient(Client, data, event) {
    if (event === 'add') {
        let res = add(Client, data);
        console.log(res+"changeClient");
        return res;
    } else if (event === 'remove') {
        return remove(Client, data);
    } else if (event === 'get') {
        return get(Client, data);
    } else if (event === 'update') {
        update(Client, data);
    } else if (event === 'find') {
        return find(Client, data);
    }
}

function add(Client, ObjData) {
    let currentCl
    Object.keys(ObjData).forEach(key => {
        if (key === 'name') {
            currentCl = append.addName(Client, ObjData.name);
        }
        if (key === 'data') {
            currentCl = append.addData(Client, ObjData.data);
        }
        if (isPostSendMessageItems(key)) {
            currentCl = append.addPostSendMessageItems(Client, key, ObjData[key]);
        } else {
            console.log(`this Data is absent ${key} in Client`);
        }
    });
    console.log('before return add')
    return currentCl;

}

function remove(Client, ObjData) {
    Object.keys(ObjData).forEach(key => {
        if (key === 'data') {
            removeVal.removeData(Client[key], ObjData.data);
        }
        if (isPostSendMessageItems(key)) {
            removeVal.removePostSendMessageItems(Client[key], ObjData[key]);
        } else {
            console.log(`this Data is absent ${key} in Client`);
        }
    });

}


function get(Client, arrField) {
    let res = templateClient();
    Object.keys(Client).forEach(key => {
        if (key === 'name' || key === 'data') {
            getDataClient(Client[key], arrField, res);
        } else if (isPostSendMessageItems(key)) {
            getDataClient(Client, arrField, res);
        } else {
            console.log(`this Data is absent ${key} in Client`);
        }
    });
    return res;
}

function find(Client, data) {
    Object.keys(data).forEach(keyData => {
        if (keyData === 'first_name' || keyData === 'second_name' || keyData === 'patronymic') {
            return search.findByName(Client.name, keyData, data[keyData]);
        } else if (keyData === 'site' || keyData === 'mail') {
            return search.findByMailPostSendSite(Client.data, data[keyData])
        } else if (keyData === 'post' || keyData === 'send') {
            return search.findByMailPostSendSite(Client[keyData], data[keyData])
        } else if (keyData === 'items' || keyData === 'message') {
            return search.findByTelItemMes(Client[keyData], keyData, data[keyData]);//
        } else if (keyData === 'telephone') {
            return search.findByTelItemMes(Client.data, data[keyData])
        }
    })
}

function getDataClient(dataClient, arrField, res) {
    Object.keys(dataClient).forEach(key => {
        if (arrField.indexOf(key) !== -1) {
            res[key] = dataClient[key];
        }
    })
}

function update(Client, data) {
    Object.keys(Client).forEach(key => {
        if (key === 'name') {
            updateVal.updateName(Client[key], data.field, data.oldValue, data.newValue);
        }
        if (key === 'data') {
            updateVal.updateData(Client[key], data.field, data.oldValue, data.newValue);
        }
        if (isPostSendMessageItems(key)) {
            updateVal.updatePostSendMessageItems(Client[key], data.field, data.oldValue, data.newValue);
        } else {
            console.log(`this Data is absent ${key} in Client`);
        }
    })
}


function isPostSendMessageItems(valueData) {
    if (valueData === 'post' || valueData === 'send' || valueData === 'message' || valueData === 'items') {
        return true;
    }
    return false;
}

module.exports = {
    changeClient: changeClient,
}