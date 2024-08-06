export const state = {
    tags: [],
    resources: [],
}

export const mutations = {
    SET_TAGS(state, { tags }) {
        state.tags = tags
    },
    SET_RESOURCES(state, { resources }) {
        state.resources = resources
    },
}

export const getters = {
    tags(state) {
        return state.tags
    },
    resources(state) {
        return state.resources
    },
}

export const actions = {
    setTags({ commit }, payload) {
        commit('SET_TAGS', payload)
    },
    setResources({ commit }, payload) {
        commit('SET_RESOURCES', payload)
    },
}
