<template>
    <div class="o-register">
        <div class="holder">
            <h2>{{ $t('app.Register') }}</h2>
            <ValidationObserver
                ref="register"
                tag="form"
                @submit.prevent="onRegister"
            >
                <div class="app-form-holder">
                    <a-input
                        v-model="registerForm.login"
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
                        v-model="registerForm.name"
                        :validation="true"
                        :validation-config="{
                            name: 'Name',
                            rules: 'required',
                        }"
                        class="app-row"
                        :label="$t('app.Name')"
                        :placeholder="$t('app.Name')"
                    />
                </div>

                <Button
                    :disabled="isEmailSend"
                    :loading="isLoading"
                    html-type="submit"
                    type="primary"
                >
                    {{ $t('auth.registration') }}
                </Button>
            </ValidationObserver>

            <div class="app-divider-block">
                <div class="heading">
                    <span>{{ $t('app.Sign_in') }}</span>
                </div>

                <Button class="divider-btn" @click="onLoginClick">
                    {{ $t('app.Sign_in') }}
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
import { Button } from 'view-design'
import AInput from '@atoms/a-input'
import { ValidationObserver } from 'vee-validate'
import RegisterService from '@services/register-service'
import { authMethods, notificationsMethods } from '@state/helpers'

// import { Role } from '@/constants/role.js'

export default {
    name: 'ORegister',
    components: {
        AInput,
        Button,
        ValidationObserver,
    },
    data() {
        return {
            isEmailSentSuccess: null,

            dismissCountDown: 0,

            isLoading: false,
            isEmailSend: false,

            origin: window.location.origin,

            registerForm: {
                login: '', // login email
                name: '', // users's name
                language: 'ru', // it's mocks could be 'en' TODO
                // "messenger": "email", TODO ask BE ?
            },
        }
    },
    computed: {
        verifyUrl() {
            const login = encodeURI(this.registerForm.login)

            return `${this.origin}/register/verify?code={code}&login=${login}`
        },
    },
    methods: {
        ...authMethods,
        ...notificationsMethods,
        async onRegister() {
            const isValid = await this.$refs.register.validate()

            if (!isValid) {
                return
            }

            this.isLoading = true

            try {
                await RegisterService.register({
                    ...this.registerForm,
                    msgText: this.getMsgText({
                        url: this.verifyUrl,
                        email: this.registerForm.login,
                    }),
                })

                this.setInfo({
                    data: {
                        title: 'Check your email!',
                        text: this.getInfoText(this.registerForm.login),
                    },
                })
            } catch (err) {
                console.log(err)
            }

            this.isLoading = false
        },

        //
        onLoginClick() {
            this.$router.push({
                name: 'login',
            })
        },

        getMsgText({ url, email }) {
            return `
                Confirm your email address to get started on Translate Center.
                Once you've confirmed that ${email} is your email address, we’ll help you find your Translate Center workspaces.
                If you didn’t request this email, there’s nothing to worry about — you can safely ignore it.
                ${url}
            `
        },

        getInfoText(login) {
            return `
                We’ve emailed a special link to ${login}. Click
                the link to confirm your address and get started.
                Wrong email? Please re-enter your address.
            `
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
