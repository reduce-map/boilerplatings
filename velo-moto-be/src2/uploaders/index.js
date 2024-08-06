const path = require('path')

const {
    uploadFolder,
    removeFolder
} = require('./ftp');

uploadFolder('large', path.join(__dirname, 'large')).then(res => console.log('largeres----------',res))

module.exports = {
    FtpUploader() {
        return '123123'
    }
}
