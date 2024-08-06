const metDB = require('../../database/method/common/commonFunction');

exports.post = async (req, res) => {
    let result = await metDB.getAllInfo(req.session.user);
    if (result) {
        res.send(result);
    }
}