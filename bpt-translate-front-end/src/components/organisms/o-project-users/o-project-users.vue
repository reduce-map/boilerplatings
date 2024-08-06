<template>
    <div class="o-project-users">
        <div class="app-heading">
            <h2>
                {{ $t('app.Project_members') }}
            </h2>

            <div class="controls">
                <Button type="primary" @click="onOpenAddUserModal">
                    <i class="uil uil-plus" />
                    {{ $t('app.Add_user_to_project') }}
                </Button>
            </div>
        </div>

        <a-table
            class="language-table app-table"
            pagination
            v-bind="{
                data: tableData,
                page,
                pages,
                pageSize,
            }"
            @onLoadData="onLoadData"
        >
            <template slot="header">
                <div class="name app-col">
                    <div class="holder">
                        {{ $t('app.Name') }}
                    </div>
                </div>
                <div class="email app-col">
                    {{ $t('app.Email') }}
                </div>
                <div class="status app-col">
                    {{ $t('app.Confirmation_status') }}
                </div>
                <div class="role app-col">
                    {{ $t('app.Role') }}
                </div>
                <div class="lang app-col">
                    {{ $t('app.Known_languages') }}
                </div>
                <div class="actions app-col">
                    {{ $t('app.Actions') }}
                </div>
            </template>
            <template slot="row" slot-scope="{ row }">
                <div class="name app-col">
                    <div class="holder">
                        <span>
                            {{ row.name }}
                        </span>
                    </div>
                </div>
                <div class="email app-col">
                    <span> {{ row.login }} </span>
                </div>

                <div class="status app-col">
                    <div class="status-holder">
                        <i
                            :class="{
                                'app-confirmed': row.isConfirmed,
                                'app-not-confirmed': !row.isConfirmed,
                            }"
                            class="uil uil-check-circle icon-confirmation"
                        />

                        <template v-if="!row.isConfirmed">
                            (
                            <span
                                class="resent-invitation"
                                @click="onResetInvitationClick(row)"
                            >
                                Resend invitation
                            </span>
                            )
                        </template>
                    </div>
                </div>
                <div class="role app-col">
                    <span v-for="(role, index) in row.roles" :key="index">
                        {{ role }}
                    </span>
                </div>
                <div class="lang app-col">
                    <span
                        v-for="(lang, index) in row.knownLanguages"
                        :key="index"
                    >
                        {{ lang.name }}
                    </span>
                </div>

                <div class="actions app-col">
                    <i
                        class="uil uil-trash-alt delete"
                        @click="onOpenDeleteUserModal(row)"
                    />
                </div>
            </template>

            <template slot="empty">
                <div class="empty">
                    <div class="empty-holder">
                        <p>{{ $t('app.No_project_users') }}</p>
                    </div>
                </div>
            </template>
        </a-table>

        <a-modal-confirmation
            class="delete-user-modal"
            name="delete-user"
            @onConfirm="onConfirmDeleteUser"
            @onDecline="onConfirmCloseDeleteUser"
            @onClose="onConfirmCloseDeleteUser"
        >
            <h2>
                {{ $t('app.Delete_user') }}
            </h2>
            <div>
                {{ $t('app.confirm_delete_user') }}
            </div>
        </a-modal-confirmation>

        <a-modal
            class="add-user-modal"
            name="add-user"
            @onClose="onCloseAddUserModal"
        >
            <h2>
                {{ $t('app.Add_user') }}
            </h2>

            <ValidationObserver
                ref="addProjectUser"
                tag="form"
                @submit.prevent="onAddProjectUser"
            >
                <div class="app-form-holder">
                    <div class="columns-holder">
                        <a-input
                            v-model="addProjectUserForm.email"
                            :validation="true"
                            :validation-config="{
                                name: 'ProjectUser',
                                rules: {
                                    required: true,
                                    email: true,
                                },
                            }"
                            class="app-row"
                            label="Добавить участника проекта"
                            :placeholder="'Введите email участника проекта'"
                        />

                        <div class="role-selection-holder">
                            <span class="app-label">Выбере роль: </span>

                            <Select
                                v-model="addProjectUserForm.role"
                                filterable
                                class="app-row"
                                :placeholder="'Выберете роль участника'"
                            >
                                <Option
                                    v-for="(role, index) in roles"
                                    :key="index"
                                    :value="role"
                                    >{{ role }}</Option
                                >
                            </Select>
                        </div>
                    </div>

                    <div class="btns-holder">
                        <Button :loading="isLoadingAddUser" html-type="submit">
                            Добавить
                        </Button>
                    </div>
                </div>
            </ValidationObserver>
        </a-modal>
    </div>
</template>

