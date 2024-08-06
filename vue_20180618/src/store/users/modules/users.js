import api from '@/api/users'

const state = {
    users: [],
    searchQuery: ''
}

const mutations = {
    loadedUsers(state, users) {
        state.users = users
    },
    setQuery(state, query) {
        state.searchQuery = query
    }
}

const getters = {
    users: state => state.users,
    usersLength: state => state.users.length,
    searchQuery: state => state.searchQuery
}

const actions = {
    loadUsers({ commit }) {
        api.loadUsers().then(users => {
            commit('loadedUsers', users)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
