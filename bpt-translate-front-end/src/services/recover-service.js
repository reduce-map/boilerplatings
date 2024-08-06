import BaseService from './base-service.js'

export default {
    // Start recover process for user
    recover(data) {
        const resource = '/recover'
        return BaseService.post(`${resource}`, data).then(resp => resp.data)
    },

    recoverVerify(data) {
        const resource = '/recover/verify'
        return BaseService.post(`${resource}`, data).then(resp => resp.data)
    },
}
