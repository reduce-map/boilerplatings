const Client = require('../../database/models/dataClient').Client

exports.get = async (req, res) => {
    let result = await findAll(req.query.user_id);
    result = changeData(result)
    console.log(result);
    if (result) res.send(result);

}

async function findAll(user_id) {
    return await Client.find({user_id: user_id}, (err, doc) => {
        if (err) console.log(err);
        return doc;
    })
}

function changeData(clients) {
    return clients.map(client => {
        /*Object.keys(client._doc).forEach(key => {
            console.log(key)
             if(key==='name'||key==='data'){
                 Object.keys(client[key]).forEach(keyName=>{
                     newDataClient[keyName] = client[key][keyName];
                 })
             }else if(key!=='$init'&&key!=='__v'){ newDataClient[key] = client[key];}

         })*/
        return {
            first_name: client.name.first_name,
            second_name: client.name.second_name,
            patronymic: client.name.patronymic||'',
            site: client.data.site,
            mail: client.data.mail,
            telephone: client.data.telephone,
            items: client.items,
            post: client.post,
            _id: client._id,
            user_id: client.user_id,
            message: client.message
        };
    })
}