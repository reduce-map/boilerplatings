<template>
    <div id="app">
        <!--
    Even when routes use the same component, treat them
    as distinct and create the component again.
    -->
        <!--        <router-view :key="$route.fullPath" />-->
        <transition>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
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
