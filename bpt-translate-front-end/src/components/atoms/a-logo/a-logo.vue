<template>
    <div class="a-logo">
        <template v-if="isLogin">
            <img src="@assets/logo.png" alt="logo" />
            <h1>Translate center</h1>
        </template>
        <template v-else>
            <router-link to="/" class="logo-link">
                <img v-if="!isMain" src="@assets/logo.png" alt="logo" />
                <img v-if="isMain" src="@assets/logo-main.png" alt="logo" />
                <h1>Translate center</h1>
            </router-link>
        </template>
    </div>
</template>

<script>
export default {
    name: 'ALogo',
    props: {
        isLogin: {
            type: Boolean,
            default: false,
        },
        isMain: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
