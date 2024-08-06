import { Role } from '@/constants/role.js'
const meta = { authorize: [Role.user, Role.root] }

export default [
    {
        path: '/',
        meta,
        component: () => import('@pages/p-base'),
        children: [
            {
                path: '',
                name: 'home',
                meta,
                component: () => import('@pages/p-home'),
            },
            {
                path: '/products',
                name: 'products',
                meta,
                component: () => import('@pages/p-products'),
            },
            {
                path: '/sales',
                name: 'sales',
                component: () => import('@pages/p-sales'),
                meta,
            },
            {
                path: '/categories',
                name: 'categories',
                component: () => import('@pages/p-categories'),
                meta,
            },
            {
                path: '/devices',
                name: 'devices',
                component: () => import('@pages/p-devices'),
                meta,
            },
        ],
    },
    {
        path: '*',
        component: () => import('@pages/p-home'),
        meta,
    },
]
