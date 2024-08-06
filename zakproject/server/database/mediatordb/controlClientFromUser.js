const changeClient = require('../method/clientInsaideFunction');
const client = require('../method/client');
const user = require('../method/user');

//получить User затем через него изменить в самом Client
async function addClient(callback, User, searchValue, dataClient) {
    new Promise(resolve => {
        client.findClient(callback, User, dataClient.telephone);
    }).then(res => {
        res === undefined ? callback(`this client already exist ${ dataClient.telephone}`) : client.addClient(callback, User, searchValue, dataClient);
    })
}