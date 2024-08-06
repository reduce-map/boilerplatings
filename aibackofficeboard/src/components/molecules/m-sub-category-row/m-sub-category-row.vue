<template>
    <div class="m-sub-category-row">
        <div class="holder">
            <slot>
                category row
            </slot>
        </div>
        <div class="btns-holder">
            <a-button-action
                class="btn"
                type="edit"
                @click.native="$emit('edit', subCategory)"
            />
            <a-button-action
                class="btn"
                type="delete"
                @click.native="$emit('more', subCategory)"
            />
            <a-button-action
                class="btn"
                type="more"
                @click.native="$emit('more', subCategory)"
            />
        </div>
    </div>
</template>

<script>
import AButtonAction from '@atoms/a-button-action'

export default {
    name: 'MSubCategoryRow',
    components: {
        AButtonAction,
    },
    props: {
        subCategory: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
