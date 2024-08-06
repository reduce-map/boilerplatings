<template>
    <div class="a-avatar">
        <img :src="src" :width="width" />
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'AAvatar',
    props: {
        // TODO check path with alias
        src: {
            type: String,
            required: true,
        },
        width: {
            type: Number,
            default: 32,
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
