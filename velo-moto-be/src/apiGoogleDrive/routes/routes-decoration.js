module.exports = basicRoutes => {
  const {
    filesCreate,
    filesDelete,
    filesList,
    permissionsCreate,
  } = basicRoutes;

const requestHelper = apiRequest => (options, logger = res => console.log(res.data)) => (acc, callback) =>
      apiRequest({
        ...options,
      }, (err, res) => {
          logger(res)
          acc.push(res.data)
          callback(err, acc)
})

  const uploadFile = requestHelper(filesCreate)
  const deleteFile = requestHelper(filesDelete)
  const permission = requestHelper(permissionsCreate)



  const getCurrentList = async (options, pageToken) =>
       new Promise((resolve, reject) => {
       filesList({
           ...options,
           pageToken,
         }, (err, res) => err ? reject(err) : resolve(res));
       })

  const collectionList =  async function* (options, pageToken = '') {
     while(true) {
       const { data } = await getCurrentList(options, pageToken);
       yield data.files
       if(!data.nextPageToken) break;
       pageToken = data.nextPageToken;
     }
   }

  const list = async (options, result=[]) => {
     for await (let value of collectionList(options)) {
       result = result.concat(value.map(v=>({...v})))
     }
     return result;
   }

   return {
    uploadFile,
    permission,
    list,
    deleteFile,
  }

}
