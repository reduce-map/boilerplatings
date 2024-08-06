import axios from 'axios'
// import LoginService from '@services/login-service.js'
import { getSavedState, saveState } from '@utils/user-info.js'

export const state = {
    authToken: getSavedState('auth.authToken'),
    userUuid: getSavedState('auth.userUuid'),
    userRole: getSavedState('auth.userRole'),
}

export const mutations = {
    // here we got user token and information
    SET_AUTH(state, { userUuid, authToken, userRole }) {
        state.userUuid = userUuid
        state.authToken = authToken
        state.userRole = userRole

        saveState('auth.authToken', authToken)
        saveState('auth.userUuid', userUuid)
        saveState('auth.userRole', userRole)

        setDefaultAuthHeaders(state)
    },
}

export const getters = {
    // Whether the user is currently logged in.
    loggedIn(state) {
        //TODO ask BE correct validation. DO we need role here?
        return !!state.authToken && !!state.userUuid
    },
    userUuid(state) {
        //TODO ask BE correct validation. DO we need role here?
        return state.userUuid
    },
}

export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    init({ state }) {
        setDefaultAuthHeaders(state)

        // TODO BE do we need validate here
        // dispatch('validate')
    },

    // Logs in the current user.
    // logIn({ commit, getters }, data) {
    // if (getters.loggedIn) return dispatch('validate')
    // if (getters.loggedIn) return

    // return LoginService.post(data).then(user => {
    //     commit('SET_CURRENT_USER', user)
    //
    //     const {
    //         access_token,
    //         info: { role },
    //     } = user
    //
    //     saveState('auth.currentUser', user)
    //     saveState('auth.role', role)
    //     saveState('auth.token', access_token)
    //
    //     return user
    // })
    // },

    setAuth({ commit }, data) {
        commit('SET_AUTH', data)
    },

    // Logs out the current user.
    logOut({ commit }) {
        const userUuid = ''
        const authToken = ''
        const userRole = ''

        commit('SET_AUTH', {
            userUuid,
            authToken,
            userRole,
        })
        saveState('auth.authToken', authToken)
        saveState('auth.userUuid', userUuid)
    },

    // Validates the current user's token and refreshes it
    // with new data from the API.
    validate({ commit, state }) {
        // TODO do we need validate this about
        console.log(commit, state)
        // if (!state.currentUser) return Promise.resolve(null)

        // return axios
        //     .get('/api/session')
        //     .then((response) => {
        //         const user = response.data
        //         commit('SET_CURRENT_USER', user)
        //         return user
        //     })
        //     .catch((error) => {
        //         if (error.response && error.response.status === 401) {
        //             commit('SET_CURRENT_USER', null)
        //         } else {
        //             console.warn(error)
        //         }
        //         return null
        //     })
    },
}

// ===
// Private helpers
// ===

function setDefaultAuthHeaders(state) {
    axios.defaults.headers.common.Authorization = state.authToken
        ? state.authToken
        : ''
}
