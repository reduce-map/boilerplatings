<template>
    <div class="container">
        <app-select-vue />
    </div>
</template>

<script>
import Select from '@/components/Select.vue'

export default {
    name: 'Selectors',
    components: {
        'app-select-vue': Select
    }
}
</script>
