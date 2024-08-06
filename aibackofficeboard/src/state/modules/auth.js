import axios from 'axios'
import LoginService from '@services/login-service.js'
import { getSavedState, saveState } from '@utils/auth.js'

export const state = {
    boAuthToken: getSavedState('auth.boAuthToken'),
    user: getSavedState('auth.user'),
}

export const mutations = {
    // here we got user token and information
    SET_CURRENT_USER(state, { boAuthToken, user }) {
        state.boAuthToken = boAuthToken
        state.user = user

        saveState('auth.boAuthToken', `${boAuthToken}`)
        saveState('auth.user', user)

        setDefaultAuthHeaders(state)
    },
}

export const getters = {
    // Whether the user is currently logged in.
    loggedIn(state) {
        return !!state.boAuthToken
    },
    userName(state) {
        const { firstName, lastName } = state.user
        return `${firstName} ${lastName}`
    },
}

export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    init({ state }) {
        setDefaultAuthHeaders(state)

        // turn on if validation needed
        // dispatch('validate')
    },

    // Logs in the current user.
    logIn({ commit }, data) {
        // turn on if validation needed
        // if (getters.loggedIn) return dispatch('validate')

        return LoginService.post(data).then(user => {
            commit('SET_CURRENT_USER', user)

            return user
        })
    },

    // Logs out the current user.
    logOut({ commit }) {
        const boAuthToken = null
        const user = null

        commit('SET_CURRENT_USER', {
            boAuthToken,
            user,
        })

        saveState('auth.boAuthToken', boAuthToken)
        saveState('auth.user', user)
    },
}

// ===
// Private helpers
// ===

function setDefaultAuthHeaders(state) {
    axios.defaults.headers.common.Authorization = state.boAuthToken
        ? `Bearer ${state.boAuthToken}`
        : ''
}
