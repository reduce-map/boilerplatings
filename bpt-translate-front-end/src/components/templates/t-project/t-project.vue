<template>
    <div class="t-project">
        <template v-if="isLoaded">
            <t-owner v-if="isOwner" />

            <template v-if="isTranslator">
                isTranslator {{ isTranslator }}
                <br />
                {{ userData }}
            </template>

            <template v-if="isDeveloper">
                isDeveloper {{ isDeveloper }}
                <br />
                {{ userData }}
            </template>

            <template v-if="isAdmin">
                isAdmin {{ isAdmin }}
                <br />
                {{ userData }}
            </template>
        </template>
    </div>
</template>

<script>
import TOwner from '@templates/t-owner'
import { Role } from '@/constants/role.js'
import ProjectService from '@services/project-service'
import UserService from '@services/user-service'
import ResourceService from '@services/resource-service'

import {
    authComputed,
    projectMethods,
    projectComputed,
    resourcesMethods,
} from '@state/helpers'

export default {
    name: 'TProject',
    components: {
        TOwner,
    },
    data() {
        return {
            isLoaded: false,

            userData: {},
            projectData: {},
        }
    },
    computed: {
        ...authComputed,
        ...projectComputed,
        isOwner() {
            const userRole = this.userData.roles[0]
            return this.isLoaded && userRole === Role.owner
        },
        isTranslator() {
            const userRole = this.userData.roles[0]
            return this.isLoaded && userRole === Role.translator
        },
        isDeveloper() {
            const userRole = this.userData.roles[0]
            return this.isLoaded && userRole === Role.developer
        },
        isAdmin() {
            const userRole = this.userData.roles[0]
            return this.isLoaded && userRole === Role.admin
        },
        projectUuid() {
            return this.$route.params.projectUuid
        },
    },
    async created() {
        await this.fetch()
    },
    // clear project data when user leaves the project entry point (this template)
    beforeDestroy() {
        this.setProject({
            project: {},
        })
        this.setResources({
            resources: [],
        })
        this.setTags({
            tags: [],
        })
    },
    methods: {
        ...projectMethods,
        ...resourcesMethods,
        async fetch() {
            await Promise.all([
                this.loadUser(),
                this.loadProjectData(),
                // this.loadProjectResources(),
                this.loadProjectTags(),
            ])
            this.isLoaded = true
        },
        async loadUser() {
            try {
                this.userData = await UserService.getProjectUser({
                    projectUuid: this.projectUuid,
                    userUuid: this.userUuid,
                })
            } catch (err) {
                console.log(err)
            }
        },
        async loadProjectData() {
            const projects = await this.getProjects()
            const project = projects.filter(
                project => project.projectUuid === this.projectUuid
            )[0]

            this.projectData = project
            this.setProject({
                project,
            })
        },
        async loadProjectTags() {
            try {
                const { items } = await ResourceService.getResourcesTags({
                    projectUuid: this.projectUuid,
                    params: {
                        pageSize: 1000,
                    },
                })

                this.setTags({
                    tags: items,
                })
            } catch (err) {
                console.log(err)
            }
        },

        // use this method for debug
        // async loadProjectResources() {
        //     const { items } = await ResourceService.getResources({
        //         projectUuid: this.projectUuid,
        //         params: {
        //             pageSize: 1000,
        //         },
        //     })
        //
        //     this.setResources({
        //         resources: items,
        //     })
        // },

        // TODO ask BE - get Project Info by projectUuid
        async getProjects() {
            const { items } = await ProjectService.getProjects({
                userUuid: this.userUuid,
                params: {
                    pageSize: 1000,
                },
            })

            return items
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
