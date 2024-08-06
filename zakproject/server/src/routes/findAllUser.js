const metDB = require('../../database/method/common/commonFunction');

exports.post = async (req, res) => {
    let result = await metDB.test.findAllUser();
    if (result) res.send(`${result} AllUsers`);
    res.send('users weren`t found ');
}