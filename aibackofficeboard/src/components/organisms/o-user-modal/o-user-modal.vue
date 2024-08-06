<template>
    <a-modal class="o-user-modal" name="add-user">
        <h2 slot="header">
            Add User
        </h2>

        <div slot="default">
            <ValidationObserver
                ref="addUserForm"
                tag="form"
                @submit.prevent="onAddUser"
            >
                <div class="app-form-holder">
                    <m-upload class="app-row" />
                    <a-input
                        v-model="addUserForm.userName"
                        :validation="true"
                        :validation-config="{
                            name: 'User Name',
                            rules: {
                                required: true,
                            },
                        }"
                        class="app-row"
                        :label="'User name'"
                        :placeholder="'Type name'"
                        clearable
                    />

                    <a-app-row class="app-row">
                        <span slot="label">
                            Role
                        </span>
                        <Select
                            v-model="addUserForm.role"
                            class="app-select"
                            placeholder="Choose role"
                            clearable
                            multiple
                        >
                            <Option
                                v-for="item in rolesList"
                                :key="item.value"
                                :value="item.value"
                            >
                                {{ item.label }}
                            </Option>
                        </Select>
                    </a-app-row>

                    <a-input
                        v-model="addUserForm.telegram"
                        :validation="true"
                        :validation-config="{
                            name: 'Telegram',
                            rules: {
                                required: true,
                            },
                        }"
                        class="app-row"
                        :label="'Telegram'"
                        :placeholder="'Type username'"
                        prefix="ios-at-outline"
                    />
                    <a-input
                        v-model="addUserForm.email"
                        :validation="true"
                        :validation-config="{
                            name: 'Email',
                            rules: {
                                required: true,
                            },
                        }"
                        class="app-row"
                        :label="'E-mail'"
                        :placeholder="'Type e-amil'"
                    />

                    <a-input
                        v-model="addUserForm.password"
                        :validation="true"
                        :validation-config="{
                            name: 'Password',
                            rules: {
                                required: true,
                            },
                        }"
                        class="app-row"
                        :label="'Password'"
                        :placeholder="'Type password '"
                    />

                    <a-input
                        v-model="addUserForm.password2"
                        :validation="true"
                        :validation-config="{
                            name: 'Password',
                            rules: {
                                required: true,
                            },
                        }"
                        class="app-row"
                        :label="'Repeat password'"
                        :placeholder="'Repeat password'"
                    />

                    <a-app-row class="app-row">
                        <span slot="label">
                            Choose status
                        </span>
                        <RadioGroup
                            v-model="status"
                            class="app-radio-group app-row"
                        >
                            <Radio label="active" />
                            <Radio label="inactive" />
                        </RadioGroup>
                    </a-app-row>
                </div>

                <m-btn-cancel-confirm @cancel="onCancel" @confirm="onConfirm" />
            </ValidationObserver>
        </div>
    </a-modal>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import AModal from '@atoms/a-modal'
import AInput from '@atoms/a-input'
import AAppRow from '@atoms/a-app-row'
import MUpload from '@molecules/m-upload'
import MBtnCancelConfirm from '@molecules/m-btn-cancel-confirm'
import { Select, Option, RadioGroup, Radio } from 'view-design'

export default {
    name: 'OUserModal',
    components: {
        AModal,
        AInput,
        MBtnCancelConfirm,
        MUpload,
        Select,
        Option,
        RadioGroup,
        Radio,
        ValidationObserver,
        AAppRow,
    },
    data() {
        return {
            addUserForm: {
                userName: '',
                role: '',
                telegram: '',
                email: '',
                password: '',
                password2: '',
                status: null,
            },
            rolesList: [
                {
                    value: 'Root',
                    label: 'Root',
                },
                {
                    value: 'Admin',
                    label: 'Admin',
                },
            ],
            status: null,
        }
    },
    methods: {
        onAddUser() {
            console.log('onAddUser')
        },
        onCancel() {
            console.log('onCancel')
            this.$modal.hide('add-user')
        },
        onConfirm() {
            console.log('onConfirm')
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
