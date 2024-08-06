import axios from 'axios'

import { applySimpleErrorNotificationHandler } from './interseptors'

// logic to set base url
const baseDomain = `${process.env.VUE_APP_WEATHER_URL}`
const baseURL = `${baseDomain}`

const WeatherService = axios.create({
    baseURL,
})
applySimpleErrorNotificationHandler(WeatherService)

export default {
    async getWeather(url, params = {}) {
        const { data } = await WeatherService.get(`${url}`, {
            params,
        })
        return data
    },
}
