import { Role } from '@/constants/role.js'

export default [
    {
        path: '/project',
        meta: { authorize: [Role.user] },
        component: () => import('@pages/p-base'),
        children: [
            {
                path: ':projectUuid',
                meta: { authorize: [Role.user] },
                component: () => import('@templates/t-project'),
                children: [
                    {
                        path: '',
                        name: 'project-main',
                        meta: { authorize: [Role.user] },
                        component: () => import('@organisms/o-project-main'),
                    },
                    {
                        path: 'statistic',
                        name: 'project-statistic',
                        meta: { authorize: [Role.user] },
                        component: () =>
                            import('@organisms/o-project-statistics'),
                    },
                    {
                        path: 'resources',
                        name: 'project-resources',
                        meta: { authorize: [Role.user] },
                        component: () =>
                            import('@organisms/o-project-resources'),
                    },
                    {
                        path: 'tasks',
                        meta: { authorize: [Role.user] },
                        component: () => import('@templates/t-task'),
                        children: [
                            {
                                path: '',
                                name: 'project-tasks',
                                meta: { authorize: [Role.user] },
                                component: () =>
                                    import('@organisms/o-project-tasks'),
                            },
                            {
                                path: ':taskId',
                                name: 'project-task-info',
                                meta: { authorize: [Role.user] },
                                component: () =>
                                    import('@organisms/o-project-task-info'),
                            },
                        ],
                    },
                ],
            },
        ],
    },
]
