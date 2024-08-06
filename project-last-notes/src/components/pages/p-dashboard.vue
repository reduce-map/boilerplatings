<template>
    <TDashboard v-if="isLoaded" :data="data" />
</template>

<script>
import axios from 'axios'
import TDashboard from '@templates/t-dashboard.vue'

export default {
    components: {
        TDashboard,
    },
    data() {
        return {
            isLoaded: false,
            error: null,
            data: null,
        }
    },
    mounted() {
        axios
            .get('/api/fake')
            .then(response => {
                this.isLoaded = true
                this.data = response.data
            })
            .catch(error => {
                this.error = error
            })
    },
}
</script>
