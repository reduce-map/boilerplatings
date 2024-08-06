import BaseService from './base_service.js'
const baseUrlText = '/text'

export default {
    async getListTexts() {
        try {
            const { data } = await BaseService.get(`${baseUrlText}`)
            return data
        } catch (err) {
            throw new Error('error get text lists ')
        }
    },
    async saveText({ text }) {
        try {
            const { data } = await BaseService.post(`/text`, {
                text,
            })
            return data
        } catch (err) {
            throw new Error('error save text ')
        }
    },
    async getTextById(textId) {
        try {
            const { data } = await BaseService.get(`${baseUrlText}/${textId}`)
            return data
        } catch (err) {
            throw new Error('error get text by id ')
        }
    },
    async findSimilarSentences(textId, sentence_id) {
        try {
            const { data } = await BaseService.get(
                `${baseUrlText}/${textId}/${sentence_id}/similar`
            )
            return data
        } catch (err) {
            throw new Error('error find similar sentences ')
        }
    },
}
