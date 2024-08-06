<template>
    <Modal
        v-model="localValue"
        v-bind="$attrs"
        v-on="listeners"
    >
        <slot />
        <template slot="header">
            <slot name="header" />
        </template>
        <template slot="footer">
            <slot name="footer" />
        </template>
        <template slot="close">
            <slot name="close" />
        </template>
    </Modal>
</template>
<script>
import { Modal } from 'iview'
export default {
    components: {
        Modal,
    },

    props: {
        value: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: 'Title',
        },
        closable: {
            type: Boolean,
            default: true,
        },
    },
    data: () => ({
        localValue: false,
    }),
    computed: {
        listeners() {
            return {
                ...this.$listeners,
            }
        },
    },
    watch: {
        value: {
            handler() {
                this.localValue = this.value
            },
        },
        localValue: {
            handler() {
                this.$emit('input', this.localValue)
            },
        },
    },
}
</script>
