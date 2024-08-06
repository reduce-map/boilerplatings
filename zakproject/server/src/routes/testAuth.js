const metDB = require('../../database/method/common/commonFunction');
jwt = require('jsonwebtoken')

exports.get = async (req, res) => {
    res.send('User id is : ' + req.user._id + '.');

};