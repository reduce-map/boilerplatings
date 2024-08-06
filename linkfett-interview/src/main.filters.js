import Vue from 'vue'
import moment from 'moment'

// define global filters
// date filters

Vue.filter('time', function(date) {
    const md = moment(date)
    if (!date || !md) return ''

    return md.format('HH:mm')
})

Vue.filter('dayTime', function(date) {
    const md = moment(date)
    if (!date || !md) return ''

    return md.format('D MMMM YYYY HH:mm:ss')
})

Vue.filter('percentage', function(value, decimals) {
    if (!value) {
        value = 0
    }

    if (!decimals) {
        decimals = 3 // default decimals length would be 3
    }

    value = value * 100
    value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
    return `${value} %`
})
