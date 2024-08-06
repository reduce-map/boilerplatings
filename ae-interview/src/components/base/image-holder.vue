<template>
    <div class="image-holder">
        <img :src="src" :alt="alt" />
    </div>
</template>

<script>
export default {
    name: 'TextSentencesListItem',
    props: {
        src: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            default: 'image',
        },
    },
}
</script>

<style scoped>
img {
    width: 100%;
    height: auto;
    vertical-align: top;
}
</style>
