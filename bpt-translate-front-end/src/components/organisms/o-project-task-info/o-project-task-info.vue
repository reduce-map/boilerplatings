<template>
    <div class="o-project-task-info">
        <div class="app-heading">
            <h2>
                Translation
            </h2>

            <div class="controls">
                <span class="back" @click="onBtnBackClick">
                    <i class="uil uil-arrow-left"></i> Back
                </span>
            </div>
        </div>

        <div class="holder">
            <div class="side">
                <o-project-resources-viewer
                    filterable
                    searchable
                    v-bind="{
                        needToUpdate,
                    }"
                    @resourceClick="onResourceClick"
                />
            </div>
            <div
                v-if="isResourseSelected"
                class="project-resources-viewer-content translation"
            >
                <div class="app-row">
                    <strong>Выберете языки ресурсов</strong>

                    <CheckboxGroup v-model="selectedLanguages">
                        <Checkbox
                            v-for="language in resourceLang"
                            :key="language.code"
                            :label="language.code"
                        >
                            {{ language.name }}
                        </Checkbox>
                    </CheckboxGroup>
                </div>

                <div
                    class="translation__content-col"
                    :class="{ columns: isColumns }"
                >
                    <div class="translation__content-tab-wrap">
                        <div class="translation__content-tab-col">
                            <div
                                :class="{ 'btn-primary': isActiveMaster }"
                                class="translation__content-tab-item"
                                @click="setActiveMaster"
                            >
                                {{ resourceClicked.primaryLanguage }}
                            </div>
                        </div>
                        <div class="translation__content-tab-col col-lang">
                            <div class="translation__content-tab-lang">
                                <div
                                    v-for="lang in filteredLanguagesForTab"
                                    :key="lang"
                                    :class="{
                                        'btn-primary': isActiveLang === lang,
                                    }"
                                    class="translation__content-tab-item"
                                    @click="setActive(lang)"
                                >
                                    {{ lang }}
                                </div>
                            </div>
                            <div
                                :class="{ 'btn-primary': isColumns }"
                                class="translation__content-tab-item col-btn"
                                @click="setColumns"
                            >
                                <i class="uil uil-web-grid-alt" />
                            </div>
                        </div>
                    </div>
                    <div class="translation__content-text">
                        <div class="block">
                            <div class="col-block">
                                <textarea
                                    v-model="textColumnsMaster"
                                    readonly
                                    class="form-control"
                                />
                            </div>
                            <div class="col-block">
                                <textarea
                                    v-model="textColumnsSecond"
                                    readonly
                                    class="form-control"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <b-form-textarea
                    v-model="translationText"
                    class="app-row"
                    placeholder="Enter something..."
                    rows="3"
                    max-rows="6"
                />
                <Button type="primary" @click="onSave">
                    Save
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
import { Button, CheckboxGroup, Checkbox } from 'view-design'
import OProjectResourcesViewer from '@organisms/o-project-resources-viewer'
import TaskService from '@services/task-service'
import LanguageService from '@services/language-service'
import ResourceService from '@services/resource-service'
import {
    projectComputed,
    languageComputed,
    resourcesComputed,
} from '@state/helpers'

export default {
    name: 'OProjectTaskInfo',
    components: {
        Button,
        OProjectResourcesViewer,
        CheckboxGroup,
        Checkbox,
    },
    data() {
        return {
            isResourseSelected: false,
            task: {},

            test: '123123',

            // will load
            projectLanguages: [],

            // get frm conponentnt clicked resource
            resourceClicked: {},

            // selectedResource get from server
            selectedResource: {},

            // CheckboxGroup
            selectedLanguages: [],
            selectedTags: [],

            isColumns: false,
            isActiveMaster: true,
            isActiveLang: '',
            textColumnsMaster: '',
            textColumnsSecond: '',
            page: 1,
            list: [],

            translationText: '',

            needToUpdate: false,
        }
    },
    computed: {
        ...projectComputed,
        ...languageComputed,
        ...resourcesComputed,
        projectUuid() {
            return this.$route.params.projectUuid
        },
        taskId() {
            return this.$route.params.taskId
        },
        resourceLang() {
            return this.projectLanguages.filter(lang => {
                return (
                    lang.code !== this.task.targetLanguage &&
                    lang.code !== this.resourceClicked.primaryLanguage
                )
            })
        },

        filteredLanguagesForTab() {
            const primaryLanguage = this.resourceClicked.primaryLanguage

            if (this.selectedResource.value) {
                return Object.keys(this.selectedResource.value).filter(
                    el => el !== primaryLanguage
                )
            }
            return []
        },
    },

    watch: {
        resourceClicked: {
            async handler() {
                await this.getResourceKey()
            },
            deep: true,
        },
        async selectedLanguages() {
            await this.getResourceKey()
        },
    },
    async created() {
        await Promise.all([this.getTask(), this.getProjectLanguages()])
    },
    methods: {
        async getResourceKey() {
            const selectedResource = await ResourceService.getResourceKey({
                projectUuid: this.projectUuid,
                key: this.resourceClicked.key,
                params: {
                    langs: [
                        this.task.targetLanguage,
                        this.resourceClicked.primaryLanguage,
                        ...this.selectedLanguages,
                    ].join(','),
                },
            })

            this.selectedResource = selectedResource
            this.test = selectedResource.value[this.task.targetLanguage]
        },

        onBtnBackClick() {
            this.$router.go(-1)
        },
        async onSave() {
            await ResourceService.updateResourceSingle({
                projectUuid: this.projectUuid,
                langCode: this.resourceClicked.primaryLanguage,
                key: this.resourceClicked.key,
                data: {
                    value: this.translationText,
                },
            })

            this.needToUpdate = true
        },
        onResourceClick(resource) {
            this.isResourseSelected = true

            this.resourceClicked = resource

            this.textColumnsMaster = resource.value
            this.translationText = resource.value

            this.needToUpdate = false
        },

        async getTask() {
            try {
                this.task = await TaskService.getTask({
                    projectUuid: this.projectUuid,
                    taskUuid: this.taskId,
                })
            } catch (err) {
                console.log(err)
            }
        },

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

        //    From Dmitry repo

        setActiveMaster() {
            const lang = this.resourceClicked.primaryLanguage
            this.textColumnsMaster = this.selectedResource.value[lang]
                ? this.selectedResource.value[lang]
                : 'No translation'
            this.isActiveMaster = true
            if (!this.isColumns) {
                // this.textColumnsSecond = '';
                this.isActiveLang = ''
            }
        },
        setActive(lang) {
            if (!this.isColumns) {
                this.textColumnsMaster = this.selectedResource.value[lang]
                    ? this.selectedResource.value[lang]
                    : 'No translation'
                this.isActiveMaster = false
            }
            this.isActiveLang = lang
            this.textColumnsSecond = this.selectedResource.value[lang]
                ? this.selectedResource.value[lang]
                : 'No translation'
            // this.textColumnsSecond = textColumns[lang];
        },
        setColumns() {
            this.isColumns = !this.isColumns
            if (this.isColumns) {
                this.setActiveMaster()
            } else {
                this.textColumnsSecond = ''
                this.isActiveLang = ''
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
