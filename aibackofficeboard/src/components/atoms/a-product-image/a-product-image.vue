<template>
    <img class="a-product-image" :src="src" alt="product-image" />
</template>

<script>
export default {
    name: 'AProductImage',
    props: {
        src: {
            type: String,
            default:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSmO-eOei3JQ5czXrU_FphkuFMX3vFQmUbRcKvZFHzfvanhjZvx',
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
