<template>
    <div class="p-confirm">
        <div v-if="isConfirmation" class="confirmationProcess">
            confirmation in progress
        </div>

        <div v-if="!isValidRouteParams" class="register-error-params">
            <div class="holder">
                <img src="@assets/img-error.png" alt="img-error" />
                <h2>Something went wrong with confirmation!</h2>
                <p>
                    Looks like something missing. Don't worry though. Our best
                    man is on the case
                </p>
                <p>Go back to login page</p>

                <Button type="error" @click="onBackLogin">
                    Back login
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '@services/user-service'
import { authMethods, authComputed } from '@state/helpers'
import { Role } from '@/constants/role.js'
import { Button } from 'view-design'

export default {
    name: 'PConfirm',
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
        projectUuid: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            isConfirmation: false,
        }
    },

    computed: {
        ...authComputed,
        isValidRouteParams() {
            return !!this.code && !!this.login && !!this.projectUuid
        },
    },

    async created() {
        if (this.isValidRouteParams) {
            try {
                this.isConfirmation = true

                try {
                    const {
                        authToken,
                        needSetPassword,
                        needFillProfile,
                        userUuid,
                    } = await UserService.confirmProjectUser({
                        projectUuid: this.projectUuid,
                        data: {
                            login: decodeURI(this.login),
                            code: this.code,
                        },
                    })

                    this.setAuth({
                        userUuid,
                        authToken,
                        userRole: Role.user,
                    })

                    if (needSetPassword) {
                        this.$router.push({
                            name: 'set-password',
                        })
                    } else if (needFillProfile) {
                        this.$router.push({
                            name: 'user-profile',
                        })
                    }

                    this.$router.push({
                        name: 'project-main',
                        params: { projectUuid: this.projectUuid },
                    })
                } catch (err) {
                    console.log(err)
                }

                this.isConfirmation = false
            } catch (error) {
                console.log(error)
            }
        }
    },

    methods: {
        ...authMethods,
        onBackLogin() {
            this.$router.push({
                name: 'login',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
