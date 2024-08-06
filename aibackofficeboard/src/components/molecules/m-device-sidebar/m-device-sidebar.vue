<template>
    <ul class="m-device-sidebar">
        <li
            v-for="device in devicesList"
            :key="device"
            :class="{
                active: device === activeDevice,
            }"
            @click.stop="onClick(device)"
        >
            {{ device }}
            <a-button-action :key="device" type="more" />
        </li>
    </ul>
</template>

<script>
import AButtonAction from '@atoms/a-button-action'

export default {
    name: 'MDeviceSidebar',
    components: {
        AButtonAction,
    },
    props: {
        activeDevice: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            devicesList: [
                'Rack',
                'Camera controller',
                'Weight controller',
                'Weight agregator',
                'Store controller',
            ],
        }
    },
    methods: {
        onClick(device) {
            this.$emit('onClick', device)
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
