const pathToDirectory = path.join(__dirname,'images')
const folderId = '10LkPlejO7StQ2LjRZR3kvwmkPLpvDWZr'
const linkView = id => `https://drive.google.com/open?id=${id}`
const filesName = new Promise((res,rej) => fs.readdir(pathToDirectory, (err, files) => err ? rej(err) : res(files)))
const optionList = {
    includeRemoved: false,
    pageSize:10,
    fields: 'nextPageToken, files(id, name)',
    'q': "'"+folderId+"' in parents",
}

module.exports = {
  pathToDirectory,
  folderId,
  linkView,
  filesName,
  optionList,
}
