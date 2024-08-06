export const state = {
    error: '',
    info: '',
}

export const mutations = {
    SET_ERROR(state, error) {
        state.error = error
    },
    SET_INFO(state, info) {
        state.info = info
    },
    RESET_ERROR: state => (state.error = ''),
    RESET_INFO: state => (state.info = ''),
}

export const getters = {
    error: state => state.error,
    info: state => state.info,
}

export const actions = {
    setError({ commit }, error) {
        commit('SET_ERROR', error)
        setTimeout(() => {
            commit('RESET_ERROR', '')
        }, 20)
    },
    setInfo({ commit }, info) {
        commit('SET_INFO', info)
        setTimeout(() => {
            commit('RESET_INFO', '')
        }, 20)
    },
}
