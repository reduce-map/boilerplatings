import axios from 'axios'
import store from '@/state/store'
import { Errors } from '@/constants'

const MAX_RETRIES = 3 // Максимальное количество попыток
const RETRY_DELAY = 1000 // Задержка в миллисекундах (1 секунда)
const retryCountMap = new Map()

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const errorNotificationHandler = resp => {
    const statusText = resp.response && resp.response.statusText
    const errorMessage = statusText ? statusText : Errors.defaultMessage
    store.dispatch('notifications/setError', errorMessage)
}

export const applySimpleErrorNotificationHandler = axiosInstance => {
    axiosInstance.interceptors.response.use(
        response => response,
        async error => {
            errorNotificationHandler(error)
            return Promise.reject(error)
        }
    )
}

export default function applyInterceptors(axiosInstance) {
    let errorCount = 0 // Счётчик неудачных попыток

    axiosInstance.interceptors.response.use(
        response => response,
        async error => {
            errorNotificationHandler(error)

            if (errorCount >= 2) {
                console.log('more than 2 errors')
                return Promise.reject(error)
            }

            errorCount += 1 // Увеличиваем счётчик ошибок

            await sleep(RETRY_DELAY) // Задержка перед повторной попыткой

            try {
                await store.dispatch('auth/auth') // Попытка обновить токен

                const config = error.config
                config.headers.Authorization = `Bearer ${store.getters['auth/token']}`

                return axios.request(config) // Повторяем запрос с обновленным токеном
            } catch (err) {
                return Promise.reject(error)
            }
        }
    )

    // Add a request interceptor
    axiosInstance.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${store.getters['auth/token']}`
        return config
    })

    return axiosInstance
}
