<template>
    <div class="t-devices">
        <div class="page-center-wrapper">
            <o-devices-grid />
        </div>
    </div>
</template>

<script>
import ODevicesGrid from '@organisms/o-devices-grid'

export default {
    name: 'TDevices',
    components: {
        ODevicesGrid,
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
