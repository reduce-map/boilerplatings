const Nightmare = require('nightmare');
const vo = require('vo');

const moment = require('moment');
const _ = require('lodash')

const timeFormat = "YY-MM-Do-HH:mm"
const startTime = moment().format(timeFormat)

const createNightMare = ({url, resolution, waitTimeout}) => {
    const nightmare = Nightmare({
        waitTimeout,
        show: !!resolution,
        openDevTools: !!resolution,
    })

    return function* () {
        yield nightmare
            .viewport(...resolution)
            .goto(url)

        return { nightmare }
    }
}

const getCategories = (getterCategories) => {
    return function* ({ nightmare }) {
        return yield getterCategories( { nightmare })
    }
}

const closeNightmare = () => {
    return function* ({nightmare, links}) {
        console.log('links-length', links.length)
        yield nightmare.end()
        return { links }
    }
}


module.exports = {
    getCategoriesFromCite({url, resolution, waitTimeout, showEndTime}, GetterForCiteCategories, callback) {
        const pipeline = [
            createNightMare({
                url: url,
                resolution: resolution
            }),
            getCategories(GetterForCiteCategories),
            closeNightmare()
        ]

        console.log('-------------------------')
        console.log(`Start getCategoriesFromCite ${url} at ${startTime}`)
        console.log('-------------------------')

        return vo(...pipeline)((err, result) => {
            if (err) {
                console.log(err)
                throw err;
            }

            const endTime = moment().format(timeFormat)

            console.log('-------------------------')
            console.log(`End getCategoriesFromCite ${url} at ${endTime}`)
            console.log(`With this result`)
            console.log(`${ JSON.stringify(result, null, 4)}`)
            console.log(`there're ${result.links.length} categories`)
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
