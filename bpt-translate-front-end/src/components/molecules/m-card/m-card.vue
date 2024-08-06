<template>
    <div class="m-card">
        <div class="title-card">
            {{ title }}
        </div>
        <a-list
            v-for="item in list"
            :key="item.vueKey"
            class="list"
            v-bind="{
                ...item,
            }"
        />
    </div>
</template>

<script>
import AList from '@atoms/a-list'

export default {
    name: 'MCard',
    components: {
        AList,
    },

    props: {
        title: {
            type: String,
            required: true,
        },
        list: {
            type: Array,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
