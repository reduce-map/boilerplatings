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
    },
    methods: {
        onChange(value) {
            /**
             * Emitted when value was changed only with click. Payload: 'Boolean checkbox value'
             * @type { Event }
             */
            this.$emit('onChange', value)
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
