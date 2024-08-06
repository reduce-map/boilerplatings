const meta = { authorize: [] }

export default [
    {
        path: '/login',
        name: 'login',
        meta,
        component: () => import('@pages/p-login'),
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        meta,
        component: () => import('@pages/p-forgot-password'),
    },
]
