const strategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../database/models/User').User;


module.exports = (passport) => {

    const parameters = {
        secretOrKey: 'secretKey',
        jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken()
    };

    passport.use(new strategy(parameters, (payload, done) => {
        User.findOne({ id: payload.id }, (error, user) => {
            if (error) return done(error, false);
            if (user) done(null, user);
            else done(null, false);
        });
    }));
}