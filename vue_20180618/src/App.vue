<template>
    <div id="app">
        <app-nav />
        <div class="app-holder container-fluid">
            <!-- https://youtu.be/7lpemgMhi0k?t=1235 -->
            <!--<router-view :key="$route.fullPath" />-->
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    components: {
        'app-nav': () => import('@/components/Navigation.vue')
    }
}
</script>

<style lang="scss" src="./styles.scss" />
