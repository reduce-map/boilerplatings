<template>
    <div class="a-avatar" :style="styleObject">
        <img v-if="url" src="url" alt="avatar" />
        <div v-else-if="fullName" class="avatar-placeholder">
            {{ letters }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'AAvatar',
    props: {
        url: {
            type: String,
            default: '',
        },
        fullName: {
            type: String,
            default: '',
        },
        styleObject: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        letters() {
            const [name, surname] = this.fullName.split(' ')
            return `${name.slice(0, 1)}${surname.slice(0, 1)}`
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
