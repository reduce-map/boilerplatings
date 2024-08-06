const metDB = require('../../database/method/common/commonFunction');
const bcrypt = require('bcrypt');

async function encryptPassword(password) {
    return await bcrypt.hash(password, 10).then(async hash => {
        console.log("HHHHAAASSSHHH " + hash);
        return hash;
    });

}

exports.post = async (req, res) => {
    console.log(req.body);
    if (req.body.mail || req.body.password) {
        req.body.password = await encryptPassword(req.body.password);
        let result = await metDB.registrationUser(req.body);
        if (!result) {
            res.send({success:false,message:'That email address already exist'});
        }else{
            res.send({success:true,message:'Successfully created new User '})
        }
    } else {
        res.send({success:false,message:'Please enter an email and password to register'});
    }
}