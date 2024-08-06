<template>
    <div>
        <h1>
            Welcome to AI BackOffice
        </h1>

        <o-forgot />
    </div>
</template>

<script>
import OForgot from '@organisms/o-forgot'

export default {
    name: 'TForgotPassword',
    components: {
        OForgot,
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
