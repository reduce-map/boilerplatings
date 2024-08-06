import axios from 'axios'
import { getToken } from '@/api/token'
import NProgress from 'nprogress'

const instance = axios.create({
    baseURL: 'http://localhost:8081',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getToken(),
        'Access-Control-Allow-Origin': '*'
    }
})

instance.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        NProgress.start()
        // console.log(
        //     `url ${config.baseURL}/${config.url} `,
        //     'config ',
        //     config,
        //     'config.data ',
        //     config.data
        // )
        return config
    },
    function(error) {
        console.log('error', error)
        NProgress.done()
        // Do something with request error
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    function(response) {
        // Do something before request is sent
        NProgress.done()
        // console.log(
        //     `url ${response.request.responseURL} `,
        //     'response ',
        //     response,
        //     'response.data ',
        //     response.data
        // )
        return response
    },
    function(error) {
        NProgress.done()
        console.log('error', error)
        // Do something with request error
        return Promise.reject(error)
    }
)

export default instance
