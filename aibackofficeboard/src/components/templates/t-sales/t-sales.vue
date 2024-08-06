<template>
    <div class="t-sales">
        <div class="page-center-wrapper">
            <o-sales-grid />
        </div>

        <o-sales-bar />
    </div>
</template>

<script>
import OSalesBar from '@organisms/o-sales-bar'
import OSalesGrid from '@organisms/o-sales-grid'

export default {
    name: 'TSales',
    components: {
        OSalesBar,
        OSalesGrid,
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
