import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta' // https://github.com/declandewet/vue-meta
import NProgress from 'nprogress'

import routes from './routes'
import { Role } from '@/constants/role.js'
import { getSavedState } from '@utils/user-info.js'

Vue.use(VueRouter)
Vue.use(VueMeta, {
    // The component option name that vue-meta looks for meta info on.
    keyName: 'page',
})

const router = new VueRouter({
    routes,
    // Use the HTML5 history API (i.e. normal-looking routes)
    // instead of routes with hashes (e.g. example.com/#/about).
    // This may require some server configuration in production:
    // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
    mode: 'history',

    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }

        return { x: 0, y: 0 }
    },
})
// TODO add to another file
router.beforeEach((to, from, next) => {
    // If this isn't an initial page load...
    if (from.name !== null) {
        // Start the route progress bar.
        NProgress.start()
    }

    const { authorize } = to.meta
    const authRequired = authorize && authorize.length > 0
    const isTokenExists = !!getSavedState('auth.authToken')
    const role = getSavedState('auth.userRole')

    if (authRequired) {
        if (!isTokenExists || !role || !authorize.includes(role)) {
            // not logged in so redirect to login page with the return url
            return next({ path: '/login', query: { returnUrl: to.path } })
            // return next({ path: '/login' })
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
    NProgress.done()
})

export default router
