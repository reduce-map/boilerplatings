---
to: src/components/pages/p-<%= name %>/p-<%= name %>.vue
---
<template>
    <div class="p-<%= name %>">

    </div>
</template>

<script>
// import T<%= Name %> from '@templates/t-<%= name %>'

export default {
    name: 'P<%= Name %>',
    components: {
        // T<%= Name %>
    }
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
