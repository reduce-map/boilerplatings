const ftp = require('./init');
const path = require('path')
const fs = require('fs');
const {
  base_url,
  root_directory,
} = require('../config-ftp');
const downloadLink = (folder, fileName) => `${base_url}/${folder}/${fileName}`

async function list(path, callback = i => i) {
  const { list, handler } = await ftp;

  list(path, handler(callback));
}

async function appendFn(pathSrc, pathDesc, callback) {
  const { append, handler } = await ftp;

  append(pathSrc, pathDesc, handler(callback, true));
}

function createFolder(path) {
  return ftp.then(({
    mkdir, handler
  }) => {
    return new Promise(resolve => {
      mkdir(`${root_directory}${path}`, handler((res,err) => {
        resolve(!err)
      }))
    })
  })
}

async function isExist(path) {
  const { get, handler } = await ftp;
  const pathTo = `${root_directory}${path}`

  return await new Promise ((resolve) => get(pathTo, handler((_, err) => err ? resolve(false) : resolve(true))))
}

const removeFolder = name => ftp.then(({
  rmdir,
  handler
}) => new Promise(resolve => rmdir(`${root_directory}${name}`, true, handler(resolve))))


/**
 * @param {string} nameFolder name of folder
 * @param {string} pathToFolder
 * @return {Promise<Array>} with array of links
 */
async function uploadFolder(nameFolder, pathToFolder) {
await removeFolder(nameFolder);
await createFolder(nameFolder);
 const files = fs.readdirSync(pathToFolder);
 let { length } = files;
 const links = []

return new Promise(resolve => {
  files.forEach(fileName => {
    const src = path.join(pathToFolder, fileName);
    const dest = `${root_directory}${nameFolder}/${fileName}`;
    appendFn(src, dest, () => {
      length --;

      links.push({
        fileName: fileName,
        folderName: nameFolder,
        link: downloadLink(nameFolder, fileName)
      })

      console.log(downloadLink(nameFolder,fileName), 'uploaded')
      if(length === 0) resolve(links);
    })
  })
})
}



module.exports = {
  // list,
  // append: appendFn,
  // createFolder,
  removeFolder,
  // get,
  // isExist,
  uploadFolder
}
