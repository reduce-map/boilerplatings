<template>
    <h1 class="a-logo">
        <template v-if="isLink">
            <router-link
                :to="{
                    name: 'home',
                }"
            >
                AI BackOffice
            </router-link>
        </template>
        <template v-else>
            AI BackOffice
        </template>
    </h1>
</template>

<script>
export default {
    name: 'ALogo',
    props: {
        isLink: {
            type: Boolean,
            default: true,
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
