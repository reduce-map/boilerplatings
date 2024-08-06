<template>
    <button class="a-button" v-bind="$attrs">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'AButton',
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
