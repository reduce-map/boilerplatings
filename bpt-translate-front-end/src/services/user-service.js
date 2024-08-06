import BaseService from './base-service.js'

//TODO ?
/* eslint no-irregular-whitespace: 0 */
/* eslint-disable no-irregular-whitespace */

export default {
    // Add user to project
    addUserToProject({ projectUuid, data }) {
        const resource = `/projects/${projectUuid}/users`
        return BaseService.post(`${resource}`, data).then(resp => resp.data)
    },
    // Get project users
    getProjectUsers({ projectUuid, params }) {
        const resource = `/projects/${projectUuid}/users`
        return BaseService.get(`${resource}`, {
            params,
        }).then(resp => resp.data)
    },
    // Confirm user in project
    confirmProjectUser({ projectUuid, data }) {
        const resource = `/projects/${projectUuid}/users/confirm`
        return BaseService.post(`${resource}`, data).then(resp => resp.data)
    },
    // Delete user from project
    deleteProjectUser({ projectUuid, userUuid }) {
        const resource = `/projects/${projectUuid}/users/${userUuid}`
        return BaseService.delete(`${resource}`).then(resp => resp.data)
    },
    // Return user list
    getUserList({ params }) {
        const resource = '/users'
        return BaseService.get(`${resource}`, {
            params,
        }).then(resp => resp.data)
    },
    // Return related user list
    getUserRelatedList({ userUuid, params }) {
        const resource = `/users/${userUuid}/related-users`
        return BaseService.get(`${resource}`, {
            params,
        }).then(resp => resp.data)
    },
    updateUserInfo({ userUuid, data }) {
        const resource = `/users/${userUuid}`
        return BaseService.put(`${resource}`, data).then(resp => resp.data)
    },
    getUserInfo({ userUuid }) {
        const resource = `/users/${userUuid}`
        return BaseService.get(`${resource}`).then(resp => resp.data)
    },
    // Get project user by uuid
    getProjectUser({ projectUuid, userUuid }) {
        const resource = `/projects/${projectUuid}/users/${userUuid}`
        return BaseService.get(`${resource}`).then(resp => resp.data)
    },
}
