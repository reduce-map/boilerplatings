import UserService from '@services/user-service'
import { getSavedState } from '@utils/user-info.js'

export const state = {
    user: {},
}

export const mutations = {
    SET_PROFILE(state, user) {
        state.user = user
    },
}

export const getters = {
    user(state) {
        return state.user
    },
}

export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    async init({ dispatch }) {
        if (getSavedState('auth.userUuid')) {
            dispatch('getProfile')
        }
    },

    setProfile({ commit }, payload) {
        commit('SET_PROFILE', payload)
    },

    async getProfile({ dispatch }) {
        const profile = await UserService.getUserInfo({
            userUuid: getSavedState('auth.userUuid'),
        })

        dispatch('setProfile', profile)
    },
}
