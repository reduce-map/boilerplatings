<template>
    <div>
        <notifications
            class="o-notifications-api"
            :width="400"
            position="bottom right"
            group="api-errors"
        >
            <template
                slot="body"
                slot-scope="{
                    item: {
                        data: { message },
                    },
                }"
            >
                <div class="vue-notification-template vue-notification error">
                    <div class="wrapper">
                        {{ message }}
                    </div>
                </div>
            </template>
        </notifications>
        <notifications
            class="o-notifications-api-info"
            :width="400"
            position="bottom right"
            group="api-info"
        >
            <template
                slot="body"
                slot-scope="{
                    item: {
                        data: { message },
                    },
                }"
            >
                <div class="vue-notification-template vue-notification info">
                    <div class="wrapper">
                        {{ message }}
                    </div>
                </div>
            </template>
        </notifications>
    </div>
</template>

<script>
import { notificationsComputed } from '@state/helpers'

export default {
    name: 'ONotificationsApi',
    computed: {
        ...notificationsComputed,
    },
    watch: {
        error: {
            handler(errorData) {
                this.$notify({
                    // (optional)
                    // Name of the notification holder
                    group: 'api-errors',

                    // (optional)
                    // Class that will be assigned to the notification
                    type: 'error',

                    data: errorData,
                })
            },
            deep: true,
        },
        info: {
            handler(infoData) {
                this.$notify({
                    // (optional)
                    // Name of the notification holder
                    group: 'api-info',

                    // (optional)
                    // Class that will be assigned to the notification
                    type: 'info',

                    data: infoData,
                })
            },
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
