<template>
    <div class="o-password-forgot">
        <div class="holder">
            <h2>{{ $t('app.Recover_Password') }}</h2>

            <ValidationObserver
                ref="recover"
                class="form-login"
                tag="form"
                @submit.prevent="onRecover"
            >
                <div class="app-form-holder">
                    <a-input
                        v-model="login"
                        :validation="true"
                        :validation-config="{
                            name: 'Email',
                            rules: 'required|email',
                        }"
                        class="app-row"
                        :label="$t('app.Email')"
                        :placeholder="$t('app.Email')"
                    />
                </div>

                <Button :loading="isLoading" html-type="submit" type="primary">
                    {{ $t('app.Recover') }}
                </Button>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
import { Button } from 'view-design'
import AInput from '@atoms/a-input'
import { ValidationObserver } from 'vee-validate'
import RecoverService from '@services/recover-service'

export default {
    name: 'OPasswordForgot',
    components: {
        AInput,
        Button,
        ValidationObserver,
    },
    data() {
        return {
            isLoading: false,
            origin: window.location.origin,

            login: '',
            messenger: 'email',
            msgText: '',
        }
    },
    computed: {
        verifyUrl() {
            const login = encodeURI(this.login)

            return `${this.origin}/recover/verify?code={code}&login=${login}`
        },
    },
    methods: {
        async onRecover() {
            const isValid = await this.$refs.recover.validate()

            if (!isValid) {
                return
            }

            this.isLoading = true

            try {
                const { login, uuid } = await RecoverService.recover({
                    login: this.login,
                    messenger: this.messenger,
                    msgText: this.getRecoverText({
                        login: this.login,
                        url: this.verifyUrl,
                    }),
                })
                console.log(login, uuid)
            } catch (err) {
                console.log(err)
            }

            this.isLoading = false
        },

        getRecoverText({ login, url }) {
            return `
                We’ve emailed a special link to ${login}. Click
                the link to confirm your password recover process.
                ${url}
            `
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
