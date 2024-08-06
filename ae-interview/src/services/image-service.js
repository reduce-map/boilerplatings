import BaseService from './base-service.js'
const baseUrlText = '/images'

export default {
    async getImages(params) {
        // try {
        const { data } = await BaseService.get(`${baseUrlText}`, { params })
        return data
        // } catch (err) {
        //     throw new Error('error get images')
        // }
    },
    async getImageDetails(id) {
        // try {
        const { data } = await BaseService.get(`${baseUrlText}/${id}`)
        return data
        // } catch (err) {
        //     throw new Error('error get image details')
        // }
    },
}
