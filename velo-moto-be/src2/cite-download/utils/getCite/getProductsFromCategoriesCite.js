const Nightmare = require('nightmare');
const vo = require('vo');

const moment = require('moment');
const _ = require('lodash')

const timeFormat = "YY-MM-Do-HH:mm"
const startTime = moment().format(timeFormat)

const createNightMare = ({ links, resolution, waitTimeout}) => {
    const nightmare = Nightmare({
        waitTimeout,
        show: !!resolution.length,
    })

    return function* () {
        yield nightmare
            .viewport(...resolution)

        return { nightmare, links }
    }
}

const getProductsLinksByCategory = (getterCategories) => {
    return function* ({ nightmare, links }) {
        return yield getterCategories( { nightmare, links })
    }
}

const closeNightmare = () => {
    return function* ({nightmare, links}) {
        yield nightmare.end()
        return { links }
    }
}


module.exports = {
    getProductsFromCategoriesCite({links, resolution, waitTimeout, showEndTime}, GetterForCiteProducts, callback) {
        const pipeline = [
            createNightMare({
                links,
                waitTimeout,
                resolution,
            }),
            getProductsLinksByCategory(GetterForCiteProducts),
            closeNightmare()
        ]

        console.log('---------XXXXXXX---------')
        console.log(`Start getProductsFromCategoriesCite there're ${links.length} categories at ${startTime}`)
        console.log('---- Let fucking go! ----')

        return vo(...pipeline)((err, result) => {
            if (err) {
                console.log(err)
                throw err;
            }

            const endTime = moment().format(timeFormat)

            if (typeof callback === 'function') {
                callback({
                    result,
                    endTime,
                    showEndTime
                })
            } else {
                console.error('callback for GetterForCiteCategories in not a function')
            }

            return result
        })
    }
}
