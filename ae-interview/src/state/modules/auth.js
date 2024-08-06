import AuthService from '@/services/auth-service.js'
import { getSavedState, saveState } from '@/utils/auth.js'

const apiKey = '23567b218376f79d9415'

export const state = {
    token: getSavedState('auth.token'),
    auth: !!getSavedState('auth.token'),
}

export const mutations = {
    SET_TOKEN(state, { token, auth }) {
        state.token = token
        state.auth = auth
        saveState('auth.token', token)
    },
}

export const getters = {
    token: state => state.token,
    auth: state => state.auth,
}

export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    async init({ getters, dispatch }) {
        await dispatch('auth')
    },
    async auth({ commit }) {
        const { auth, token } = await AuthService.auth(apiKey)
        commit('SET_TOKEN', { token, auth })
    },
}
