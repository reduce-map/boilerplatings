import store from '@state/store'

const errorResponseHandler = ({
    response: {
        data: { message },
    },
}) => {
    store.dispatch('notifications/setError', {
        message,
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
