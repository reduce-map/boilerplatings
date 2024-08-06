<template>
    <div class="o-user-main">
        <div class="app-heading">
            <h2>
                {{ $t('app.Workspace') }}
            </h2>

            <div class="switchers">
                <toggle-button
                    v-model="viewType"
                    :width="80"
                    :labels="{
                        checked: $t('app.Cards'),
                        unchecked: $t('app.Table'),
                    }"
                />
            </div>
        </div>

        <ul v-if="isCards" class="projects-list">
            <li class="project-add" @click="onOpenAddProjectModal">
                <Card class="project-add-card">
                    <div slot="title" class="title">
                        <p>
                            {{ $t('app.Add_project') }}
                        </p>
                    </div>

                    <div class="add-project">
                        <i class="uil uil-plus-circle add-project-icon"></i>
                    </div>
                </Card>
            </li>
            <o-project-cart
                v-for="project in projectsList"
                :key="project.projectUuid"
                v-bind="{
                    project,
                }"
                @onProjectDelete="onOpenDeleteProjectModal"
                @onProjectEdit="onOpenEditProjectModal"
                @onProjectClick="onGoToProject"
            />
        </ul>

        <a-table
            class="projects-table app-table"
            v-bind="{
                data: projectsList,
            }"
        >
            <template slot="header">
                <div class="name app-col">
                    <div class="holder">
                        {{ $t('app.projectName') }}
                    </div>
                </div>
                <div class="role app-col">
                    {{ $t('app.Role') }}
                </div>
                <div class="actions app-col">
                    {{ $t('app.Actions') }}
                </div>
            </template>
            <template slot="row" slot-scope="{ row }">
                <div class="name app-col">
                    <div class="holder">
                        <span>
                            {{ row.projectName }}
                        </span>
                    </div>
                </div>
                <div class="role app-col">
                    <span> {{ row.roles.join(',') }} </span>
                </div>
                <div class="actions app-col">
                    <i
                        class="uil uil-arrow-right"
                        @click="
                            onGoToProject({
                                project: row,
                            })
                        "
                    />

                    <i
                        class="uil uil-pen edit"
                        @click="
                            onOpenEditProjectModal({
                                project: row,
                            })
                        "
                    />

                    <i
                        class="uil uil-trash-alt delete"
                        @click="
                            onOpenDeleteProjectModal({
                                project: row,
                            })
                        "
                    />
                </div>
            </template>

            <template slot="empty">
                <div class="empty">
                    <div class="empty-holder">
                        <p>No projects</p>
                    </div>
                </div>
            </template>
        </a-table>

        <a-modal
            class="add-project-modal"
            name="add-project"
            @onClose="onCloseAddProjectModal"
        >
            <h2>
                {{ $t('app.Add_project') }}
            </h2>

            <ValidationObserver
                ref="createProjectForm"
                tag="form"
                @submit.prevent="onCreateProject"
            >
                <div class="app-form-holder">
                    <div class="columns-holder">
                        <a-input
                            v-model="createProjectForm.projectName"
                            :validation="true"
                            :validation-config="{
                                name: 'projectName',
                                rules: {
                                    required: true,
                                },
                            }"
                            class="app-row"
                            :label="$t('app.Project_name')"
                            :placeholder="$t('app.Enter_project_name')"
                        />
                    </div>
                </div>

                <div class="btns-holder">
                    <Button
                        type="primary"
                        :loading="isLoading"
                        html-type="submit"
                    >
                        {{ $t('app.Save') }}
                    </Button>
                </div>
            </ValidationObserver>
        </a-modal>

        <a-modal
            class="edit-project-modal"
            name="edit-project"
            @onClose="onCloseEditProjectModal"
        >
            <h2>
                {{ $t('app.Edit_project') }}
            </h2>

            <ValidationObserver
                ref="updateProjectForm"
                tag="form"
                @submit.prevent="onUpdateProject"
            >
                <div class="app-form-holder">
                    <div class="columns-holder">
                        <a-input
                            v-model="editProjectForm.projectName"
                            :validation="true"
                            :validation-config="{
                                name: 'projectName',
                                rules: {
                                    required: true,
                                },
                            }"
                            class="app-row"
                            :label="$t('app.Project_name')"
                            :placeholder="$t('app.Enter_project_name')"
                        />
                    </div>
                </div>

                <div class="btns-holder">
                    <Button
                        type="primary"
                        :loading="isLoading"
                        html-type="submit"
                    >
                        {{ $t('app.Save') }}
                    </Button>
                </div>
            </ValidationObserver>
        </a-modal>

        <a-modal-confirmation
            class="delete-project-modal"
            name="delete-project"
            @onConfirm="onConfirmDeleteProject"
            @onDecline="onConfirmCloseDeleteProject"
            @onClose="onConfirmCloseDeleteProject"
        >
            <h2>
                {{ $t('app.Are_you_sure_project') }}
            </h2>
        </a-modal-confirmation>
    </div>
