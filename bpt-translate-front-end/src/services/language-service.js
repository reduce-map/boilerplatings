import BaseService from './base-service.js'

export default {
    // Add language to project
    addLanguage({ projectUuid, data }) {
        const resource = `/projects/${projectUuid}/languages`
        return BaseService.post(`${resource}`, data).then(resp => resp.data)
    },

    // Get project languages
    getProjectLanguages({ projectUuid, params }) {
        const resource = `/projects/${projectUuid}/languages`
        return BaseService.get(`${resource}`, {
            params,
        }).then(resp => resp.data)
    },

    // Delete language from project
    deleteProjectLanguage({ projectUuid, langCode }) {
        const resource = `/projects/${projectUuid}/languages/${langCode}`
        return BaseService.delete(`${resource}`).then(resp => resp.data)
    },

    // Return all possible languages
    getLanguages({ params }) {
        const resource = `/languages`
        return BaseService.get(`${resource}`, {
            params,
        }).then(resp => resp.data)
    },
}
