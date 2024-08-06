const getToken = () => {
    return window.localStorage.getItem('token')
}

const setToken = (access_token, token_type) => {
    window.localStorage.setItem('access_token', `${access_token}`)
    window.localStorage.setItem('token_type', `${token_type}`)
}

const deleteToken = () => {
    window.localStorage.removeItem('token_type')
    window.localStorage.removeItem('access_token')
}

export function getSavedState(key) {
    return JSON.parse(window.localStorage.getItem(key))
    // return window.localStorage.getItem(key)
}

export function saveState(key, state) {
    window.localStorage.setItem(key, JSON.stringify(state))
    // window.localStorage.setItem(key, state)
}

export default { getToken, setToken, deleteToken }
