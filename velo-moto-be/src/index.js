const path = require('path')
const fs = require('fs')

const { downloadMilano, downloadProductsImages, uploadFiles, openPermissions} = require('./milano')

const pathToDirectory = path.join(__dirname,'/apiGoogleDrive/images')
const folderId = '10LkPlejO7StQ2LjRZR3kvwmkPLpvDWZr'
const linkView = id => `https://drive.google.com/open?id=${id}`
const filesName = new Promise((res,rej) => fs.readdir(pathToDirectory, (err, files) => err ? rej(err) : res(files)))
const optionList = {
    includeRemoved: false,
    pageSize:10,
    fields: 'nextPageToken, files(id, name)',
    'q': "'"+folderId+"' in parents",
}

filesName.then( async fileName => {
    const links = await uploadFiles(fileName, pathToDirectory, folderId)
    openPermissions(links.map(link => link.id ))

    console.log('links', links.map( link => {
        return linkView(link.id)
    }))
})


