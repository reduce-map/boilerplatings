const faker = require('faker')
const fs = require('fs')
const moment = require('moment')

module.exports = app => {
    app.post('/api/project/upload-avatar', (req, res) => {
        let fstream
        req.pipe(req.busboy)

        req.busboy.on('file', function(fieldname, file, filename) {
            console.log('Uploading: ' + filename)

            //Path where image will be uploaded
            fstream = fs.createWriteStream(
                `${__dirname}/img/${moment().format(
                    'MMMM Do YYYY, h:mm:ss a'
                )}- -${filename}`
            )
            file.pipe(fstream)
            fstream.on('close', function() {
                console.log('Upload Finished of ' + filename)
                res.json({
                    avatarLink: faker.image.avatar(),
                    name: 'avatar',
                })
            })
        })
    })
}
