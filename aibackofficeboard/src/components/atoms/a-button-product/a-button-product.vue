<template>
    <div class="a-button-product">
        <slot name="default" />
        <span v-if="hasAmountSlot" class="amount">
            x<slot name="amount"></slot>
        </span>
    </div>
</template>

<script>
export default {
    name: 'AButtonProduct',
    computed: {
        hasAmountSlot() {
            return !!this.$slots['amount']
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
