---
to: src/components/atoms/a-<%= name %>/a-<%= name %>.vue
---
<template>
    <div class="a-<%= name %>">

    </div>
</template>

<script>
export default {
    name: 'A<%= h.changeCase.pascalCase( name ) %>',
    props: {
        value: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            default: '',
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onChange(value) {
            this.$emit('onChange', value)
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
