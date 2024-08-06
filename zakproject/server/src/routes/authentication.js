const metDB = require('../../database/method/common/commonFunction');
jwt = require('jsonwebtoken')

exports.post = async (req, res) => {
    console.log(`${req.body.mail} ${req.body.password}`);
    if (req.body.mail && req.body.password) {
        let result = await metDB.authenticationUser(req.body.mail);
        if (result) {
            result.comparePassword(req.body.password, (error, matches) => {
                if (matches && !error) {
                    const token = jwt.sign({ result },  'secretKey');
                    res.json({ success: true, message: 'Token granted', token, user: result });
                } else {
                    res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' });
                }
            });
        } else {
            res.send({success:false,message:'Auth failed. User not found'});
        }
    } else {
        res.send({success:false,message:'authentication was fail. mail or password were absence'});
    }
};