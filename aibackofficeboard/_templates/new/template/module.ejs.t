---
to: src/components/templates/t-<%= name %>/t-<%= name %>.vue
---
<template>

</template>

<script>
// import O<%= Name %> from '@organisms/o-<%= name %>'

export default {
    name: 'T<%= Name %>',
    components: {
        // O<%= h.changeCase.pascalCase( name ) %>,
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
