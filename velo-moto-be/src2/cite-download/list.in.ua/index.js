const fs = require('fs');

const { getCategoriesFromCite,
    getProductsFromCategoriesCite,
    getProductInfoFromCite
} = require('../utils/getCite')

const { listCategories, searchTextOnCite, salonInfoOnCite } = require('./config')

const downloadListCategories = function () {
    const fileName = `list.categories.json`

    if (fs.existsSync(fileName)) {
        try {
            const contents = fs.readFileSync(fileName, 'utf8');
            console.log(JSON.parse(contents).length)
            searchTextOnCiteList(JSON.parse(contents))
        } catch (err) {
            console.log(`can't stringify ${fileName}`, err)
        }
    } else {
        getCategoriesFromCite({
            url: 'https://list.in.ua/%D0%9A%D0%BE%D0%B2%D0%B5%D0%BB%D1%8C',
            resolution: [1600, 800],
            waitTimeout: 10000,
            showEndTime: true
        }, listCategories, ({result, endTime, showEndTime}) => {
            console.log(`endTime ${endTime} result ${result}`)

            // добавил ковель его нет в дропдауне
            result.links.push({
                text: 'Ковель',
                link: 'https://list.in.ua/%D0%9A%D0%BE%D0%B2%D0%B5%D0%BB%D1%8C'
            })

            fs.writeFile(`${__dirname}/${fileName}`, JSON.stringify(result.links, null, 4), (err) => {
                if (err) {
                    console.log(err);
                }

                console.log(`File ${fileName} written`)
            });
            console.log(result)
            // downloadMilanoProductsFromCite(result.links)
        })
    }
}

const searchTextOnCiteList = (categories) => {
    const fileName = `search.links.json`

    if (fs.existsSync(fileName)) {
        try {
            const contents = fs.readFileSync(fileName, 'utf8');
            getSalonInfo(JSON.parse(contents))
        } catch (err) {
            console.log(`can't stringify ${fileName}`, err)
        }
    } else {
        getProductsFromCategoriesCite({
            links: categories,
            resolution: [1600, 800],
            waitTimeout: 10000,
            showEndTime: true,
        },searchTextOnCite, ({result,endTime,showEndTime}) => {
            fs.writeFile(`${__dirname}/${fileName}`, JSON.stringify(result.links, null, 4), (err) => {
                if (err) {
                    console.log(err);
                }

                console.log(`File ${fileName} written`)

                getSalonInfo(result.links)
            });
        })
    }
}

const getSalonInfo = (categories) => {
    const fileName = `salons.links.json`

    if (fs.existsSync(fileName)) {
        try {
            const contents = fs.readFileSync(fileName, 'utf8');
            console.log(contents)
        } catch (err) {
            console.log(`can't stringify ${fileName}`, err)
        }
    } else {
        getProductsFromCategoriesCite({
            links: categories,
            resolution: [1600, 800],
            waitTimeout: 10000,
            showEndTime: true,
        }, salonInfoOnCite, ({result}) => {
            fs.writeFile(`${__dirname}/${fileName}`, JSON.stringify(result.links, null, 4), (err) => {
                if (err) {
                    console.log(err)
                }

                console.log(`File ${fileName} written`)
            })
        })
    }
}
//
// const downloadMilanoProductInfoFromCite = (products) => {
//     const fileName = `milano.products-info.json`
//
//     if (fs.existsSync(fileName)) {
//         try {
//             const contents = fs.readFileSync(fileName, 'utf8');
//             console.log(contents)
//         } catch (err) {
//             console.log(`can't stringify ${fileName}`, err)
//         }
//     } else {
//         getProductInfoFromCite(
//             {
//                 links: products,
//                 resolution: [1600, 800],
//                 waitTimeout: 10000,
//                 showEndTime: false,
//             },
//             milanoProduct,
//             ({
//                 result,
//                 endTime,
//                 showEndTime
//             }) => {
//                 fs.writeFile(`${__dirname}/${fileName}`, JSON.stringify(result, null, 4), (err) => {
//                     if (err) {
//                         console.log(err);
//                     }
//
//                     console.log(`File ${fileName} written`)
//                 });
//             }
//         )
//     }
// }

downloadListCategories()

