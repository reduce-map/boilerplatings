---
to: src/components/organisms/o-<%= name %>/o-<%= name %>.vue
---
<template>
    <div class="o-<%= name %>">

    </div>
</template>

<script>
// import M<%= h.changeCase.pascalCase( name ) %> from '@molecules/m-<%= name %>'

export default {
    name: 'O<%= h.changeCase.pascalCase( name ) %>',
    components: {
        // M<%= h.changeCase.pascalCase( name ) %>,
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
