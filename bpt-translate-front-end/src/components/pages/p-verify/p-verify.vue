<template>
    <div class="p-verify">
        <div v-if="isVerification" class="verificationProcess">
            verifying in progress
        </div>

        <div v-if="!isValidRouteParams" class="register-error-params">
            <div class="holder">
                <img src="@assets/img-error.png" alt="img-error" />
                <h2>Something went wrong with verification!</h2>
                <p>
                    Looks like something missing. Don't worry though. Our best
                    man is on the case
                </p>
                <p>Go back to register page</p>

                <Button type="error" @click="onBackRegister">
                    Back register
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
import RegisterService from '@services/register-service'
import { authMethods, authComputed } from '@state/helpers'
import { Role } from '@/constants/role.js'
import { Button } from 'view-design'

export default {
    name: 'PVerify',
    components: {
        Button,
    },

    props: {
        code: {
            type: String,
            required: true,
        },
        login: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            isVerification: false,
        }
    },

    computed: {
        ...authComputed,
        isValidRouteParams() {
            // TODO add validation function for code and login (login should be email)
            return !!this.code && !!this.login
        },
    },

    async created() {
        if (this.isValidRouteParams) {
            try {
                const login = decodeURI(this.login)

                this.isVerification = true
                const { authToken, userUuid } = await RegisterService.verify({
                    login,
                    code: this.code,
                })
                this.isVerification = false

                // set auth to store
                this.setAuth({
                    userUuid,
                    authToken,
                    userRole: Role.user,
                })

                this.$router.replace({
                    name: 'set-password',
                })
            } catch (error) {
                // https://gist.github.com/fgilio/230ccd514e9381fafa51608fcf137253
                const { response: data } = error
                console.log(data.data.error, data.data.statusCode)
            }
        }
    },
    methods: {
        ...authMethods,
        onBackRegister() {
            this.$router.push({
                name: 'register',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
