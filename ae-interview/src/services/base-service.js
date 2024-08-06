import axios from 'axios'

import applyInterceptors from './interseptors'

// logic to set base url
const baseDomain = `${process.env.VUE_APP_BASE_URL}`
const baseURL = `${baseDomain}`

const axiosInstance = axios.create({
    baseURL,
})
applyInterceptors(axiosInstance)

export default axiosInstance
