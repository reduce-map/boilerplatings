<template>
    <i_progress class="a-progress-bar" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
import { Progress as i_progress } from 'view-design'
export default {
    name: 'AProgressBar',
    components: {
        i_progress,
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
