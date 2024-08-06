<template>
    <div class="t-home">
        <div class="page-center-wrapper">
            <o-users-grid />
        </div>
    </div>
</template>

<script>
import OUsersGrid from '@organisms/o-users-grid'

export default {
    name: 'THome',
    components: {
        OUsersGrid,
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
