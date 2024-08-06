const passport = require('passport');

module.exports = function (app) {
    app.get('/testAuth', passport.authenticate('jwt', {session: false}), require('./testAuth').get);
    app.post('/authentication', require('./authentication').post);
    app.get('/findAllClients',passport.authenticate('jwt', {session: false}), require('./findAllClients').get);
    app.post('/register',passport.authenticate('jwt', {session: false}), require('./register').post);
    app.post('/exit',passport.authenticate('jwt', {session: false}), require('./exit').post);
    app.post('/addClient',passport.authenticate('jwt', {session: false}), require('./addClient').post);
    app.post('/updateClient',passport.authenticate('jwt', {session: false}), require('./updateClient').post);
    app.post('/deleteClient',passport.authenticate('jwt', {session: false}), require('./deleteClient').post);


    app.post('/addInfo',passport.authenticate('jwt', {session: false}), require('./addInfo').post);
    app.post('/findAllUser',passport.authenticate('jwt', {session: false}), require('./findAllUser').post);

    app.post('/findAllInfo',passport.authenticate('jwt', {session: false}), require('./findAllInfo').post);
    app.post('/deleteAccount',passport.authenticate('jwt', {session: false}), require('./deleteAccount').post);
    app.post('/deleteAll',passport.authenticate('jwt', {session: false}), require('./deleteAll').post);
    app.post('/update',passport.authenticate('jwt', {session: false}), require('./updatePassword').post);
}