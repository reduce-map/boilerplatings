const Nightmare = require('nightmare');
const vo = require('vo');

const moment = require('moment');
const _ = require('lodash')

const timeFormat = "YY-MM-Do-HH:mm"
const startTime = moment().format(timeFormat)

const createNightMare = ({links, resolution, waitTimeout}) => {
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

const getProductData = (getterProducts) => {
    return function* ({ nightmare, links } ) {
        return yield getterProducts({ nightmare, links })
    }
}

const closeNightmare = () => {
    return function* ({nightmare, result}) {
        yield nightmare.end()
        return result
    }
}


module.exports = {
    getProductInfoFromCite({links, resolution, waitTimeout, showEndTime}, GetterForCiteProduct, callback) {
        const pipeline = [
            createNightMare({
                links,
                resolution: resolution,
                waitTimeout,
            }),
            getProductData(GetterForCiteProduct),
            closeNightmare()
        ]

        console.log('-------------------------')
        console.log(`Start getProductInfoFromCite there're ${links.length} categories at ${startTime}`)
        console.log('-------------------------')

        return vo(...pipeline)((err, result) => {
            if (err) {
                console.log(err)
                throw err;
            }

            const endTime = moment().format(timeFormat)

            console.log('-------------------------')
            console.log(`End getProductInfoFromCite  at ${endTime}`)
            console.log(`With this result`)
            console.log(`${ JSON.stringify(result, null, 4)}`)
            console.log(`there're ${result.length} categories`)
            console.log('-------------------------')

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
