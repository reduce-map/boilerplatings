const metDB = require('../../database/method/common/commonFunction');

exports.post =  async (req, res) => {
    let result = await metDB.addInfo(req.session.user, req.body);
    if (result) {
        res.send(result);
    }
}