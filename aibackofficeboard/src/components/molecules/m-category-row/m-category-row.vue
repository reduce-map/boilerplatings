<template>
    <div class="m-category-row">
        <div class="holder">
            <slot>
                category row
            </slot>
        </div>
        <div class="btns-holder">
            <a-button-action
                class="btn"
                type="edit"
                @click.native="$emit('edit', category)"
            />
            <a-button-action
                class="btn"
                type="more"
                @click.native="$emit('more', category)"
            />
        </div>
    </div>
</template>

<script>
import AButtonAction from '@atoms/a-button-action'

export default {
    name: 'MCategoryRow',
    components: {
        AButtonAction,
    },
    props: {
        category: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
