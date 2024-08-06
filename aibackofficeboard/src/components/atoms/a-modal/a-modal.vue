<template>
    <modal
        v-bind="{
            width,
            name,
            height: 'auto',
        }"
        class="a-modal"
        @closed="onClose"
    >
        <div class="modal-holder">
            <div class="header">
                <slot name="header" />
                <div class="close" @click="onClose">
                    <span>CLOSE</span>

                    <Icon class="icon" type="md-close" />
                </div>
            </div>
            <div class="holder">
                <vue-custom-scrollbar class="scroll-area" :settings="settings">
                    <div class="wrapper">
                        <slot name="default" />
                    </div>
                </vue-custom-scrollbar>
            </div>
        </div>
    </modal>
</template>

<script>
import { Icon } from 'view-design'
import vueCustomScrollbar from 'vue-custom-scrollbar'

export default {
    name: 'AModal',
    components: {
        Icon,
        vueCustomScrollbar,
    },
    props: {
        /**
         * The name for the modal.
         */
        name: {
            type: String,
            required: true,
        },
        /**
         * The width for the modal.
         */
        width: {
            type: Number,
            default: 400,
        },
    },
    data() {
        return {
            settings: {
                maxScrollbarLength: 60,
            },
        }
    },
    methods: {
        onClose() {
            this.$modal.hide(this.name)
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>

<style lang="scss">
// HOT FIX overflow select cut
.v--modal-overlay .v--modal-box {
    overflow: visible !important;
}

.a-modal .scroll-area {
    max-height: calc(100vh - 200px) !important;
}

.a-modal .wrapper {
    padding-right: 20px;
}
</style>
