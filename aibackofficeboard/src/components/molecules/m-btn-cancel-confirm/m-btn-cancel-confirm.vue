<template>
    <div class="m-btn-cancel-confirm">
        <a-button-cancel @click.native="$emit('cancel')" />
        <a-button-confirm @click.native="$emit('confirm')" />
    </div>
</template>

<script>
import AButtonCancel from '@atoms/a-button-cancel'
import AButtonConfirm from '@atoms/a-button-confirm'

export default {
    name: 'MBtnCancelConfirm',
    components: {
        AButtonCancel,
        AButtonConfirm,
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
