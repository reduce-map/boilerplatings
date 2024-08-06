const cheerio = require('cheerio')
const _ = require('lodash')

module.exports = {
    listCategories( {nightmare} ) {
        return function* () {
            const pageData = yield nightmare.evaluate( () => {
                return {
                    origin: document.location.origin,
                    html: document.body.innerHTML
                };
            })
            const $ = cheerio.load(pageData.html);

            const categoriesLinks = Array.from($('.dropdown-menu li a').map( (index, el) => {
                return {
                    text: $(el).text().trim(),
                    // link: `${pageData.origin}${$(el).attr('href')}`
                    link: $(el).attr('href')
                }
            }))

            console.log(categoriesLinks)

            return {
                nightmare,
                links: categoriesLinks,
            }
        }
    },

    searchTextOnCite({nightmare, links}) {
        return function*() {
            const resultLinks = []

            for (let i = 0; i < links.length; i++) {
                yield nightmare.goto(links[i].link)

                yield nightmare.type('.main-search__input', 'маникюр педикюр')
                yield nightmare.click('#search_button')

                yield nightmare.wait('#itemsList')

                const pageData = yield nightmare.evaluate( () => {
                    return {
                        href: document.location.href,
                        html: document.body.innerHTML
                    };
                })

                resultLinks.push({
                    text: links[i].text,
                    link: pageData.href
                })
            }

            return {
                nightmare,
                links: resultLinks,
            }
        }
    },

    salonInfoOnCite({nightmare, links}) {
        return function*() {
            const resultLinks = []

            const getSalonInfoFromPage = function* (city) {
                const pageData = yield nightmare.evaluate( () => {
                    return {
                        origin: document.location.origin,
                        html:document.body.innerHTML
                    };
                })
                const $ = cheerio.load(pageData.html);

                return Array.from( $('#itemsList .item-search').map( (index, el) => {
                    let tel = $(el).find('.item-search__text.company-phone a').attr('href')

                    if (tel && tel.replace) {
                        tel = tel.replace('tel:', '')
                    }

                    return {
                        city,
                        name: $(el).find('.item-search__title a').text().trim().split('\n')[0].trim(),
                        tel,
                        // link: $(el).find('.item-search__title a').attr('href')
                        link:`${pageData.origin}${$(el).find('.item-search__title a').attr('href')}`,
                    }
                }))
            }

            for (let i = 0; i < links.length; i++) {
                yield nightmare.goto(links[i].link)
                yield nightmare.wait(500)

                const pageData = yield getSalonInfoFromPage(links[i].text)
                resultLinks.push(pageData)

                let nextExists = yield nightmare.visible('.pagination-sunshine ul li.active + li a')

                while (nextExists) {
                    yield nightmare
                        .click('.pagination-sunshine ul li.active + li a')

                    yield nightmare.wait(500)

                    const pageData = yield getSalonInfoFromPage(links[i].text)
                    resultLinks.push(pageData)

                    nextExists = yield nightmare.visible('.pagination-sunshine ul li.active + li a')
                }
            }

            return {
                nightmare,
                links: resultLinks,
            }
        }
    }
}
