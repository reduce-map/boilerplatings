<template>
    <div>
        <notifications
            class="o-notifications-api"
            :duration="10000"
            :width="280"
            position="bottom right"
            group="api-errors"
        >
            <template
                slot="body"
                slot-scope="{
                    item: {
                        data: { error, statusCode, url },
                    },
                }"
            >
                <div class="vue-notification-template vue-notification error">
                    <span class="title">
                        <strong>Request Error</strong> <br />
                        Error {{ error }} <br />
                        Error code {{ statusCode }} <br />
                        Url {{ url }}
                    </span>
                </div>
            </template>
        </notifications>
        <notifications
            class="o-notifications-api-info"
            :duration="10000"
            :width="280"
            position="bottom right"
            group="api-info"
        >
            <template
                slot="body"
                slot-scope="{
                    item: {
                        data: { text, title },
                    },
                }"
            >
                <div class="vue-notification-template vue-notification info">
                    <span class="title">
                        {{ title }}
                    </span>
                    <span class="text">
                        {{ text }}
                    </span>
                </div>
            </template>
        </notifications>
    </div>
</template>

<script>
import { notificationsComputed } from '@state/helpers'

export default {
    name: 'ONotificationsApi',
    components: {},
    computed: {
        ...notificationsComputed,
    },
    watch: {
        error: {
            handler({ data, config }) {
                this.$notify({
                    // (optional)
                    // Name of the notification holder
                    group: 'api-errors',

                    // (optional)
                    // Class that will be assigned to the notification
                    type: 'error',

                    data: {
                        error: data.error,
                        statusCode: data.statusCode,
                        url: config.url,
                    },
                })
            },
        },
        info: {
            handler(data) {
                this.$notify({
                    // (optional)
                    // Name of the notification holder
                    group: 'api-info',

                    // (optional)
                    // Class that will be assigned to the notification
                    type: 'info',

                    data: {
                        title: data.data.title,
                        text: data.data.text,
                    },
                })
            },
        },
    },
    methods: {
        on() {
            this.$notify
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
