<template>
    <div class="a-table-scroll">
        <div class="header">
            <slot name="header" />
        </div>
        <div class="body">
            <vue-custom-scrollbar
                class="scroll-area"
                :settings="settings"
                @ps-y-reach-end="onEnd"
            >
                <slot name="content" />
            </vue-custom-scrollbar>
        </div>
    </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'

export default {
    name: 'ATableScroll',
    components: {
        vueCustomScrollbar,
    },
    data() {
        return {
            settings: {
                maxScrollbarLength: 60,
            },
        }
    },
    methods: {
        onChange(value) {
            /**
             * Emitted when value was changed only with click. Payload: 'Boolean checkbox value'
             * @type { Event }
             */
            this.$emit('onChange', value)
        },
        async infiniteHandler($state) {
            // this.page += 1
            //
            // if (this.isLoaded && this.page > this.pagesTotal) {
            //     $state.complete()
            // }
            //
            // try {
            //     await this.loadProjectResources()
            //     $state.loaded()
            // } catch (err) {
            //     console.log(err)
            // }
            console.log($state)
        },
        onEnd() {
            console.log('onEnd')
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
