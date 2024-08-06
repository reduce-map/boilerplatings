const fs = require('fs');
// const request = require('request')
// const mime = require('mime-types')
// const async = require('async')
// const _ = require('lodash')
// const path = require('path')

const { getCategoriesFromCite,
    getProductsFromCategoriesCite,
    getProductInfoFromCite
} = require('../utils/getCite')

const { milanoCategories, milanoProducts, milanoProduct } = require('./config')

const downloadMilanoCategories = function () {
    const fileName = `milano.categories.json`

    if (fs.existsSync(fileName)) {
        try {
            const contents = fs.readFileSync(fileName, 'utf8');
            downloadMilanoProductsFromCite(JSON.parse(contents))
        } catch (err) {
            console.log(`can't stringify ${fileName}`, err)
        }
    } else {
        getCategoriesFromCite({
            url: 'https://milano.ua/',
            resolution: [1600, 800],
            waitTimeout: 10000,
            showEndTime: true
        }, milanoCategories, ({result, endTime, showEndTime}) => {
            console.log(`endTime ${endTime} result ${result}`)

            fs.writeFile(`${__dirname}/${fileName}`, JSON.stringify(result.links, null, 4), (err) => {
                if (err) {
                    console.log(err);
                }

                console.log(`File ${fileName} written`)
            });
            downloadMilanoProductsFromCite(result.links)
        })
    }
}

const downloadMilanoProductsFromCite = (categories) => {
    const fileName = `milano.product-links.json`

    if (fs.existsSync(fileName)) {
        try {
            const contents = fs.readFileSync(fileName, 'utf8');
            downloadMilanoProductInfoFromCite(JSON.parse(contents))
        } catch (err) {
            console.log(`can't stringify ${fileName}`, err)
        }
    } else {
        getProductsFromCategoriesCite({
            links: categories,
            resolution: [1600, 800],
            waitTimeout: 10000,
            showEndTime: true,
        },milanoProducts, ({result,endTime,showEndTime}) => {
            fs.writeFile(`${__dirname}/${fileName}`, JSON.stringify(result.links, null, 4), (err) => {
                if (err) {
                    console.log(err);
                }

                console.log(`File ${fileName} written`)

                downloadMilanoProductInfoFromCite(result)
            });
        })
    }
}

const downloadMilanoProductInfoFromCite = (products) => {
    const fileName = `milano.products-info.json`

    if (fs.existsSync(fileName)) {
        try {
            const contents = fs.readFileSync(fileName, 'utf8');
            console.log(contents)
        } catch (err) {
            console.log(`can't stringify ${fileName}`, err)
        }
    } else {
        getProductInfoFromCite(
            {
                links: products,
                resolution: [1600, 800],
                waitTimeout: 10000,
                showEndTime: false,
            },
            milanoProduct,
            ({
                result,
                endTime,
                showEndTime
            }) => {
                fs.writeFile(`${__dirname}/${fileName}`, JSON.stringify(result, null, 4), (err) => {
                    if (err) {
                        console.log(err);
                    }

                    console.log(`File ${fileName} written`)
                });
            }
        )
    }
}

downloadMilanoCategories()

