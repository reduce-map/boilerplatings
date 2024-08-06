<template>
    <ul class="m-nav-owner">
        <li>
            <router-link
                :to="{
                    name: 'project-main',
                    params: {
                        projectUuid,
                    },
                }"
            >
                <i class="uil uil-cog"></i>
                {{ $t('app.Project') }}
            </router-link>
        </li>
        <li>
            <router-link
                :to="{
                    name: 'project-statistic',
                    params: {
                        projectUuid,
                    },
                }"
            >
                <i class="uil uil-chart"></i>
                {{ $t('app.Project_statistics') }}
            </router-link>
        </li>
        <li>
            <router-link
                :to="{
                    name: 'project-resources',
                    params: {
                        projectUuid,
                    },
                }"
            >
                <i class="uil uil-package"></i>
                {{ $t('app.Resources') }}
            </router-link>
        </li>
        <li>
            <router-link
                :to="{
                    name: 'project-tasks',
                    params: {
                        projectUuid,
                    },
                }"
            >
                <i class="uil uil-schedule"></i>
                {{ $t('app.Tasks') }}
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'MNavOwner',
    computed: {
        projectUuid() {
            return this.$route.params.projectUuid
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
