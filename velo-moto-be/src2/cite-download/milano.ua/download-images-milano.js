// const fs = require('fs')
// const request = require('request');
// const async = require("async");
//
// const download = function(uri, filename, callback) {
//     request.head(uri, function(err, res, body){
//         console.log('content-type:', res.headers['content-type']);
//         console.log('content-length:', res.headers['content-length']);
//
//         request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
//     });
// };
//
// let products = fs.readFileSync('milano.products-info.json', 'utf8');
// products = JSON.parse(products)

// console.log(products)
//
// const q = async.queue(function(task, callback) {
//     console.log('hello ' + task.name);
//     callback();
// }, 2);

// console.log(contents)

// download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
//     console.log('done');
// });


// const downloadProduct = async (product) => {
//     product.url.forEach( (url, index) => {
//         const name = ( () => {
//             const name = url.split('/')
//             return name[name.length - 1]
//         } )()
//
//         download(url, `${product.name}-${index}-${name}`, function(){
//             console.log(`done ${url}`);
//         });
//     })
// }
//
// async function downloadImgs(products) {
//     for await (const product of products) {
//         console.log(product)
//         await downloadProduct(product);
//     }
//     console.log('Done!');
// }
//
// downloadImgs(products)

//
// async function printFiles () {
//     const files = await getFilePaths();
//
//     for await (const file of files) {
//         const contents = await fs.readFile(file, 'utf8');
//         console.log(contents);
//     }
// }
// printFiles()

const request = require('request')
const async = require('async')
const fs = require('fs')
const ProgressBar = require('progress')
const download = require('image-downloader')

const dest = 'images-milano'

const downloadImage = function(uri, filename, callback) {
    try {
        request
            .head(uri, function(err, res, body){
                if (!res) {
                    console.error(
                        `there's an error with ${uri}`
                    )
                    callback()
                    return
                }
                // console.log(res)
                console.log('content-type:', res && res.headers['content-type']);
                console.log('content-length:', res && res.headers['content-length']);
                console.log('uri:', uri)

                // request(uri)
                //     .pipe(fs.createWriteStream(filename).on('error', error => {
                //         console.error(
                //             `there's an error with ${error}`
                //         )
                //     })).on('close', callback)

                const options = {
                    url: uri,
                    dest: `${dest}/${filename}`,
                    extractFilename: false
                }

                async function downloadIMG() {
                    try {
                        const { filename, image } = await download.image(options)
                        console.log('Saved to:', filename) // => /path/to/dest/image.jpg
                        callback()
                    } catch (e) {
                        console.error(e)
                        callback()
                    }
                }

                downloadIMG()

            })
    } catch (e) {
        console.error(
            `there's an error with ${uri}`
        )
    }

};

let products = fs.readFileSync('milano.products-info.json', 'utf8');
products = JSON.parse(products)

class Downloader {
    constructor() {
        this.q = async.queue(this.singleFile, 1);

        // assign a callback
        this.q.drain(function() {
            console.log('all items have been processed');
        });

        // assign an error callback
        this.q.error(function(err, task) {
            console.error('task experienced an error', task);
        });
    }

    downloadFiles(products) {
        for (let product of products) {
            this.q.push(product);
        }
    }

    singleFile({url, name}, cb) {
        const filename = ( () => {
            const name = url.split('/')
            return name[name.length - 1]
        } )()

        try {
            downloadImage(url, `${name}-${filename}`, function() {
                cb()
                console.log(`done ${url}`)
            });
        } catch (e) {
            cb()
        }



        // let file = request(link);
        // let bar;
        // file.on('response', (res) => {
        //     const len = parseInt(res.headers['content-length'], 10);
        //     console.log();
        //     bar = new ProgressBar('  Downloading [:bar] :rate/bps :percent :etas', {
        //         complete: '=',
        //         incomplete: ' ',
        //         width: 20,
        //         total: len
        //     });
        //     file.on('data', (chunk) => {
        //         bar.tick(chunk.length);
        //     })
        //     file.on('end', () => {
        //         console.log('\n');
        //         cb();
        //     })
        // })
        // file.pipe(fs.createWriteStream('./downloads/' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)))
    }
}

const dl = new Downloader();

dl.downloadFiles(
    products
        .reduce( (prev, {name, url}) => {
            const urls = url.map( u => {
                return {
                    url: u,
                    name,
                }
            })

            return [
                ...prev,
                ...urls
            ]
        }, [])
        // .filter( el => el.url.indexOf('undefined') === -1  )
);
