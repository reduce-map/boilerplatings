import BaseService from './base-service.js'

export default {
    getProjectStat({ params }) {
        const resource = '/stats/project-common'

        return BaseService.get(`${resource}`, {
            params,
        }).then(resp => resp.data)
    },
    getTaskStat({ params }) {
        const resource = '/stats/task-common'

        return BaseService.get(`${resource}`, {
            params,
        }).then(resp => resp.data)
    },
}
