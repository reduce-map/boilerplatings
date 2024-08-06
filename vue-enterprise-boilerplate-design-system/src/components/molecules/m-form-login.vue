<template>
    <a-vee-validate
    name-validate="observer"
    >
        <form
            slot-scope="{ invalid }"
            class="form-login__form"
            @submit.prevent="onSubmit"
        >
            <m-validate-required
                name="email"
            >
                <a-input
                    slot="valid"
                    v-model="loginData.email"
                    class="form-login__input"
                    type="email"
                    placeholder="Адресс электронной почты"
                    element-id="login-form-email"
                >
                    <a-icon
                        slot="suffix"
                        text-icon="mail"
                    />
                </a-input>
            </m-validate-required>

            <m-validate-required
                name="password"
            >
                <a-input
                    slot="valid"
                    v-model="loginData.password"
                    :type="isShowPassword?'text':'password'"
                    class="form-login__input"
                    placeholder="Пароль"
                    element-id="login-form-password"
                >
                    <a-icon
                        slot="suffix"
                        text-icon="lock"
                    />
                </a-input>
            </m-validate-required>

            <a-checkbox
                v-model="loginData.remember"
            >
                <span>Запомни меня</span>
            </a-checkbox>

            <a-button
                type="button"
                btn-type="link"
                @click="isShowPassword=!isShowPassword"
            >
                Show password
            </a-button>
            <a-button
                :disabled="invalid"
                type="submit"
                btn-type="submit"
            >
                submit
            </a-button>
        </form>
    </a-vee-validate>
</template>

<script>
import AInput from '@atoms/a-input.vue'
import AButton from '@atoms/a-button.vue'
import ACheckbox from '@atoms/a-checkbox.vue'
import AIcon from '@atoms/a-icon.vue'
import AVeeValidate from '@atoms/a-vee-validate.vue'
import MValidateRequired from '@validate/m-validate-required.vue'
export default {
    components: {
        'a-button': AButton,
        'a-checkbox': ACheckbox,
        'a-input': AInput,
        'a-icon': AIcon,
        'a-vee-validate': AVeeValidate,
        'm-validate-required': MValidateRequired,
    },
    data: () => ({
        isShowPassword: false,
        loginData: {
            email: '',
            password: '',
            remember: false,
        },
    }),
    methods: {
        onSubmit() {
            this.$emit('on-submit', this.loginData)
        },
    },
}
</script>
