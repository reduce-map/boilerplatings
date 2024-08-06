<template>
    <div class="m-sub-sub-category-row">
        <div class="holder">
            <slot>
                sub sub category row
            </slot>
        </div>
        <div class="btns-holder">
            <a-button-action
                class="btn"
                type="edit"
                @click.native="$emit('edit', subSubCategory)"
            />
            <a-button-action
                class="btn"
                type="delete"
                @click.native="$emit('more', subSubCategory)"
            />
        </div>
    </div>
</template>

<script>
import AButtonAction from '@atoms/a-button-action'

export default {
    name: 'MSubSubCategoryRow',
    components: {
        AButtonAction,
    },
    props: {
        subSubCategory: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
