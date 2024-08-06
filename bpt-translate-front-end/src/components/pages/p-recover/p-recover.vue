<template>
    <div class="p-recover">
        <div v-if="isRecovering" class="verificationProcess">
            recovering in progress
        </div>

        <div v-if="!isValidRouteParams" class="register-error-params">
            <div class="holder">
                <img src="@assets/img-error.png" alt="img-error" />
                <h2>Something went wrong with verification!</h2>
                <p>
                    Looks like something missing. Don't worry though. Our best
                    man is on the case
                </p>
                <p>Go back to recover page</p>

                <Button type="error" @click="onBackRecover">
                    Back to recover
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
import RecoverService from '@services/recover-service'
import { authMethods } from '@state/helpers'
import { Role } from '@/constants/role.js'

export default {
    name: 'PRecover',

    components: {},

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
            isRecovering: false,
        }
    },
    computed: {
        isValidRouteParams() {
            // TODO add validation function for code and login (login should be email)
            return !!this.code && !!this.login
        },
    },

    async created() {
        if (this.isValidRouteParams) {
            try {
                this.isRecovering = true

                try {
                    const {
                        authToken,
                        userUuid,
                    } = await RecoverService.recoverVerify({
                        login: decodeURI(this.login),
                        code: this.code,
                    })

                    this.setAuth({
                        userUuid,
                        authToken,
                        userRole: Role.user,
                    })

                    this.$router.push({
                        name: 'set-password',
                    })
                } catch (err) {
                    console.log(err)
                }

                this.isRecovering = false
            } catch (e) {
                console.log(e)
            }
        }
    },
    methods: {
        ...authMethods,
        onBackRecover() {
            this.$router.push({
                name: 'password-forgot',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
