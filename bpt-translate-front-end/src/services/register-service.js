import BaseService from './base-service.js'

export default {
    // Start registration process for new users
    register(data) {
        const resource = '/register'
        return BaseService.post(`${resource}`, data).then(resp => resp.data)
    },

    // Check verification code sended to user
    verify(data) {
        const resource = '/register/verify'

        return BaseService.post(`${resource}`, data).then(resp => resp.data)
    },

    // Set password for user
    setPassword({ userUuid, password }) {
        const resource = `/users/${userUuid}/password`

        return BaseService.post(`${resource}`, { password }).then(
            resp => resp.data
        )
    },
}
