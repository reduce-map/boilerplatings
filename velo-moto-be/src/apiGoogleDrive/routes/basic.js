module.exports = googleDriver => ({
  filesCreate: (() => googleDriver.files.create.bind(googleDriver.files))(),
  filesDelete: (() => googleDriver.files.delete.bind(googleDriver.files))(),
  filesList:(() => googleDriver.files.list.bind(googleDriver.files))(),
  permissionsCreate: (() => googleDriver.permissions.create.bind(googleDriver.permissions))(),
})
