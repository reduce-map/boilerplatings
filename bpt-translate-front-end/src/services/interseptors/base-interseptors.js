import store from '@state/store'

const errorResponseHandler = error => {
    store.dispatch('notifications/setError', {
        error: error.response,
    })
}

const applyBaseInterceptors = axiosInstance => {
    axiosInstance.interceptors.response.use(
        response => response,
        errorResponseHandler
    )
}

export default {
    use(axiosInstance) {
        applyBaseInterceptors(axiosInstance)
    },
}
