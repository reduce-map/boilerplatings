import Auth from './modules/auth.js'
import User from './modules/user.js'
import Project from './modules/project.js'

export default [
    ...Auth,
    ...User,
    ...Project,

    // otherwise redirect to home
    { path: '*', redirect: '/' },
]
