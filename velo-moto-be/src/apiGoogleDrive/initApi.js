const { google } = require('googleapis');
const routes = require('./routes');

const {
    TOKEN,
    CREDENTIALS,
    FULL_ACCESS,
} = require('./config');

const getOAuth2 = ({ client_secret, client_id, redirect_uris }) => {
 const OAuth2 =  new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);
    OAuth2.setCredentials(TOKEN);

    return OAuth2;
}


const googleDriver = (creadentials, getOAuth2) => google.drive({version: 'v3', auth: getOAuth2(creadentials)})

module.exports = {
  ...routes(googleDriver(CREDENTIALS, getOAuth2))
}
