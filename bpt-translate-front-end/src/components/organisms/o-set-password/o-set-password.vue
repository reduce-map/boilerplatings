<template>
    <div class="o-set-password">
        <div class="holder">
            <h2>{{ $t('app.Set_password') }}</h2>
            <ValidationObserver
                ref="formPassword"
                tag="form"
                @submit.prevent="onPassSet"
            >
                <div class="app-form-holder">
                    <a-input
                        v-model="password"
                        :validation="true"
                        :validation-config="{
                            name: 'Password',
                            rules: 'required',
                        }"
                        class="app-row"
                        type="password"
                        password
                        :placeholder="$t('fields.Password')"
                    />
                </div>

                <Button :loading="isLoading" html-type="submit" type="primary">
                    {{ $t('auth.setPass') }}
                </Button>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
import RegisterService from '@services/register-service'
import AInput from '@atoms/a-input'
import { Button } from 'view-design'
import { ValidationObserver } from 'vee-validate'
import { authComputed } from '@state/helpers'

export default {
    name: 'OSetPassword',
    components: {
        ValidationObserver,
        AInput,
        Button,
    },
    data() {
        return {
            isLoading: false,
            password: '',
        }
    },
    computed: {
        ...authComputed,
    },
    methods: {
        async onPassSet() {
            const isValid = await this.$refs.formPassword.validate()

            if (!isValid) {
                return
            }

            this.isLoading = true

            try {
                await RegisterService.setPassword({
                    userUuid: this.userUuid,
                    password: this.password,
                })

                this.$router.push({
                    name: 'user-main',
                })
            } catch (err) {
                console.log(err)
            }

            this.isLoading = false
        },

        // TODO delete
        goToMain() {
            this.$router.push({
                name: 'user-main',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
