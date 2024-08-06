<template>
    <a-vee-validate
        name-validate="observer"
    >
        <form
        slot-scope="{ invalid }"
        class="email-registration__form"
        @submit.prevent="onSubmit"
        >
            <m-validate-required>
                <a-input
                    slot="valid"
                    v-model.trim="loginData.email"
                    class="email-registration__input"
                    type="email"
                    placeholder="Адресс электронной почты"
                    element-id="email-registration-email"
                >
                    <a-icon
                        slot="suffix"
                        text-icon="mail"
                    />
                </a-input>
            </m-validate-required>

            <m-validate-required>
                <a-input
                    slot="valid"
                    v-model="loginData.name"
                    type="text"
                    placeholder="Имя"
                    element-id="email-registration-name"
                >
                    <a-icon
                        slot="suffix"
                        text-icon="perm_identity"
                    />
                </a-input>
            </m-validate-required>

            <m-validate-required>
                <a-input
                    slot="valid"
                    v-model="loginData.surname"
                    type="text"
                    element-id="email-registration-surname"
                    placeholder="Фамилия"
                >
                    <a-icon
                        slot="suffix"
                        text-icon="perm_identity"
                    />
                </a-input>
            </m-validate-required>

            <m-validate-required>
                <a-input
                    slot="valid"
                    v-model.trim="loginData.password"
                    type="password"
                    element-id="email-registration-password"
                    placeholder="Пароль"
                >
                    <a-icon
                        slot="suffix"
                        text-icon="lock"
                    />
                </a-input>
            </m-validate-required>

            <m-validate-required>
                <a-multiselect
                    slot="valid"
                    :value="month"
                    placeholder="Месяц"
                    track-by="name"
                    label="name"
                    :options="optionsMonth"
                    :searchable="false"
                    :show-labels="false"
                    @input="onInputSelect( $event,'month')"
                />
            </m-validate-required>

            <m-validate-required>
                <a-multiselect
                    slot="valid"
                    :value="day"
                    placeholder="День"
                    track-by="name"
                    label="name"
                    :options="optionsDays"
                    :searchable="false"
                    :show-labels="false"
                    @input="onInputSelect( $event,'day')"
                />
            </m-validate-required>
            <m-validate-required>
                <a-multiselect
                    slot="valid"
                    :value="year"
                    placeholder="Год"
                    label="name"
                    track-by="name"
                    :show-labels="false"
                    :options="optionsYears"
                    :searchable="false"
                    @input="onInputSelect( $event,'year')"
                />
            </m-validate-required>

            <a-checkbox
                v-model="loginData.advertisingMessages"
                class="email-registration__checkbox"
                />

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
import AIcon from '@atoms/a-icon.vue'
import AInput from '@atoms/a-input.vue'
import AMultiselect from '@atoms/a-multiselect.vue'
import ACheckbox from '@atoms/a-checkbox.vue'
import AButton from '@atoms/a-button.vue'
import AVeeValidate from '@atoms/a-vee-validate.vue'
import MValidateRequired from '@validate/m-validate-required.vue'

export default {
    components: {
        'a-icon': AIcon,
        'a-input': AInput,
        'a-multiselect': AMultiselect,
        'a-checkbox': ACheckbox,
        'a-button': AButton,
        'a-vee-validate': AVeeValidate,
        'm-validate-required': MValidateRequired,
    },
    props: {
        // dates: {
        //     type: Object,
        //     required: true
        // }
    },
    data: () => ({
        optionsYears: [{ name: 'Years', $isDisabled: true }, { name: '1889' }],
        optionsMonth: [
            { name: 'Month', $isDisabled: true },
            { name: 'October' },
        ],
        optionsDays: [
            { name: 'Day', $isDisabled: true },
            { name: 1 },
            { name: 2 },
        ],
        day: null,
        month: null,
        year: null,
        loginData: {
            email: '',
            password: '',
            name: '',
            surname: '',
            birthday: '',
            advertisingMessages: false,
        },
    }),

    methods: {
        onSubmit() {
            this.$emit('on-submit', this.loginData)
        },
        onInputSelect(data, name) {
            this[name] = data
        },
    },
}
</script>
