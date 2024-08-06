---
to: src/components/templates/t-<%= name %>.vue
---
<template>
    <div class="$style.wrapper">
        <header class="header">
            <h1>Template <%= name %> page</h1>
        </header>
        <aside class="sidenav">
            <p>aside</p>
        </aside>
        <main class="main">
            <h1>Aside</h1>
        </main>
        <footer class="footer" />
    </div>
</template>

<script>
import OComponent from '@organisms/OComponent.vue'

export default {
    name: 'T<%= Name %>',
    components: {
        OComponent
    },
    props: {
        data: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style lang="scss" module>
@import '@design';

.wrapper {
    @extend %typography-small;
    padding: $size-button-padding;
    color: $color-button-text;
    background: $color-button-bg;
}
</style>
