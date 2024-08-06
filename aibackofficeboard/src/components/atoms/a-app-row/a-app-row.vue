<template>
    <div class="a-app-row">
        <div class="label">
            <slot name="label" />
        </div>
        <slot />
    </div>
</template>

<script>
export default {
    name: 'AAppRow',
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
