const fs = require('fs');
const path = require('path');
const async = require('async');
const {
  list,
  deleteFile,
  uploadFile,
  permission,
} = require('./initApi');

const {
   saveToExel,
   saveToJson,
} = require('./creatorFiles');

const createPullRequests = (fileDescriptions, callbackIterator) => fileDescriptions.map(callbackIterator)
const uploaderIterator = (pathToDirectory, folderId) => name =>
        uploadFile({
            resource: {
                name,
                parents:[folderId],
            },
            media: {
                mimeType: 'image/jpeg',
                body: fs.createReadStream(path.join(pathToDirectory, name))
            }
        })
const deleteIterator = fileId => deleteFile({fileId});
const permissionIterator = fileId => permission({
    resource: {
         type: 'anyone',
         role: 'reader',
    },
    fileId,
})

const uploadFiles = async (filesName, pathToDirectory, folderId) =>
    await new Promise((resolve, reject) =>
    async.waterfall([
        async.constant([]),
        ...createPullRequests(filesName, uploaderIterator(pathToDirectory, folderId)),
        (result, err) => result ? resolve(result) : reject(err),
    ]))

const deleteFiles = async (filesIds) =>
    await new Promise((resolve, reject) =>
    async.waterfall([
        async.constant([]),
        ...createPullRequests(filesIds, deleteIterator),
        (result, err) => result ? resolve(result) : reject(err),
    ]))

const getListOfFolder = options => list({...options})

const openPermissions = async filesIds =>
        await new Promise((resolve, reject) =>
        async.waterfall([
            async.constant([]),
            ...createPullRequests(filesIds, permissionIterator),
            (result, err) => result ? resolve(result) : reject(err),
        ]))

module.exports = {
    uploadFiles,
    // НЕ ВЫЗЫВАТЬ ЭТОТ МЕТОД БЕЗ ПАРАМЕТРА FOLDERID ИНАЧЕ СНЕСЕТ ВСЕ НА DRIVE !!!
    deleteFiles,
    getListOfFolder,
    openPermissions,
    saveToExel,
    saveToJson,
}

