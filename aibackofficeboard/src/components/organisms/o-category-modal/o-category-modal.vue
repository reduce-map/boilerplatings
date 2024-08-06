<template>
    <a-modal class="o-category-modal" name="add-category">
        <h2 slot="header">
            ADD CATEGORY
        </h2>

        <div slot="default">
            <ValidationObserver
                ref="addUserForm"
                tag="form"
                @submit.prevent="onAddCategory"
            >
                <div class="app-form-holder">
                    <m-upload class="app-row" />

                    <a-app-row>
                        <span slot="label">
                            Subordinate to
                        </span>
                        <Select
                            v-model="addCategoryForm.role"
                            class="app-select app-select-no-border"
                            placeholder="Subordinate to"
                            clearable
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
                        v-model="addCategoryForm.telegram"
                        :validation="true"
                        :validation-config="{
                            name: 'Telegram',
                            rules: {
                                required: true,
                            },
                        }"
                        class="app-row"
                        :label="'Category name'"
                        :placeholder="'Type name'"
                    />
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
import { Select, Option } from 'view-design'

export default {
    name: 'OCategoryModal',
    components: {
        AAppRow,
        AModal,
        AInput,
        MBtnCancelConfirm,
        MUpload,
        Select,
        Option,
        ValidationObserver,
    },
    data() {
        return {
            addCategoryForm: {
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
        }
    },
    methods: {
        onAddCategory() {
            console.log('onAddUser')
        },
        onCancel() {
            this.$modal.hide('add-category')
        },
        onConfirm() {
            this.$modal.hide('add-category')
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
