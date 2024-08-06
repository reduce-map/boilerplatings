import { Role } from '@/constants/role.js'

export default [
    {
        path: '/login',
        component: () => import('@pages/p-login'),
        meta: { authorize: [] },
        children: [
            {
                path: '',
                name: 'login',
                meta: { authorize: [] },
                component: () => import('@organisms/o-login'),
            },
        ],
    },
    {
        path: '/register',
        component: () => import('@pages/p-login'),
        meta: { authorize: [] },
        children: [
            {
                path: '',
                name: 'register',
                meta: { authorize: [] },
                component: () => import('@organisms/o-register'),
            },
        ],
    },
    {
        path: '/register/verify',
        props: route => {
            return {
                code: route.query.code,
                login: route.query.login,
            }
        },
        component: () => import('@pages/p-verify'),
    },
    {
        path: '/confirm/verify',
        props: route => {
            return {
                code: route.query.code,
                login: route.query.login,
                projectUuid: route.query.projectUuid,
            }
        },
        component: () => import('@pages/p-confirm'),
    },
    {
        path: '/recover/verify',
        props: route => {
            return {
                code: route.query.code,
                login: route.query.login,
            }
        },
        component: () => import('@pages/p-recover'),
    },
    {
        path: '/password-forgot',
        component: () => import('@pages/p-login'),
        children: [
            {
                path: '',
                name: 'password-forgot',
                component: () => import('@organisms/o-password-forgot'),
            },
        ],
    },
    {
        path: '/set-password',
        component: () => import('@pages/p-login'),
        meta: { authorize: [Role.user] },
        children: [
            {
                path: '',
                name: 'set-password',
                meta: { authorize: [Role.user] },
                component: () => import('@organisms/o-set-password'),
            },
        ],
    },
]
