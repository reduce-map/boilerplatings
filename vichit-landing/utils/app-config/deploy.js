const path = require('path')
const FtpDeploy = require('ftp-deploy')
const deployConfig = require('./deploy.config')
const ftpDeploy = new FtpDeploy()

const config = {
  user: deployConfig.user,
  password: deployConfig.password,
  host: deployConfig.host,
  localRoot: path.join(__dirname, '../../') + '/dist',
  remoteRoot: '/public_html',
  include: ['*', '**/*'], // this would upload everything except dot files
  exclude: [
    // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
    'dist/**/*.map',
    'node_modules/**',
    'node_modules/**/.*',
    '.git/**',
  ],
  deleteRemote: false, // delete ALL existing files at destination before uploading, if true
  forcePasv: true, // Passive mode is forced (EPSV command is not sent)
  sftp: false, // use sftp or ftp
}

ftpDeploy.on('uploading', function (data) {
  console.log(data.totalFilesCount) // total file count being transferred
  console.log(data.transferredFileCount) // number of files transferred
  console.log(data.filename) // partial path with filename being uploaded
})
ftpDeploy.on('uploaded', function (data) {
  console.log(data) // same data as uploading event
})
ftpDeploy.on('log', function (data) {
  console.log(data) // same data as uploading event
})
ftpDeploy.on('upload-error', function (data) {
  console.log(data.err) // data will also include filename, relativePath, and other goodies
})

ftpDeploy
  .deploy(config)
  .then((res) => console.log('finished:', res))
  .catch((err) => console.log(err))
