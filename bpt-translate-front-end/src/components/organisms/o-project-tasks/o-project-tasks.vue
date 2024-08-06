<template>
    <div class="o-project-tasks">
        <div class="app-heading">
            <h2>
                Tasks
            </h2>

            <div class="controls">
                <Button type="primary" @click="onOpenAddTaskModal">
                    <i class="uil uil-plus"></i>
                    Add task
                </Button>
            </div>
        </div>

        <div class="task-container">
            <div>
                <div class="title-card">
                    TODO
                </div>
                <draggable
                    class="list-group todo"
                    :list="tasksToDo"
                    group="tasks"
                    @change="handleChangeToDo"
                >
                    <a-list
                        v-for="task in tasksToDo"
                        :key="task.uuid"
                        :sort="false"
                        class="list"
                        v-bind="{
                            task,
                        }"
                        @editTask="onEditTaskClick"
                        @acceptTask="onAcceptTaskClick"
                        @deleteTask="onDeleteTaskClick"
                    />
                </draggable>
            </div>
            <div>
                <div class="title-card">
                    In Progress
                </div>
                <draggable
                    class="list-group inWork"
                    :list="tasksInProgress"
                    group="tasks"
                    @change="handleChangeInProgress"
                >
                    <a-list
                        v-for="task in tasksInProgress"
                        :key="task.uuid"
                        :sort="false"
                        class="list"
                        v-bind="{
                            task,
                        }"
                        @editTask="onEditTaskClick"
                        @acceptTask="onAcceptTaskClick"
                        @deleteTask="onDeleteTaskClick"
                    />
                </draggable>
            </div>
            <div>
                <div class="title-card">
                    Completed
                </div>
                <draggable
                    class="list-group completed"
                    :list="tasksCompleted"
                    group="tasks"
                    @change="handleChangeCompleted"
                >
                    <a-list
                        v-for="task in tasksCompleted"
                        :key="task.uuid"
                        :sort="false"
                        class="list"
                        v-bind="{
                            task,
                        }"
                        @editTask="onEditTaskClick"
                        @acceptTask="onAcceptTaskClick"
                        @deleteTask="onDeleteTaskClick"
                    />
                </draggable>
            </div>
        </div>

        <a-modal
            class="add-task-modal"
            name="add-task"
            @onClose="onCloseAddTaskModal"
        >
            <h2>
                Добавить задачу
            </h2>

            <ValidationObserver
                ref="createTaskForm"
                tag="form"
                @submit.prevent="onCreateTask"
            >
                <div class="app-form-holder">
                    <div class="columns-holder">
                        <a-input
                            v-model="createTaskForm.title"
                            :validation="true"
                            :validation-config="{
                                name: 'Task_name',
                                rules: {
                                    required: true,
                                },
                            }"
                            class="app-row"
                            label="Название задачи"
                            placeholder="Введите название задачи"
                        />

                        <div class="app-row">
                            <span class="app-label">
                                Целевой язык задачи:
                            </span>
                            <Select
                                v-model="createTaskForm.taskLanguagesTarget"
                                filterable
                                clearable
                                placeholder="Выберете целевой язык задачи:"
                            >
                                <Option
                                    v-for="language in projectLanguages"
                                    :key="language.id"
                                    :value="language.code"
                                    >{{ language.name }}</Option
                                >
                            </Select>
                        </div>

                        <div class="app-row">
                            <span class="app-label">Assign To: </span>
                            <Select
                                v-model="createTaskForm.assignedTo"
                                clearable
                                filterable
                                placeholder="Assign To"
                            >
                                <Option
                                    v-for="member in projectMembers"
                                    :key="member.uuid"
                                    :value="member.uuid"
                                    >{{ member.name }}</Option
                                >
                            </Select>
                        </div>

                        <div class="app-row">
                            <span class="app-label">Task description: </span>
                            <b-form-textarea
                                v-model="createTaskForm.description"
                                placeholder="Enter something..."
                                rows="3"
                                max-rows="6"
                            ></b-form-textarea>
                        </div>

                        <div class="app-row">
                            <span class="app-label">
                                Bind resources
                            </span>
                            <RadioGroup v-model="createTaskForm.selectionKind">
                                <Radio label="all">
                                    <span>All</span>
                                </Radio>
                                <Radio label="query">
                                    <span>Group</span>
                                </Radio>
                                <Radio label="items">
                                    <span>Choose</span>
                                </Radio>
                            </RadioGroup>
                        </div>

                        <div class="app-row">
                            <template v-if="isTaskCreateSelectionAll">
                                You selected binding the task to all resources
                                and tags
                            </template>
                            <template v-if="isTaskCreateSelectionGroup">
                                <Select
                                    v-model="
                                        createTaskForm.resourceRequest.tags
                                    "
                                    multiple
                                    filterable
                                    placeholder="Select tags"
                                >
                                    <Option
                                        v-for="(tag, index) in tags"
                                        :key="index"
                                        :value="tag"
                                        >{{ tag }}</Option
                                    >
                                </Select>
                            </template>
                            <template v-if="isTaskCreateSelectionChoose">
                                <Select
                                    v-model="
                                        createTaskForm.resourceRequest.keys
                                    "
                                    multiple
                                    filterable
                                    placeholder="Select resources"
                                >
                                    <Option
                                        v-for="resource in resources"
                                        :key="resource.key"
                                        :value="resource.key"
                                        >{{ resource.value }}</Option
                                    >
                                </Select>
                            </template>
                        </div>
                    </div>
                </div>

                <div class="btns-holder">
                    <Button :loading="isLoading" html-type="submit">
                        Сохранить
                    </Button>
                </div>
            </ValidationObserver>
        </a-modal>

        <a-modal
            class="edit-task-modal"
            name="edit-task"
            @onClose="onCloseEditTaskModal"
        >
            <h2>
                Изменить задачу
            </h2>

            <ValidationObserver
                ref="editTaskForm"
                tag="form"
                @submit.prevent="onEditTask"
            >
                <div class="app-form-holder">
                    <div class="columns-holder">
                        <a-input
                            v-model="editTaskForm.title"
                            :validation="true"
                            :validation-config="{
                                name: 'Task_name',
                                rules: {
                                    required: true,
                                },
                            }"
                            class="app-row"
                            label="Название задачи"
                            placeholder="Введите название задачи"
                        />

                        <!--                        <div class="app-row">-->
                        <!--                            <span class="app-label">Список языков задачи:</span>-->
                        <!--                            <Select-->
                        <!--                                v-model="editTaskForm.targetLanguage"-->
                        <!--                                multiple-->
                        <!--                                placeholder="Выберете список язков задачи"-->
                        <!--                            >-->
                        <!--                                <Option-->
                        <!--                                    v-for="language in languages"-->
                        <!--                                    :key="language.id"-->
                        <!--                                    :value="language.code"-->
                        <!--                                    >{{ language.name }}</Option-->
                        <!--                                >-->
                        <!--                            </Select>-->
                        <!--                        </div>-->

                        <div class="app-row">
                            <span class="app-label">
                                Target Language
                            </span>

                            <Select
                                v-model="editTaskForm.targetLanguage"
                                placeholder="Target Language"
                            >
                                <Option
                                    v-for="language in projectLanguages"
                                    :key="language.id"
                                    :value="language.code"
                                    >{{ language.name }}</Option
                                >
                            </Select>
                        </div>

                        <div class="app-row">
                            <span class="app-label">Assign To: </span>
                            <Select
                                v-model="editTaskForm.assignedTo"
                                clearable
                                placeholder="Assign To"
                            >
                                <Option
                                    v-for="member in projectMembers"
                                    :key="member.uuid"
                                    :value="member.uuid"
                                    >{{ member.name }}</Option
                                >
                            </Select>
                        </div>

                        <div class="app-row">
                            <span class="app-label">Task description: </span>
                            <b-form-textarea
                                v-model="editTaskForm.description"
                                placeholder="Enter something..."
                                rows="3"
                                max-rows="6"
                            ></b-form-textarea>
                        </div>

                        <div class="app-row">
                            <span class="app-label">
                                Bind resources:
                            </span>

                            <RadioGroup v-model="editTaskForm.selectionKind">
                                <Radio label="all">
                                    <span>All</span>
                                </Radio>
                                <Radio label="group">
                                    <span>Group</span>
                                </Radio>
                                <Radio label="choose">
                                    <span>Choose</span>
                                </Radio>
                            </RadioGroup>
                        </div>

                        <div class="app-row">
                            <template v-if="isTaskEditSelectionAll">
                                You selected binding the task to all resources
                                and tags
                            </template>
                            <template v-if="isTaskEditSelectionGroup">
                                <Select
                                    v-model="editTaskForm.resourceRequest.tags"
                                    multiple
                                    placeholder="Select tags"
                                >
                                    <Option
                                        v-for="(tag, index) in tags"
                                        :key="index"
                                        :value="tag"
                                        >{{ tag }}</Option
                                    >
                                </Select>
                            </template>
                            <template v-if="isTaskEditSelectionChoose">
                                <!--                                <Select-->
                                <!--                                    v-model="editTaskForm.resourceRequest.keys"-->
                                <!--                                    multiple-->
                                <!--                                    placeholder="Select resources"-->
                                <!--                                >-->
                                <!--                                    <Option-->
                                <!--                                        v-for="resource in resources"-->
                                <!--                                        :key="resource.key"-->
                                <!--                                        :value="resource.key"-->
                                <!--                                        >{{ resource.value }}</Option-->
                                <!--                                    >-->
                                <!--                                </Select>-->
                                <o-project-resources-viewer
                                    class="resources-viewer"
                                    is-check-able
                                    @selectedResources="onSelectedResources"
                                />
                            </template>
                        </div>
                    </div>
                </div>

                <div class="btns-holder">
                    <Button :loading="isLoading" html-type="submit">
                        Сохранить
                    </Button>
                </div>
            </ValidationObserver>
        </a-modal>
    </div>
