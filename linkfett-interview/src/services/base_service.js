import axios from 'axios'

import BaseInterceptors from './interseptors/base_interseptors'

// logic to set your local or production domain
const baseDomain = `${process.env.VUE_APP_BASE_URL}`
const baseURL = `${baseDomain}`

const axiosInstance = axios.create({
    baseURL,
})
BaseInterceptors.use(axiosInstance)

export default axiosInstance
