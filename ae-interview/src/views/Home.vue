<template>
    <div class="home-view">
        <template v-if="auth">
            <grid-images />
        </template>
        <template v-else>
            Authentication in progress
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GridImages from '@/components/grid-images'

export default {
    name: 'Home',
    components: {
        GridImages,
    },
    computed: {
        ...mapGetters('auth', ['auth']),
    },
}
</script>
