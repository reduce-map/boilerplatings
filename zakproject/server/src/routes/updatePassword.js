const metDB = require('../../database/method/common/commonFunction');


exports.post = async (req, res) => {
    let result = await metDB.test.findAllUser();
    if (result) {
        result.forEach(async user => {
            let hash = await user.encryptPassword('1234567890qwerty');
            user.password = hash;
            await user.save();
            res.send(user);
        })
    }
}