function updateFieldClient(callback, client, data, changeClient) {
    new Promise(resolve => {
        resolve(changeClient(client, data, 'update'))
    }).then(res => {
        console.log(res);
        client.save(err => {
            if (!err) callback(client);
        })
    })
}

module.exports = {
    updateFieldClient: updateFieldClient
}