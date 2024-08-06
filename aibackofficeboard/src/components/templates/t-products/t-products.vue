<template>
    <div class="t-products">
        <div class="page-center-wrapper">
            <o-products-grid />
        </div>
    </div>
</template>

<script>
import OProductsGrid from '@organisms/o-products-grid'

export default {
    name: 'TProducts',
    components: {
        OProductsGrid,
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
