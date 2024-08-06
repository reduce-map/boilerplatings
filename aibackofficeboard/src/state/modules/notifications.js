export const state = {
    error: {},
    info: {},
}

export const mutations = {
    SET_ERROR(state, error) {
        state.error = error
    },
    SET_INFO(state, info) {
        state.info = info
    },
}

export const getters = {
    error(state) {
        return state.error
    },
    info(state) {
        return state.info
    },
}

export const actions = {
    setError({ commit }, error) {
        commit('SET_ERROR', error)
    },
    setInfo({ commit }, info) {
        commit('SET_INFO', info)
    },
}
