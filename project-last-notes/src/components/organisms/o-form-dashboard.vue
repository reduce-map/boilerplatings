<template>
    <div><FormDashboard /></div>
</template>

<script>
import FormDashboard from '@molecules/m-form-dashboard.vue'

export default {
    name: 'OFormCreditInquiry',
    components: {
        FormDashboard,
    },
    data: () => ({
        data: null,
    }),
    computed: {
        isMatchesExist() {
            return false
        },
    },
}
</script>

<style lang="scss" scoped>
.o-form-credit-inquiry {
    width: 887px;
    padding: 25px;
    margin: 0 auto;
    border: 1px solid #e9e9e7;
    border-radius: 10px;
}
</style>
