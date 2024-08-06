import store from '@/state/store'

const errorResponseHandler = error => {
    const errorMessage =
        error.response && error.response.data && error.response.data.detail
            ? error.response.data.detail
            : `There's an error`

    store.dispatch('notifications/setError', errorMessage)
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
