export function getSavedState(key) {
    return JSON.parse(window.sessionStorage.getItem(key))
}

export function saveState(key, state) {
    window.sessionStorage.setItem(key, JSON.stringify(state))
}
