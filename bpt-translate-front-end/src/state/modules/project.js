export const state = {
    project: {},
}

export const mutations = {
    SET_PROJECT(state, { project }) {
        state.project = project
    },
}

export const getters = {
    project(state) {
        return state.project
    },
}

export const actions = {
    setProject({ commit }, payload) {
        commit('SET_PROJECT', payload)
    },
}
