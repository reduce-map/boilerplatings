import api from './api'

export default {
    loadUsers() {
        return api.get('users').then(({ data }) => {
            // console.log('users were loaded -> ', data)
            return data
        })
    },
    loadUser(id) {
        return api.get(`users/${id}`).then(({ data }) => {
            return data
        })
    },
    loadUsersRange(start, end) {
        return api.get(`users?_start=${start}&_end=${end}`).then(({ data }) => {
            return data
        })
    },
    deleteUser(id) {
        return api.delete(`users/${id}`).then(() => {
            // .then(({ config: { url, method } }) => {
            // console.log('user was deleted -> url', url, ' method -> ', method)
            return id
        })
    },
    editUser(user) {
        return api.put(`users/${user.id}`, { ...user })
    },
    createUser(user) {
        return api.post(`users/`, { ...user }).then(({ data }) => {
            // console.log('user was created -> ', data)
            return data
        })
    }
}
