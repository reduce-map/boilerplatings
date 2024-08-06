import axios from 'axios'
import BaseInterceptors from './interseptors/base-interseptors'

// logic to set your local or production domain
const baseDomain = 'http://localhost:3000'
const baseURL = `${baseDomain}/api/v1`

const baseMockDomain = '/api'
const baseMockURL = `${baseMockDomain}`

const axiosInstance = axios.create({
    baseURL,
})
BaseInterceptors.use(axiosInstance)

export const MockApi = axios.create({
    baseURL: baseMockURL,
})

export default axiosInstance
