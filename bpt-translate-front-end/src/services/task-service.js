import BaseService from './base-service.js'

export default {
    // Add task to project
    createTask({ projectUuid, data }) {
        const resource = `/projects/${projectUuid}/tasks`
        return BaseService.post(`${resource}`, data).then(resp => resp.data)
    },
    // Get project tasks
    getProjectTasks({ projectUuid, params }) {
        const resource = `/projects/${projectUuid}/tasks`
        return BaseService.get(`${resource}`, {
            params,
        }).then(resp => resp.data)
    },
    // Edit Task on project
    editTask({ projectUuid, taskUuid, data }) {
        const resource = `/projects/${projectUuid}/tasks/${taskUuid}`
        return BaseService.put(`${resource}`, data).then(resp => resp.data)
    },
    // Delete task from project
    deleteTask({ projectUuid, taskUuid }) {
        const resource = `/projects/${projectUuid}/tasks/${taskUuid}`
        return BaseService.delete(`${resource}`).then(resp => resp.data)
    },
    // Return task
    getTask({ projectUuid, taskUuid }) {
        const resource = `/projects/${projectUuid}/tasks/${taskUuid}`
        return BaseService.get(`${resource}`).then(resp => resp.data)
    },
}
