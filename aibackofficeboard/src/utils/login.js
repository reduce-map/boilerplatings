import auth from '@utils/auth.js'
/* eslint-disable no-unused-vars */
function logIn(data) {
    return new Promise(resolve => {
        resolve(auth.setToken('TOKEN'))
    })
}
function logOut() {
    return new Promise(resolve => resolve(auth.deleteToken()))
}
export default {
    logIn,
    logOut,
}
