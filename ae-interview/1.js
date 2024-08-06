// ====================
// utils functions
// ====================
const logError = (...args) => {
    const { name: errorName } = args[0]
    console.error(`Error ${errorName}, hey there from logError`)
}

const log = (...args) => {
    console.log(...args, 'hello from log')
}
const logObjKey = (obj, log = true) => {
    for (const key in obj) {
        log && console.log(key, `obj[key] - ${obj[key]}`)
        if (typeof obj[key] === 'object') {
            logObjKey(obj[key])
        }
    }
}

const sum = (x, y) => x + y

// Tiny,recursive auto curry
const curry = (f, arr = []) => (...args) =>
    (a => (a.length === f.length ? f(...a) : curry(f, a)))([...arr, ...args])

// custom object iteration
function objectEntries(obj) {
    let index = 0

    // In ES6, you can use strings or symbols as property keys,
    // Reflect.ownKeys() retrieves both
    let propKeys = Reflect.ownKeys(obj)

    return {
        [Symbol.iterator]() {
            return this
        },
        next() {
            console.log(propKeys, index)
            if (index < propKeys.length) {
                let key = propKeys[index]
                index++
                return { value: [key, obj[key]] }
            } else {
                return { done: true }
            }
        },
    }
}

const isFunction = obj => {
    return !!(obj && obj.constructor && obj.call && obj.apply) // duck test
}

function delay(ms, f) {
    return new Promise(resolve => {
        setTimeout(() => {
            isFunction(f) && f()
            resolve(`done in ${ms}`)
        }, ms)
    })
}

const playWithForAsync = async (asyncQueue = [delay(50)]) => {
    console.log(asyncQueue, 'asyncQueue')
    for await (const asyncF of asyncQueue) {
        console.log(asyncF, isFunction(asyncF), 123)
        console.log(123)
    }
}

// ====================
// play the game
// ====================
const goThoughDeepNestedObject = (
    obj = {
        a: 1,
        b: 2,
        c: 3,
        d: {
            a: 1,
            b: 2,
            c: 3,
            d: [1, 2, 3],
            t: {
                a: 3,
            },
        },
    }
) => logObjKey(obj)

const playWithPromiseTimeout = () => {
    let i = 0
    const log = str => {
        i++
        console.log(str, i)
    }

    setTimeout(() => {
        log('timeout 0')
        new Promise((resolve, reject) => resolve(log('promise 2 1')))
    }, 0)

    setTimeout(() => {
        log('timeout 2 0')
        new Promise((resolve, reject) => resolve(log('promise 2 2 0')))
    }, 10)

    setTimeout(() => {
        log('timeout 2 1')
        new Promise((resolve, reject) => resolve(log('promise 2 2 1')))
    }, 10)

    new Promise((resolve, reject) => resolve(log('promise 0')))

    new Promise((resolve, reject) => resolve(log('promise 1'))).then(() => {
        new Promise((resolve, reject) => resolve(log('promise 2')))
    })
}

const playWithCurryCustomAndNative = () => {
    const sum2 = curry(sum, [2])
    console.log(sum2)
    console.log(sum2(5))
    console.log(sum2(50))

    let UserObj = { first: 'Jane', last: 'Doe' }

    for (let [key, value] of objectEntries(UserObj)) {
        console.log(`${key}: ${value}`)
    }

    console.log([...objectEntries(UserObj)])

    try {
        console.log([...UserObj])
    } catch (e) {
        logError(e, 'this is en error')
        console.log()
    }

    const UserObjUpdated = Object.assign(UserObj, {
        hi: 'hello from real world RM',

        [Symbol.iterator]: function*() {
            for (const value of Object.values(this)) {
                yield value //may extend this to your needs
            }
        },
    })

    console.log(UserObjUpdated)
}

async function promiseConsequently() {
    const myArray = [...Array(12).keys()]

    const sleep = ms =>
        new Promise(res => {
            setTimeout(res, ms)
        })

    const myPromise = num =>
        sleep(500).then(() => {
            console.log('done: ' + num)
            return num
        })

    // const forEachSeries = async (iterable, action) => {
    //     for (const x of iterable) {
    //         await action(x)
    //     }
    // }

    // forEachSeries(myArray, myPromise).then(() => {
    //     console.log('all done!')
    // })

    const result = await myArray.reduce(
        async (prevPromise, nextPromise, index) => {
            let [prev, next] = await Promise.all([prevPromise, nextPromise])
            await sleep(500)
            console.log(prev, next)

            // prevPromise.push.result
            // return prevPromise
            return Promise.resolve([...prev, next])
        },
        Promise.resolve([])
    )

    console.log(result)
}

;(() => {
    // goThoughDeepNestedObject()

    // playWithCurryCustomAndNative()

    // await playWithForAsync([
    //     delay(1250),
    //     delay(1250),
    //     delay(1250),
    //     delay(1250),
    //     delay(1250),
    // ])

    promiseConsequently()
})()
