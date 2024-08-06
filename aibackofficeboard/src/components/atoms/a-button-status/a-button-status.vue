<template>
    <span class="a-button-status" :class="type.toLowerCase()">
        {{ type }}
    </span>
</template>

<script>
export default {
    name: 'AButtonStatus',
    props: {
        type: {
            type: String,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
