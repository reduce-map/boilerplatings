import store from '@state/store'

export default [
    {
        path: '/',
        name: 'home',
        component: () => import('@pages/p-dashboard'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@pages/p-login'),
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@pages/p-profile'),
        meta: {
            authRequired: true,
        },
        props: () => ({ user: store.state.auth.currentUser || {} }),
    },
]
