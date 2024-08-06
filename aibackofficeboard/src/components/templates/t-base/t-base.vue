<template>
    <div class="p-base">
        <o-header />

        <main>
            <transition name="fade" mode="out-in">
                <router-view />
            </transition>
        </main>
    </div>
</template>

<script>
import OHeader from '@organisms/o-header'

export default {
    name: 'TBase',
    components: {
        OHeader,
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