</template>

<script>
import { Button, Select, Option, RadioGroup, Radio } from 'view-design'
import AModal from '@atoms/a-modal'
import AInput from '@atoms/a-input'
import { ValidationObserver } from 'vee-validate'
import draggable from 'vuedraggable'
import AList from '@atoms/a-list'
import OProjectResourcesViewer from '@organisms/o-project-resources-viewer'
import {
    languageComputed,
    resourcesComputed,
    projectComputed,
} from '@state/helpers'
import UserService from '@services/user-service'
import LanguageService from '@services/language-service'
import TaskService from '@services/task-service'

export default {
    name: 'OProjectTasks',
    components: {
        Button,
        AModal,
        AInput,
        ValidationObserver,
        Select,
        Option,
        Radio,
        RadioGroup,
        draggable,
        AList,
        OProjectResourcesViewer,
    },
    data: () => ({
        // statuses
        isLoading: false,
        isLoaded: false,

        // will load from server
        tasksList: [],
        projectMembers: [],
        projectLanguages: [],

        // createTaskForm data
        createTaskForm: {
            assignedTo: '',
            title: '',
            taskLanguagesTarget: '',
            description: '',
            selectionKind: 'all',
            resourceRequest: {
                tags: [],
                keys: [],
            },
        },

        // editTaskForm data
        editTaskForm: {
            uuid: '',
            createdAt: '',
            updatedAt: '',
            createdBy: {},
            updatedBy: '',
            assignedTo: {
                uuid: '',
                login: '',
            },
            targetLanguage: '',
            status: '',
            title: '',
            description: '',
            selectionKind: '',
            resourceRequest: {},
        },
    }),
    computed: {
        ...languageComputed,
        ...resourcesComputed,
        ...projectComputed,
        projectUuid() {
            return this.$route.params.projectUuid
        },
        // TODO move status tasks to constants, ask BE regarding statuses
        tasksToDo() {
            return this.tasksList.filter(task => task.status === 'todo')
        },
        tasksInProgress() {
            return this.tasksList.filter(task => task.status === 'inprogress')
        },
        tasksCompleted() {
            return this.tasksList.filter(task => {
                return (
                    task.status === 'translator' || task.status === 'approved'
                )
            })
        },

        // create task form getter for selectionKind status
        isTaskCreateSelectionAll() {
            return this.createTaskForm.selectionKind === 'all'
        },
        isTaskCreateSelectionGroup() {
            return this.createTaskForm.selectionKind === 'group'
        },
        isTaskCreateSelectionChoose() {
            return this.createTaskForm.selectionKind === 'choose'
        },

        isTaskEditSelectionAll() {
            return this.editTaskForm.selectionKind === 'all'
        },
        isTaskEditSelectionGroup() {
            return this.editTaskForm.selectionKind === 'group'
        },
        isTaskEditSelectionChoose() {
            return this.editTaskForm.selectionKind === 'choose'
        },
    },
    async created() {
        await Promise.all([
            this.getTasks(),
            this.getProjectUsers(),
            this.getProjectLanguages(),
        ])
    },
    methods: {
        async getProjectLanguages() {
            try {
                const { items } = await LanguageService.getProjectLanguages({
                    projectUuid: this.projectUuid,
                    params: {
                        pageSize: 1000,
                    },
                })

                this.projectLanguages = items
            } catch (err) {
                console.log(err)
            }
        },
        async getTasks() {
            try {
                let { items, meta } = await TaskService.getProjectTasks({
                    projectUuid: this.projectUuid,
                    params: {
                        pageSize: 1000,
                    },
                })

                this.tasksList = items
                this.page = meta.pageNum
                this.pages = meta.totalItems
                this.pageSize = meta.pageSize
            } catch (err) {
                console.log(err)
            }
        },

        async handleChangeToDo({ added }) {
            if (added) {
                try {
                    await this.handleChange({
                        task: added.element,
                        statusToChange: 'todo',
                        typeToChange: 'add', // added exists
                    })
                } catch (err) {
                    console.log(err)
                }
            }
        },

        async handleChangeInProgress({ added }) {
            if (added) {
                try {
                    await this.handleChange({
                        task: added.element,
                        statusToChange: 'inprogress',
                        typeToChange: 'add', // added exists
                    })
                } catch (err) {
                    console.log(err)
                }
            }
        },

        async handleChangeCompleted({ added }) {
            if (added) {
                try {
                    await this.handleChange({
                        task: added.element,
                        statusToChange: 'translator',
                        typeToChange: 'add', // added exists
                    })
                } catch (err) {
                    console.log(err)
                }
            }
        },

        async handleChange({ task, statusToChange, typeToChange }) {
            if (typeToChange === 'add') {
                await TaskService.editTask({
                    projectUuid: this.projectUuid,
                    taskUuid: task.uuid,
                    data: {
                        status: statusToChange,
                    },
                })
            }

            await this.getTasks()
        },

        async getProjectUsers() {
            const { items } = await UserService.getProjectUsers({
                projectUuid: this.projectUuid,
                params: {
                    pageSize: 1000,
                },
            })

            this.projectMembers = items
        },

        async onCreateTask() {
            const isValid = await this.$refs.createTaskForm.validate()
            if (!isValid) return

            try {
                await TaskService.createTask({
                    projectUuid: this.projectUuid,
                    data: {
                        assignedTo: this.createTaskForm.assignedTo,
                        targetLanguage: this.createTaskForm.taskLanguagesTarget,
                        title: this.createTaskForm.title,
                        description: this.createTaskForm.description,
                        selectionKind: this.createTaskForm.selectionKind,
                        resourceRequest: {
                            tags: this.createTaskForm.resourceRequest.tags,
                            keys: this.createTaskForm.resourceRequest.keys,
                        },
                    },
                })
                this.onCloseAddTaskModal()
                await this.getTasks()
                this.clearFormAddTaskModal()
            } catch (err) {
                console.log(err)
            }
        },

        async onDeleteTaskClick({ task }) {
            try {
                await TaskService.deleteTask({
                    projectUuid: this.projectUuid,
                    taskUuid: task.uuid,
                })
                await this.getTasks()
            } catch (err) {
                console.log(err)
            }
        },

        async onEditTask() {
            const isValid = await this.$refs.editTaskForm.validate()
            if (!isValid) return

            const resourceRequest = {}

            if (this.editTaskForm.selectionKind === 'group') {
                resourceRequest.tags = this.editTaskForm.resourceRequest.tags
            }

            if (this.editTaskForm.selectionKind === 'choose') {
                resourceRequest.keys = this.editTaskForm.resourceRequest.keys
            }

            console.log(resourceRequest)

            try {
                await TaskService.editTask({
                    projectUuid: this.projectUuid,
                    taskUuid: this.editTaskForm.uuid,
                    data: {
                        title: this.editTaskForm.title,
                        targetLanguage: this.editTaskForm.targetLanguage,
                        assignedTo: this.editTaskForm.assignedTo,
                        description: this.editTaskForm.description,
                        selectionKind: this.editTaskForm.selectionKind,
                        resourceRequest,
                    },
                })
                this.onCloseEditTaskModal()
                await this.getTasks()
            } catch (err) {
                console.log(err)
            }
        },

        onSelectedResources(resources) {
            this.editTaskForm.resourceRequest.keys = [...resources]
        },

        // modals
        onOpenAddTaskModal() {
            this.$modal.show('add-task')
        },
        onCloseAddTaskModal() {
            this.$modal.hide('add-task')
        },
        clearFormAddTaskModal() {
            this.createTaskForm.assignedTo = ''
            this.createTaskForm.title = ''
            this.createTaskForm.taskLanguagesSelected = ''
            this.createTaskForm.taskLanguagesTarget = ''
            this.createTaskForm.description = ''
            this.createTaskForm.selectionKind = ''
            this.createTaskForm.resourceRequest.tags = []
            this.createTaskForm.resourceRequest.keys = []
        },

        // tasks functions
        async onEditTaskClick({ task }) {
            this.editTaskForm.uuid = task.uuid
            this.editTaskForm.createdAt = task.createdAt
            this.editTaskForm.updatedAt = task.updatedAt
            this.editTaskForm.createdBy = task.createdBy
            this.editTaskForm.updatedBy = task.updatedBy

            // set uuid!
            this.editTaskForm.assignedTo = task.assignedTo.uuid
            this.editTaskForm.targetLanguage = task.targetLanguage
            this.editTaskForm.status = task.status
            this.editTaskForm.title = task.title
            this.editTaskForm.description = task.description
            this.editTaskForm.selectionKind = task.selectionKind
            this.editTaskForm.resourceRequest = task.resourceRequest

            this.$modal.show('edit-task')
        },

        onAcceptTaskClick({ task }) {
            this.$router.push({
                name: 'project-task-info',
                params: { taskId: task.uuid },
            })
        },
        onCloseEditTaskModal() {
            this.$modal.hide('edit-task')
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
