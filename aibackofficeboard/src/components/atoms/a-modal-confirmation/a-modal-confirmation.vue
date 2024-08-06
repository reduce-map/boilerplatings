<template>
    <a-modal
        class="a-modal-confirmation"
        :width="300"
        :name="name"
        @onClose="onClose"
    >
        <Icon class="icon" type="md-close" @click="onClose" />
        <div class="holder">
            <slot name="default" />
        </div>

        <div class="btn-holder">
            <a-button-cancel class="btn" @click.native="$emit('cancel')">
                No
            </a-button-cancel>
            <a-button-confirm class="btn" @click.native="$emit('confirm')">
                Yes
            </a-button-confirm>
        </div>
    </a-modal>
</template>

<script>
import AModal from '@atoms/a-modal'
import AButtonCancel from '@atoms/a-button-cancel'
import AButtonConfirm from '@atoms/a-button-confirm'
import { Icon } from 'view-design'

export default {
    name: 'AModalConfirmation',
    components: {
        AModal,
        Icon,
        AButtonCancel,
        AButtonConfirm,
    },
    props: {
        name: {
            type: String,
            required: true,
        },
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

<style>
.a-modal-confirmation .holder .scroll-area {
    height: auto !important;
}
</style>
