<template>
    <div class="o-login">
        <div class="holder">
            <h2>{{ $t('app.Log_in') }}</h2>
            <ValidationObserver
                ref="login"
                class="form-login"
                tag="form"
                @submit.prevent="onLogin"
            >
                <div class="app-form-holder">
                    <a-input
                        v-model="loginForm.login"
                        :validation="true"
                        :validation-config="{
                            name: 'Email',
                            rules: 'required|email',
                        }"
                        class="app-row"
                        :label="$t('app.Email')"
                        :placeholder="$t('app.Email')"
                    />

                    <a-input
                        v-model="loginForm.password"
                        :validation="true"
                        :validation-config="{
                            name: 'Password',
                            rules: 'required',
                        }"
                        type="password"
                        class="app-row"
                        :label="$t('app.Password')"
                        :placeholder="$t('app.Password')"
                    />

                    <a href="#" @click.prevent="onPassWordForgotClick">{{
                        $t('app.Forgot_password')
                    }}</a>
                </div>

                <Button :loading="isLoading" html-type="submit" type="primary">
                    {{ $t('app.Log_in') }}
                </Button>
            </ValidationObserver>

            <div class="app-divider-block">
                <div class="heading">
                    <span>{{ $t('app.Register') }}</span>
                </div>

                <Button class="divider-btn" @click="onRegisterClick">
                    {{ $t('app.Create_account') }}
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
import { Button } from 'view-design'
import AInput from '@atoms/a-input'
import { ValidationObserver } from 'vee-validate'
import AuthService from '@services/auth-service'
import { authMethods } from '@state/helpers'
import { Role } from '@/constants/role.js'

export default {
    name: 'OLogin',
    components: {
        AInput,
        Button,
        ValidationObserver,
    },
    data() {
        return {
            isLoading: false,

            // use origin to create url which will send to email
            origin: window.location.origin,

            registerForm: {
                login: '', // login email
                name: '', // users's name
                msgText: `А ты заверефецировался по адресу - `,
                // "messenger": "email", TODO ?
                language: 'ru', // it's mocks could be 'en' TODO ?
            },

            loginForm: {
                login: 'test@translate.center',
                password: '12345678',
            },
        }
    },
    computed: {
        returnUrl() {
            return (
                this.$router &&
                this.$router.history &&
                this.$router.history.current &&
                this.$router.history.current.query &&
                this.$router.history.current.query.returnUrl
            )
        },
    },
    methods: {
        ...authMethods,

        async onLogin() {
            const isValid = await this.$refs.login.validate()

            if (!isValid) {
                return
            }

            this.isLoading = true

            try {
                const { authToken, userUuid } = await AuthService.login(
                    this.loginForm
                )
                this.setAuth({ userUuid, authToken, userRole: Role.user })

                if (this.returnUrl) {
                    this.$router.push({ path: this.returnUrl })
                } else {
                    this.$router.push({ name: 'user-main' })
                }
            } catch (err) {
                console.log(err)
            }

            this.isLoading = false
        },

        onRegisterClick() {
            this.$router.push({
                name: 'register',
            })
        },

        onPassWordForgotClick() {
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
