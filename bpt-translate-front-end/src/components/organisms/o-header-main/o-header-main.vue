<template>
    <div class="o-header-main">
        <div class="app-side-bar">
            <a-logo class="logo-holder" is-main />
        </div>

        <m-header-nav :project="project" @log-out="onLogOut" />
    </div>
</template>

<script>
import ALogo from '@atoms/a-logo'
import MHeaderNav from '@molecules/m-header-nav'
import { authMethods, projectComputed } from '@state/helpers'

export default {
    name: 'OHeaderMain',
    components: {
        ALogo,
        MHeaderNav,
    },
    computed: {
        ...projectComputed,
    },
    methods: {
        ...authMethods,
        onLogOut() {
            this.logOut()
            this.$router.push({
                name: 'login',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
