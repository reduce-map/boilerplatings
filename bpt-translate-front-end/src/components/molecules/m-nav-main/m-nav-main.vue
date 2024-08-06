<template>
    <ul class="m-nav-main">
        <li>
            <router-link to="/">
                <i class="uil uil-users-alt"></i>
                {{ $t('nav.members') }}
            </router-link>
        </li>
        <li>
            <router-link to="/project-statistics">
                <i class="uil uil-chart"></i>
                {{ $t('nav.p_statistics') }}
            </router-link>
        </li>
        <li>
            <router-link to="/resources">
                <i class="uil uil-package"></i>
                {{ $t('nav.resources') }}
            </router-link>
        </li>
        <li>
            <router-link to="/tasks">
                <i class="uil uil-schedule"></i>
                {{ $t('nav.tasks') }}
            </router-link>
        </li>
        <li>
            <router-link to="/project-edit">
                <i class="uil uil-cog"></i>
                {{ $t('nav.p_edit') }}
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'MNavMain',
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
