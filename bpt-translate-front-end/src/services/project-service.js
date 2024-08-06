import BaseService from './base-service.js'

export default {
    // Start registration process for new users
    getProjects({ userUuid, params }) {
        const resource = `/users/${userUuid}/projects`
        return BaseService.get(`${resource}`, {
            params,
        }).then(resp => resp.data)
    },
    // Add new project
    createProject(data) {
        const resource = '/projects'
        return BaseService.post(`${resource}`, data).then(resp => resp.data)
    },
    // Delete project
    deleteProject({ userUuid }) {
        const resource = `/projects/${userUuid}`
        return BaseService.delete(`${resource}`).then(resp => resp.data)
    },
    // Update existing project
    updateProject({ projectUuid, data }) {
        const resource = `/projects/${projectUuid}`
        return BaseService.put(`${resource}`, data).then(resp => resp.data)
    },
}
