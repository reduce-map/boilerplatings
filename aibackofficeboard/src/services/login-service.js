import BaseService from './base-service.js'

export default {
    post(data) {
        return BaseService.post('/auth/boLogin', data).then(resp => resp.data)
    },
}
