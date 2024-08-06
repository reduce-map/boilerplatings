<template>
    <div class="t-base">
        <header id="header">
            <o-header-main />
        </header>
        <main>
            <router-view class="view-holder" />
        </main>
    </div>
</template>

<script>
import OHeaderMain from '@organisms/o-header-main'

export default {
    name: 'TBase',
    components: {
        OHeaderMain,
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
