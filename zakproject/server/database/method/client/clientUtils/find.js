function findByName(ClientName, keyData, valueData) {
    Object.keys(ClientName).forEach(keyClient => {
        if (keyClient === keyData) {
            return ClientName[keyClient] === valueData;
        }
    })
};

function findByMailPostSendSite(ClientData, valueData) {
    return ClientData.some(value => {
        return value === valueData;
    });

}


function findByTelItemMes(ClientData, valueData) {
    return ClientData.some(obj => {
        Object.keys(obj).forEach(keyObj => {
            if (obj[keyObj] === valueData[keyObj]) {
                return true;
            }
        })
    })
}

module.exports = {
    findByName: findByName,
    findByMailPostSendSite: findByMailPostSendSite,
    findByTelItemMes: findByTelItemMes
}