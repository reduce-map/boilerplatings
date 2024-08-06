<template>
    <a-vee-validate
        name-validate="observer"
    >
        <form
            slot-scope="{ invalid }"
            class="password-change"
            @submit.prevent="onSubmit"
        >
            <m-form-row
                label-for="currentPassword"
                label-text="currentPassword"
                :value="currentPassword"
                :disabled="true"
            />
            <m-validate-required
                vid="newPassword1"
            >
                <m-form-row
                    slot="valid"
                    v-model="localPasswords.newPassword"
                    label-for="newPassword"
                    label-text="newPassword"
                />
            </m-validate-required>

            <m-validate-confirm
                confirmed="newPassword1"
            >
                <m-form-row
                    slot="valid"
                    v-model="localPasswords.confirmPassword"
                    label-for="confirmPassword"
                    label-text="confirmPassword"
                />
            </m-validate-confirm>

            <a-button
                :disabled="invalid"
                type="submit"
                btn-type="submit"
            >
                Save
            </a-button>
        </form>
    </a-vee-validate>
</template>

<script>
import AButton from '@atoms/a-button.vue'
import MFormRow from '@molecules/m-form-row.vue'
import AVeeValidate from '@atoms/a-vee-validate.vue'
import MValidateRequired from '@validate/m-validate-required.vue'
import MValidateConfirm from '@validate/m-validate-confirm.vue'

export default {
    components: {
        'm-form-row': MFormRow,
        'a-button': AButton,
        'a-vee-validate': AVeeValidate,
        'm-validate-required': MValidateRequired,
        'm-validate-confirm': MValidateConfirm,
    },
    props: {
        // currentPassword: {
        //     type: String,
        //     required: true
        // }
    },
    data: () => ({
        currentPassword: 'sd',
        localPasswords: {
            newPassword: '',
            confirmPassword: '',
        },
    }),
    methods: {
        onSubmit() {
            // console.log(this.$data);
            this.$emit('on-submit', {
                ...{ currentPassword: this.currentPassword },
                ...this.localPasswords,
            })
        },
    },
}
</script>
