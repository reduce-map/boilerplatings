<template>
    <notifications
        class="notifications-api"
        :width="426"
        position="bottom right"
        group="api-info"
        :duration="2000"
    >
        <template
            slot="body"
            slot-scope="{
                item: {
                    data: { message, type },
                },
            }"
        >
            <div
                class="vue-notification-template vue-notification"
                :class="type"
            >
                {{ message }}
            </div>
        </template>
    </notifications>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'AppNotifications',
    computed: {
        ...mapGetters('notifications', ['error', 'info']),
    },
    watch: {
        ...mapActions('notifications', ['resetError', 'resetInfo']),
        error(error) {
            if (!error) return

            this.$notify({
                // (optional)
                // Name of the notification holder
                group: 'api-info',
                // (optional)
                // Class that will be assigned to the notification
                type: 'error',
                data: {
                    message: error,
                    type: 'error',
                },
            })
        },
        info(info) {
            if (!info) return

            this.$notify({
                // (optional)
                // Name of the notification holder
                group: 'api-info',
                // (optional)
                // Class that will be assigned to the notification
                type: 'error',
                data: {
                    message: info,
                    type: 'info',
                },
            })
        },
    },
}
</script>
