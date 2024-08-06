const TOKEN = require('./token')
const CREDENTIALS = require('./credentials')

// If modifying these scopes, delete token.json.
const FULL_ACCESS = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

module.exports = {
  TOKEN,
  CREDENTIALS,
  FULL_ACCESS,
}