<script>
import { Button, Select, Option } from 'view-design'
import { ValidationObserver } from 'vee-validate'
import AInput from '@atoms/a-input'
import AModal from '@atoms/a-modal'
import ATable from '@atoms/a-table'
import { authComputed, projectComputed } from '@state/helpers'
import UserService from '@services/user-service'
import AModalConfirmation from '@atoms/a-modal-confirmation'
import { Role } from '@/constants/role.js'

export default {
    name: 'OProjectUsers',
    components: {
        ATable,
        ValidationObserver,
        Button,
        AInput,
        AModal,
        AModalConfirmation,
        Select,
        Option,
    },
    data() {
        return {
            isLoading: false,
            isLoadingAddUser: false,

            tableData: [],
            page: 1,
            pages: 1,
            pageSize: 20,

            addProjectUserForm: {
                email: '',
                role: Role.owner,
                msgText: `Иди работать по адресу - `,
            },

            userUuidToDelete: null,
            origin: window.location.origin,

            roles: [Role.owner, Role.developer, Role.translator, Role.admin],
        }
    },

    computed: {
        ...authComputed,
        ...projectComputed,
        projectUuid() {
            return this.$route.params.projectUuid
        },
    },
    async created() {
        await this.getProjectUsers()
    },
    methods: {
        async getProjectUsers() {
            try {
                const { items, meta } = await UserService.getProjectUsers({
                    projectUuid: this.projectUuid,
                    params: {
                        pageNum: this.page,
                    },
                })

                this.tableData = items
                this.page = meta.pageNum
                this.pages = meta.totalPages
                this.pageSize = meta.pageSize
            } catch (err) {
                console.log(err)
            }
        },

        async onAddProjectUser() {
            const isValid = await this.$refs.addProjectUser.validate()
            if (!isValid) return

            this.isLoadingAddUser = true
            try {
                await UserService.addUserToProject({
                    projectUuid: this.projectUuid,
                    data: [
                        {
                            login: this.addProjectUserForm.email,
                            role: this.addProjectUserForm.role,
                            msgText: this.getMsgText({
                                url: this.getVerifyUrl(
                                    this.addProjectUserForm.email
                                ),
                                email: this.addProjectUserForm.email,
                                role: this.addProjectUserForm.role,
                                projectName:
                                    this.project && this.project.projectName,
                            }),
                        },
                    ],
                })
                this.onCloseAddUserModal()
                this.clearAddModalForm()
                await this.getProjectUsers()
            } catch (err) {
                console.log(err)
            }
            this.isLoadingAddUser = false
        },

        async onLoadData({ page }) {
            this.page = page
            await this.getProjectUsers()
        },

        async onConfirmDeleteUser() {
            await UserService.deleteProjectUser({
                projectUuid: this.projectUuid,
                userUuid: this.userUuidToDelete,
            })
            this.onConfirmCloseDeleteUser()
            await this.getProjectUsers()
        },

        async onResetInvitationClick(row) {
            await UserService.addUserToProject({
                projectUuid: this.projectUuid,
                data: [
                    {
                        login: row.name,
                        // TODO ask BE about consistency
                        role: row.roles[0],
                        msgText: this.getMsgText({
                            url: this.getVerifyUrl(row.login),
                            email: row.login,
                            role: row.roles[0],
                            projectName:
                                this.project && this.project.projectName,
                        }),
                    },
                ],
            })
        },

        // modals
        onOpenAddUserModal() {
            this.$modal.show('add-user')
        },

        onCloseAddUserModal() {
            this.$modal.hide('add-user')
        },

        onOpenDeleteUserModal(row) {
            this.userUuidToDelete = row.uuid
            this.$modal.show('delete-user')
        },
        onConfirmCloseDeleteUser() {
            this.userUuidToDelete = null
            this.$modal.hide('delete-user')
        },

        // clear modal data
        clearAddModalForm() {
            this.addProjectUserForm.email = ''
            this.addProjectUserForm.role = Role.owner
        },

        getMsgText({ url, email, role, projectName }) {
            return `
                You’ve been added to the ${projectName} as ${role}
                Go though the link ${url}, we’ll help you find your Translate Center workspaces

                If you didn’t request this email (${email}), there’s nothing to worry about — you can safely ignore it.
            `
        },

        getVerifyUrl(_email) {
            const email = encodeURI(_email)

            return `${this.origin}/confirm/verify?code={code}&login=${email}&projectUuid=${this.projectUuid}`
        },

        // TODO ask where need to fire this request
        async onConfirmUserStatus(row) {
            await UserService.confirmProjectUser({
                projectUuid: this.projectUuid,
                data: {
                    login: row.login,
                    code: 'en',
                },
            })
            await this.getProjectUsers()
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
