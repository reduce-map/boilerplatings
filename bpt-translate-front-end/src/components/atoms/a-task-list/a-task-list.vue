<template>
    <div class="a-task-list">
        <div class="title">{{ title }}</div>
        <div class="description">
            {{ description }}
        </div>
        <div class="actions">
            <i class="uil uil-pen edit" @click="onEditClick" />

            <i class="uil uil-trash-alt delete" @click="onDeleteClick" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'ATaskList',
    props: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    methods: {
        onEditClick() {
            this.$emit('onEdit')
        },
        onDeleteClick() {
            this.$emit('onDelete')
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
