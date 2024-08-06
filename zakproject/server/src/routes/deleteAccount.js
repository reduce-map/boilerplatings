const metDB = require('../../database/method/common/commonFunction');

exports.post = async (req, res) => {
    console.log(req.session.user);
    let result = await metDB.removeAccount(req.session.user, req.body.password);
    if (result) res.send(`${result} deleteAccount`);
    res.send('can`t be removed');
}

