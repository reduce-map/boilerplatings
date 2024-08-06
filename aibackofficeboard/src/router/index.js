import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import NProgress from 'nprogress'
import { getSavedState } from '@utils/auth'
import { Role } from '@/constants/role.js'

Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    // Use the HTML5 history API (i.e. normal-looking routes)
    // instead of routes with hashes (e.g. example.com/#/about).
    // This may require some server configuration in production:
    // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
    mode: 'history',
})

const getRole = () => {
    const user = getSavedState('auth.user')

    return user && user.roles && user.roles[0]
}

router.beforeEach((to, from, next) => {
    // If this isn't an initial page load...
    if (from.name !== null) {
        // Start the route progress bar.
        NProgress.start()
    }

    const { authorize } = to.meta
    const authRequired = authorize && authorize.length > 0

    const isTokenExists = !!getSavedState('auth.boAuthToken')
    const role = getRole()

    if (authRequired) {
        if (!isTokenExists || !role || !authorize.includes(role)) {
            // not logged in so redirect to login page with the return url
            return next({ path: '/login', query: { returnUrl: to.path } })
        }

        // check if route is restricted by role
        if (authorize.length && !authorize.includes(role)) {
            // role not authorised so redirect to home page
            if (role === Role.user) {
                next({ name: 'user-main' })
            }

            return next()
        }
    }

    next()
})

router.afterEach(() => {
    // Done the route progress bar.
    NProgress.done()
})

export default router
