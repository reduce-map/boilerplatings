<template>
    <div class="o-login">
        <ValidationObserver
            ref="login"
            class="form-login"
            tag="form"
            @submit.prevent="onLogin"
        >
            <a-input
                v-model="email"
                clearable
                :validation="true"
                :validation-config="{
                    name: 'Email',
                    rules: 'required|email',
                }"
                label="Username"
                class="form-row"
                placeholder="Username"
            />

            <a-input
                v-model="password"
                :validation="true"
                :validation-config="{
                    name: 'Password',
                    rules: 'required|min:8',
                }"
                password
                label="Repeat Password"
                type="password"
                class="form-row"
                placeholder="Password"
            />

            <div class="submit-holder">
                <a-button class="large yellow submit" type="submit">
                    Login
                </a-button>
            </div>
        </ValidationObserver>

        <router-link class="forgot-password" to="/forgot-password">
            Forgot password?
        </router-link>
    </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import {
    authMethods,
    authComputed,
    notificationsComputed,
} from '@state/helpers'

import AInput from '@atoms/a-input'
import AButton from '@atoms/a-button'
import _ from 'lodash'

export default {
    name: 'OLogin',
    components: {
        AInput,
        AButton,
        ValidationObserver,
    },
    data: () => ({
        isLoading: false,
        email: '',
        password: '',
        counter: 0, // delete
    }),
    computed: {
        ...authComputed,
        ...notificationsComputed,
        errorMessage() {
            return _.get(this.error, 'message')
        },
    },
    methods: {
        ...authMethods,
        async onLogin() {
            const form = this.$refs.login
            const isValid = await form.validate()

            if (!isValid) {
                return
            }

            this.isLoading = true

            try {
                await this.logIn({
                    email: this.email,
                    password: this.password,
                })

                this.loggedIn && this.$router.push({ name: 'home' })
            } catch (err) {
                console.log(err)
            }

            // show error messages
            if (this.errorMessage) {
                form.setErrors({
                    Email: this.errorMessage,
                    Password: this.errorMessage,
                })
            }

            this.isLoading = false
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
