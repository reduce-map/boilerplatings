const metDB = require('../../database/method/common/commonFunction');

module.exports = async (req, res, next) => {
    req.user = res.locals.user = null;
    if (!req.session.user) return next();
    req.user = res.locals.user = await metDB.findUserById(req.session.user);
    next();

}