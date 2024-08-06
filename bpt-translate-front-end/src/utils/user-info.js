import { Role } from '@/constants/role.js'

// locales actions
export function getLocale() {
    return window.localStorage.getItem('locale')
}

export function setLocale(locale) {
    window.localStorage.setItem('locale', locale)
}

export function deleteLocale() {
    window.localStorage.removeItem('locale')
}

// roles actions
export function getRole() {
    return window.localStorage.getItem('role')
}

export function setRole(role) {
    window.localStorage.setItem('role', role)
}

export function deleteRole() {
    window.localStorage.removeItem('role')
}

// roles
export function isOwner() {
    return getRole() === Role.owner
}

export function isAdmin() {
    return getRole() === Role.admin
}

export function isDeveloper() {
    return getRole() === Role.developer
}

export function isTranslator() {
    return getRole() === Role.translator
}

export function isUser() {
    return getRole() === Role.user
}

export function getSavedState(key) {
    try {
        return JSON.parse(window.localStorage.getItem(key))
    } catch (err) {
        console.log('error parse JSON ', err)
        return ''
    }
}

export function saveState(key, state) {
    window.localStorage.setItem(key, JSON.stringify(state))
}
