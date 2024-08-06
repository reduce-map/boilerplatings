---
to: src/components/molecules/m-<%= name %>/m-<%= name %>.vue
---
<template>
    <div class="m-<%= name %>">

    </div>
</template>

<script>
// import A<%= h.changeCase.pascalCase( name ) %> from '@atoms/A-<%= name %>'

export default {
    name: 'M<%= h.changeCase.pascalCase( name ) %>',
    components: {
        // A<%= h.changeCase.pascalCase( name ) %>,
    },
    props: {
        value: {
            type: Boolean,
            required: true,
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
