<template>
    <modal
        v-bind="{
            width,
            name,
            height: 'auto',
        }"
        @closed="onClose"
    >
        <div class="modal-holder">
            <i class="uil uil-multiply btn-close" @click="onClose" />

            <div class="holder">
                <slot name="default" />
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    name: 'AModal',
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
            default: 600,
        },
    },
    methods: {
        onClose() {
            /**
             * onClose event.
             *
             * @event click
             */
            this.$emit('onClose')
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
</style>
