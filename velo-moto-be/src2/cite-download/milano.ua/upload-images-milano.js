// TODO upload

// read dir sync
// upload files to ftp server

import { FtpUploader } from '../../uploaders'

let data = fs.readFileSync('milano.products-info.json');
data = JSON.parse(data);

console.log(data);
// async FtpUploader( ' файлы на заливку ' )
// return

// {
//     name: file
//     url: [ '', '']
// }


// write json as milano.images-uploaded.json
