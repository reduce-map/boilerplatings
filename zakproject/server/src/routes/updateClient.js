const Client = require('../../database/models/dataClient').Client

exports.post = async (req, res) => {
    let result = await findById(req.body.client._id);
    if (result) {
        console.log(result);
        result = updateClient(result, req.body.client);
        console.log(result);
        if (result) res.send(result);
    }


}

async function findById(id) {
    return await Client.findById({_id: id}, (err, doc) => {
        if (err) console.log("Err from client/find " + err);
        return doc;
    })
}

async function updateClient(clientFromDB, clientFromUI) {
    clientFromDB.name.first_name = clientFromUI.first_name;
    clientFromDB.name.second_name = clientFromUI.second_name;
    clientFromDB.name.patronymic = clientFromUI.patronymic;
    clientFromDB.data.site = clientFromUI.site;
    clientFromDB.data.mail = clientFromUI.mail;
    clientFromDB.data.telephone = clientFromUI.telephone;
    clientFromDB.items = clientFromUI.items;
    clientFromDB.message = clientFromUI.message;
    clientFromDB.post = clientFromUI.post;
    await clientFromDB.save();

}