<template>
    <div class="t-owner">
        <nav id="nav" class="app-side-bar app-side-nav">
            <m-nav-owner :project-uuid="$route.params.projectUuid" />
        </nav>

        <router-view class="main" />
    </div>
</template>

<script>
import MNavOwner from '@molecules/m-nav-owner'

export default {
    name: 'TOwner',
    components: {
        MNavOwner,
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
