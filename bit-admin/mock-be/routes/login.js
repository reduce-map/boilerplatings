const path = require('path')
const fs = require('fs')

// ############################
const formatFrontEndBaseUrl = url => {
    return url.replace(/\/.*\/v1.0/, '') // remove '/api/usermanagement/v1.0/organisations/1/organisationalUnits'.replace(/\/.*\/v1.0/, '') "/organisations/1/organisationalUnits"
}
// ############################

const pathToFile = fileName => path.join(__dirname,`../MOCK_DATA/${fileName}.json`)
const formatFileName = name => name.split('/').filter(v => v).join('_')
const saveFile = (fileName, fileData, res) => fs.writeFile(pathToFile(fileName), JSON.stringify(fileData), (err, result) => {
    if(err) {
        res.json({
            status: err
        })
        console.log(err)
    } else {
        res.json({
            status: 'successful'
        })
        console.log('Saved')
    }
})

const getFileAndPropertyNames = ({ url }) => {
    const isQuery = url.match(/\?/)
    const fileName = formatFileName(isQuery ?  `${url.slice(0, isQuery.index)}` : url)
    const propertyName = isQuery ? `${url.slice(isQuery.index + 1)}` : '.'

    return {
        fileName,
        propertyName
    }
}

module.exports = app => {
    app.post('/api/save', (req, res) => {

        if(!Object.keys(req.body).length) return

        const {
            fileName,
            propertyName 
        } = getFileAndPropertyNames( req.body.config )

        const pathFile = pathToFile(fileName)
        const isFileExist = fs.existsSync(pathFile)

        if(!isFileExist) return saveFile(fileName,{ [propertyName]: req.body }, res)

        const fileData = JSON.parse(fs.readFileSync(pathFile, 'utf-8'))

        fileData[propertyName] = req.body
        saveFile(fileName,fileData,res)
    })

    app.get('*', (req, res) => {
        if(!Object.keys(req.query).length) {
            const [fileName] = req.url.split('?')
            const pathFile = pathToFile(formatFileName(formatFrontEndBaseUrl(fileName)))

            if(fs.existsSync(pathFile)) {
                const fileData = JSON.parse(fs.readFileSync(pathFile, 'utf-8'))

                return res.json(fileData['.']?.data)
            } else {
                console.log('!!!!! something is wrong', pathFile, req.url)
            }
        } else {
            const [fileName, propertyName] = req.url.split('?')
            const pathFile = pathToFile(formatFileName(formatFrontEndBaseUrl(fileName)))
            const fileData = JSON.parse(fs.readFileSync(pathFile, 'utf-8'))

            return res.json(fileData[propertyName]?.data ?? {})
        }
    })
}
