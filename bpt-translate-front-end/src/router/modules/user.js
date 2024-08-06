import { Role } from '@/constants/role.js'

export default [
    {
        path: '/',
        meta: { authorize: [Role.user] },
        component: () => import('@pages/p-base'),
        children: [
            {
                path: '',
                name: 'user-main',
                meta: { authorize: [Role.user] },
                component: () => import('@organisms/o-user-main'),
            },
            {
                path: 'related',
                name: 'user-related',
                meta: { authorize: [Role.user] },
                component: () => import('@organisms/o-user-members'),
            },
            {
                path: 'profile',
                name: 'user-profile',
                meta: { authorize: [Role.user] },
                component: () => import('@organisms/o-user-profile'),
            },
        ],
    },
]
