import BaseService from './base-service.js'

export default {
    // Return resource list
    getResources({ projectUuid, params }) {
        const resource = `projects/${projectUuid}/resources`
        return BaseService.get(`${resource}`, {
            params,
        }).then(resp => resp.data)
    },

    // Return resource list
    getResourceKey({ projectUuid, key, params }) {
        const resource = `projects/${projectUuid}/resources/${key}`
        return BaseService.get(`${resource}`, {
            params,
        }).then(resp => resp.data)
    },

    // Update resource primary info
    updateResourceInfo({ projectUuid, key, data }) {
        const resource = `projects/${projectUuid}/resources/${key}`
        return BaseService.put(`${resource}`, data).then(resp => resp.data)
    },

    // Update single resource
    updateResourceSingle({ projectUuid, langCode, key, data }) {
        const resource = `projects/${projectUuid}/${langCode}/resources/${key}`
        return BaseService.put(`${resource}`, data).then(resp => resp.data)
    },

    // Return resource list
    deleteResourceKey({ projectUuid, key }) {
        const resource = `projects/${projectUuid}/resources/${key}`
        return BaseService.delete(`${resource}`).then(resp => resp.data)
    },

    // Return tag list
    getResourcesTags({ projectUuid, params }) {
        const resource = `projects/${projectUuid}/resource-tags`
        return BaseService.get(`${resource}`, {
            params,
        }).then(resp => resp.data)
    },

    // Add resources
    addResources({ projectUuid, langCode, data }) {
        const resource = `projects/${projectUuid}/${langCode}/resources`
        return BaseService.post(`${resource}`, data).then(resp => resp.data)
    },
}
