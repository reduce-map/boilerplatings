import BaseService from './base-service.js'

export default {
    login(data) {
        const resource = '/login'
        return BaseService.post(`${resource}`, data).then(resp => resp.data)
    },

    logout() {
        const resource = '/logout'
        return BaseService.post(`${resource}`).then(resp => resp.data)
    },
}
