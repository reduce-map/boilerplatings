import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import { getToken } from '@/api/token'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'HomePage',
            component: () => import('@/views/Home.vue')
        },
        {
            path: '/users',
            name: 'Users',
            component: () => import('@/views/Users.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/user/edit/:id',
            name: 'UserEdit',
            component: () => import('@/views/UserEdit.vue')
        },
        {
            path: '/user/create',
            name: 'UserCreate',
            component: () => import('@/views/UserCreate.vue')
        },
        {
            path: '/contacts',
            name: 'Contact',
            component: () => import('@/views/Contacts.vue')
        },
        {
            path: '/selectors',
            name: 'Selectors',
            component: () => import('@/views/Selectors.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    NProgress.start()

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // этот путь требует авторизации, проверяем залогинен ли
        // пользователь, и если нет, перенаправляем на страницу логина
        if (!getToken()) {
            next({
                path: '/login'
                // query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // всегда так или иначе нужно вызвать next()!
    }
})

router.afterEach(() => NProgress.done())

export default router
