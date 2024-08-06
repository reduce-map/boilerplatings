const Client = require('../../database/models/dataClient').Client

exports.post = async (req, res) => {
    let result = await deleteById(req.body.id_client);
    if (result) {
        console.log(result);
        res.send(result);
    }


}

async function deleteById(id) {
    return await Client.remove({_id: id}, (err, doc) => {
        if (err) console.log(err);
        return true;
    })
}