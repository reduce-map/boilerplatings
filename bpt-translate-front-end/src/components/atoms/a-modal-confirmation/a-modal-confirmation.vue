<template>
    <a-modal :width="430" :name="name" @onClose="onClose">
        <div class="holder">
            <slot name="default" />
        </div>

        <div class="btn-holder">
            <Button type="error" class="btn-modal" @click="onConfirmClick">
                {{ $t('app.Yes') }}
            </Button>
            <Button class="btn-modal btn-decline" @click="onDeclineClick">
                {{ $t('app.No') }}
            </Button>
        </div>
    </a-modal>
</template>

<script>
import AModal from '@atoms/a-modal'
import { Button } from 'view-design'

export default {
    name: 'AModalConfirmation',
    components: {
        AModal,
        Button,
    },
    props: {
        name: {
            type: String,
            required: true,
        },
    },
    methods: {
        onConfirmClick() {
            this.$emit('onConfirm')
        },
        onDeclineClick() {
            this.$emit('onDecline')
        },
        onClose() {
            this.$emit('onClose')
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
