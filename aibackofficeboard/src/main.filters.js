import Vue from 'vue'
import moment from 'moment'

// define global filters
// date filters

// example output: moment(new Date()).format('HH:mm') - "16:33"
Vue.filter('time', function(date) {
    const md = moment(date)
    if (!date || !md) return ''

    return md.format('HH:mm')
})

Vue.filter('timeFull', function(date) {
    const md = moment(date)
    if (!date || !md) return ''

    return md.format('HH:mm:ss')
})

// example output: moment(new Date()).format('D MMMM YYYY') - "28 October 2019"
Vue.filter('dayFull', function(date) {
    const md = moment(date)
    if (!date || !md) return ''

    return md.format('D MMMM YYYY')
})

// example output: moment(new Date()).format('D MMMM YY') - "28.10.1990"
Vue.filter('dayFullNumbers', function(date) {
    const md = moment(date)
    if (!date || !md) return ''

    return md.format('DD.MM.YYYY')
})

// example output: moment(new Date()).format('D MMMM YY') - "28.10.1990"
Vue.filter('dayFullNumbers2', function(date) {
    const md = moment(date)
    if (!date || !md) return ''

    return md.format('DD.MM.YY')
})

// example output: moment(new Date()).format("DD.MM.YYYY, HH:mm") - "16:34:20"
Vue.filter('timeFull', function(date) {
    const md = moment(date)
    if (!date || !md) return ''

    return md.format('HH:mm:ss')
})

// example output: moment(new Date()).format("DD.MM") - "28.10"
Vue.filter('day', function(date) {
    const md = moment(date)
    if (!date || !md) return ''

    return md.format('DD.MM')
})