</template>

<script>
import { authComputed } from '@state/helpers'
import ProjectService from '@services/project-service'
import AModal from '@atoms/a-modal'
import AInput from '@atoms/a-input'
import ATable from '@atoms/a-table'
import { Button } from 'view-design'
import AModalConfirmation from '@atoms/a-modal-confirmation'
import { ValidationObserver } from 'vee-validate'
import OProjectCart from '@organisms/o-project-cart'
import { Card } from 'view-design'

export default {
    name: 'OUserMain',
    components: {
        Button,
        AModal,
        AInput,
        ValidationObserver,
        AModalConfirmation,
        OProjectCart,
        Card,
        ATable,
    },
    data() {
        return {
            isLoading: false,
            projectsList: [],

            createProjectForm: {
                projectName: '',
            },

            editProjectForm: {
                projectName: '',
                projectUuid: '',
            },

            rowToDelete: null,

            viewType: true,
        }
    },
    computed: {
        ...authComputed,
        isCards() {
            return this.viewType
        },
        isTable() {
            return !this.viewType
        },
    },
    async created() {
        await this.getProjects()
    },
    methods: {
        // TODO ask BE
        async getProjects() {
            const { items } = await ProjectService.getProjects({
                userUuid: this.userUuid,
                params: {
                    pageSize: 1000,
                },
            })

            this.projectsList = items
        },
        async onCreateProject() {
            const isValid = await this.$refs.createProjectForm.validate()
            if (!isValid) return

            await ProjectService.createProject({
                name: this.createProjectForm.projectName,
            })
            this.onCloseAddProjectModal()
            await this.getProjects()
        },

        // actions handlers
        async onConfirmDeleteProject() {
            await ProjectService.deleteProject({
                userUuid: this.rowToDelete.projectUuid,
            })
            await this.getProjects()
            this.onConfirmCloseDeleteProject()
        },

        async onUpdateProject() {
            const isValid = await this.$refs.updateProjectForm.validate()
            if (!isValid) return

            await ProjectService.updateProject({
                projectUuid: this.editProjectForm.projectUuid,
                data: {
                    name: this.editProjectForm.projectName,
                },
            })
            this.onCloseEditProjectModal()
            await this.getProjects()
        },

        onGoToProject({ project }) {
            this.$router.push({
                name: 'project-main',
                params: { projectUuid: project.projectUuid },
            })
        },

        //    modals
        onOpenAddProjectModal() {
            this.createProjectForm = {
                projectName: '',
            }
            this.$modal.show('add-project')
        },

        onOpenEditProjectModal({ project }) {
            this.editProjectForm = {
                projectName: project.projectName,
                projectUuid: project.projectUuid,
            }
            this.$modal.show('edit-project')
        },

        onCloseAddProjectModal() {
            this.$modal.hide('add-project')
        },
        onCloseEditProjectModal() {
            this.editProjectForm = {
                projectName: '',
                projectUuid: '',
            }
            this.$modal.hide('edit-project')
        },
        onOpenDeleteProjectModal({ project }) {
            this.rowToDelete = project
            this.$modal.show('delete-project')
        },
        onConfirmCloseDeleteProject() {
            this.rowToDelete = null
            this.$modal.hide('delete-project')
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
