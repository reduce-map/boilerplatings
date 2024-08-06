<template>
    <div class="a-row">
        <div class="label">
            <slot name="label" />
        </div>
        <slot name="default" />
    </div>
</template>

<script>
export default {
    name: 'ARow',
    props: {},
    methods: {
        onChange(value) {
            this.$emit('onChange', value)
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
