---
to: src/components/pages/p-<%= name %>.vue
---
<template>
    <t-dashboard
        v-if="isLoaded"
        :data="data"
    />
    </template>
<script>
import axios from 'axios'
import TDashboard from '@templates/t-dashboard.vue'

export default {
    name: 'O<%= name %>',
    data() {
        return {
            isLoaded: false,
            error: null,
            data: null
        }
    },
    components: {
        TDashboard
    },
    mounted() {
        axios
            .get('/api/')
            .then(response => {
                this.isLoaded = true
                this.data = response.data
            })
            .catch(error => {
                this.error = error
            })
    }
}
</script>
