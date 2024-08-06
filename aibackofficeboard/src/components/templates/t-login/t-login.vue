<template>
    <div>
        <h1>
            Welcome to AI BackOffice
        </h1>
        <h2>
            Enter username and password to continue
        </h2>

        <o-login class="login-form" />
    </div>
</template>

<script>
import OLogin from '@organisms/o-login'
export default {
    name: 'TLogin',
    components: {
        OLogin,
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
