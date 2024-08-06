const cheerio = require('cheerio')
const _ = require('lodash')

const config = {
    class_category_link: '.navbar-nav > li > a',
    class_load_more: '.ajaxpages.offset-top-10 a', //  вместо пагинации
    class_product_link: '.js-element .name a',
    class_product_title: 'h1.pagetitle',
    class_description: '.contentinner',
    class_price: '.price.gen',
    maxPages: 100
}

module.exports = {
    milanoCategories({ nightmare }) {
        return function* () {
            // ------------------------
            // array of categories links

            const pageData = yield nightmare.evaluate( () => {
                return {
                    origin: document.location.origin,
                    html: document.body.innerHTML
                };
            })
            const $ = cheerio.load(pageData.html);

            const categoriesLinks = Array.from($('.dropdown.lvl1 li:not(.dropdown-submenu ) a').map( (index, el) => {
                return {
                    text: $(el).text().trim(),
                    link: `${pageData.origin}${$(el).attr('href')}`
                }
            }))

            return {
                nightmare,
                links: categoriesLinks,
            }
        }
    },
    milanoProducts({ nightmare, links }) {
        return function* () {
            // ------------------------
            // array of categories links

            const productsLinks = []

            const getProductsLinksFromPage = function* () {
                const pageData = yield nightmare.evaluate( () => {
                    return {
                        origin: document.location.origin,
                        html:document.body.innerHTML
                    };
                })
                const $ = cheerio.load(pageData.html);

                return Array.from( $(config.class_product_link).map( (index, el) => {
                    return `${pageData.origin}${$(el).attr('href')}`
                }))
            }

            for (let i = 0; i < links.length; i++) {
                yield nightmare.goto(links[i].link)

                yield nightmare.wait(2000)

                let nextExists = yield nightmare.exists(config.class_load_more)
                let page = 1

                // console.log(nextExists)

                // TODO onlick data-fvalue="gallery" and pagination
                while (nextExists) {
                    try {
                        yield nightmare
                            .click(config.class_load_more)

                        page++
                        console.log(page)
                        yield nightmare.wait(1000)

                        nextExists = (yield nightmare.exists(config.class_load_more));
                    } catch (err) {
                        console.error(`
                            link ${links[i].link} 
                            error ${err}
                        `)

                        nextExists = false
                    }
                }

                const productsLinksFromPage = yield getProductsLinksFromPage()

                productsLinks.push({
                    title: links[i].text,
                    // links: _.uniq(productsLinksFromPage).slice(0,2)
                    links: _.uniq(productsLinksFromPage)
                })
            }

            return {
                nightmare,
                links: productsLinks
            }
        }
    },
    milanoProduct({ nightmare, links }) {
        return function* () {
            const products = []

            const getProduct = function* () {
                const pageData = yield nightmare.evaluate( () => {
                    return {
                        href: document.location.href,
                        origin: document.location.origin,
                        html: document.body.innerHTML
                    };
                })

                const $ = cheerio.load(pageData.html);
                const imgUrls = []

                try {
                    let n = 2

                    // save loaded image url
                    imgUrls.push(pageData.origin + $('.js_picture_glass.genimage').attr('src'))

                    const length = yield nightmare.evaluate( () => {
                        return document.querySelectorAll(`.sliderin .changeimage.scrollitem`).length
                    })

                    while ( (n-1) < length) {
                        yield nightmare.click(`.sliderin .changeimage.scrollitem:nth-child(${n})`)
                        yield nightmare.wait(1000)
                        const pageData = yield nightmare.evaluate( () => {
                            return {
                                href: document.location.href,
                                origin: document.location.origin,
                                html: document.body.innerHTML
                            }
                        })
                        const $ = cheerio.load(pageData.html);

                        imgUrls.push(pageData.origin + $('.js_picture_glass.genimage').attr('src'))
                        n +=1
                    }
                } catch (err) {
                    console.log('-----ERROR-----')
                    console.log(err)
                    console.log('-----ERROR-----')
                }

                return {
                    href: pageData.href,
                    name: $(config.class_product_title).text(),
                    price: $(config.class_price).text().trim(),
                    description: $(config.class_description).text(),
                    url: imgUrls
                }
            }

            for (let i = 0; i < links.length; i++) {
                const category = links[i]

                for (let j = 0; j < category.links.length; j++) {
                    const link = category.links[j];

                    yield nightmare.goto(link)
                    const product = yield getProduct()

                    products.push(product)
                }
            }

            return {
                nightmare,
                result: products
            }
        }
    }
}
