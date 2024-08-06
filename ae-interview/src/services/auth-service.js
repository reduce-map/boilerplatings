import BaseService from './base-service.js'

export default {
    async auth(apiKey) {
        // try {
        const { data } = await BaseService.post(`/auth`, { apiKey })
        return data
        // } catch (err) {
        //     throw new Error('error auth ')
        // }
    },
}
