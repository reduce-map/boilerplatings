<template>
    <div class="o-verify">
        <ValidationObserver
            ref="formPassword"
            tag="form"
            @submit.prevent="onPassSet"
        >
            <a-input
                v-model="password1"
                :validation="true"
                :validation-config="{
                    name: 'password',
                    rules: 'required',
                }"
                class="row"
                type="password"
                :placeholder="$t('fields.password')"
            />

            <a-input
                v-model="password2"
                :validation="true"
                :validation-config="{
                    name: 'password2',
                    rules: 'required',
                }"
                class="row"
                type="password"
                :placeholder="$t('fields.passwordConfirm')"
            />

            <Button html-type="submit" type="primary">
                {{ $t('auth.setPass') }}
            </Button>
        </ValidationObserver>
    </div>
</template>

<script>
import RegisterService from '@services/register-service'
import AInput from '@atoms/a-input'
import { ValidationObserver } from 'vee-validate'

export default {
    name: 'OVerify',
    components: {
        ValidationObserver,
        AInput,
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
    methods: {
        async onPassSet() {
            const isValid = await this.$refs.formPassword.validate()

            if (!isValid) {
                return
            }

            this.isLoading = true
            await Promise.all([
                RegisterService.setPassword({
                    userUuid: this.userUuid,
                    password: this.password1,
                }),
            ])

            this.isLoading = false
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
