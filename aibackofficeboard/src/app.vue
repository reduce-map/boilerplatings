<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view :key="$route.fullPath" />
        </transition>

        <o-notifications-api />
    </div>
</template>

<script>
import ONotificationsApi from '@organisms/o-notifications-api'

export default {
    name: 'App',
    components: {
        ONotificationsApi,
    },
}
</script>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">
@import 'theme';
</style>
