<template>
    <div class="t-categories">
        <div class="page-center-wrapper">
            <o-categories />
        </div>
    </div>
</template>

<script>
import OCategories from '@organisms/o-categories'

export default {
    name: 'TCategories',
    components: {
        OCategories,
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
