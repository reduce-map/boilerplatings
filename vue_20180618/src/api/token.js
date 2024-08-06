const getToken = () => {
    return window.localStorage.getItem('token')
}

const setToken = token => {
    window.localStorage.setItem('token', `Bearer ${token}`)
}

export { getToken, setToken }
