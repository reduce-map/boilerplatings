<template>
    <div class="a-button-time-range">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'AButtonTimeRange',
    methods: {
        onChange(value) {
            /**
             * Emitted when value was changed only with click. Payload: 'Boolean checkbox value'
             * @type { Event }
             */
            this.$emit('onChange', value)
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
