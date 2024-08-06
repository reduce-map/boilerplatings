import LanguageService from '@services/language-service'

export const state = {
    languages: [],
}

export const mutations = {
    SET_LANGUAGES(state, { items }) {
        state.languages = items
    },
}

export const getters = {
    languages(state) {
        return state.languages
    },
}

export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    async init({ dispatch }) {
        const { items } = await LanguageService.getLanguages({
            params: {
                // TODO ask BE regarding pageSize 10000
                pageSize: 10000,
            },
        })

        dispatch('setLanguages', {
            items,
        })
    },

    setLanguages({ commit }, payload) {
        commit('SET_LANGUAGES', payload)
    },
}
