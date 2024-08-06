<template>
    <div class="o-forgot">
        <transition name="fade" mode="out-in">
            <div v-if="!isPasswordSent">
                <h2>
                    Enter your email to get a new password
                </h2>

                <ValidationObserver
                    key="forgot"
                    ref="forgot"
                    class="form-forgot"
                    tag="form"
                    @submit.prevent="onForgot"
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

                    <div class="submit-holder">
                        <a-button class="large yellow" type="submit">
                            Get password
                        </a-button>
                    </div>
                </ValidationObserver>
            </div>
            <div v-else>
                <h2>
                    Enter username and password to continue
                </h2>
                <ValidationObserver
                    key="passwordChange"
                    ref="passwordChange"
                    class="form-password"
                    tag="form"
                    @submit.prevent="onPassword"
                >
                    <a-input
                        v-model="password"
                        :validation="true"
                        :validation-config="{
                            name: 'Password',
                            rules: 'required|min:8',
                        }"
                        password
                        label="New password"
                        type="password"
                        class="form-row"
                        placeholder="Type Password"
                    />

                    <a-input
                        v-model="password2"
                        :validation="true"
                        :validation-config="{
                            name: 'Repeated password',
                            rules: 'required|min:8',
                        }"
                        password
                        label="Repeat Password"
                        type="password"
                        class="form-row"
                        placeholder="Type Password"
                    />

                    <div class="submit-holder">
                        <a-button class="large yellow" type="submit">
                            Save
                        </a-button>
                    </div>
                </ValidationObserver>
            </div>
        </transition>
    </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import AInput from '@atoms/a-input'
import AButton from '@atoms/a-button'

import { notificationsMethods } from '@state/helpers'

export default {
    name: 'OForgot',
    components: {
        AInput,
        AButton,
        ValidationObserver,
    },
    data: () => ({
        email: '',
        password: '',
        password2: '',
        counter: 0, // delete

        isPasswordSent: false,
        isLoading: false,
    }),
    methods: {
        ...notificationsMethods,
        async onForgot() {
            const form = this.$refs.forgot
            const isValid = await form.validate()

            if (!isValid) {
                return
            }

            try {
                await new Promise(resolve => setTimeout(resolve, 1000))
                if (!this.counter) {
                    const message = 'user doest exist'
                    form.setErrors({
                        Email: message,
                    })

                    this.setError({
                        message,
                    })

                    this.counter++
                } else {
                    this.isPasswordSent = true

                    this.setInfo({
                        message: 'The password has been sent to your email.',
                    })
                }
            } catch (err) {
                console.log(err)
            }

            this.isLoading = false
        },

        async onPassword() {
            const form = this.$refs.passwordChange
            const isValid = await form.validate()

            if (!isValid) {
                return
            }

            if (this.password !== this.password2) {
                form.setErrors({
                    'Repeated password':
                        'Passwords do not match, please try again.',
                })
                return
            }

            try {
                await new Promise(resolve => setTimeout(resolve, 1000))

                this.setInfo({
                    message: 'Password was changed',
                })

                this.$router.push({
                    name: 'login',
                })
            } catch (err) {
                console.log(err)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
