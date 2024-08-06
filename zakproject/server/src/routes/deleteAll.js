const metDB = require('../../database/method/common/commonFunction');

exports.post =  async (req, res) => {
    let result = await metDB.test.removeAllAccount();
    if (result) res.send(`${result} deleteAllAccount`);
    res.send('can`t be removed');

}