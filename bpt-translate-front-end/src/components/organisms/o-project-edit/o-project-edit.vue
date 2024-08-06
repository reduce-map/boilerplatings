<template>
    <div class="o-project-edit">
        <h2>
            Настройки проекта
        </h2>

        <ValidationObserver
            ref="updateProjectForm"
            tag="form"
            class="project-form"
            @submit.prevent="onUpdateProject"
        >
            <div class="columns-holder">
                <a-input
                    v-model="localProject.projectName"
                    class="form-element"
                    :validation="true"
                    :validation-config="{
                        name: 'projectName',
                        rules: {
                            required: true,
                        },
                    }"
                    label="Название проекта"
                    :placeholder="'Введите название проекта'"
                />
            </div>

            <div class="btns-holder">
                <Button type="primary" :loading="isLoading" html-type="submit">
                    Сохранить
                </Button>
            </div>
        </ValidationObserver>

        <div class="project-languages">
            <span class="app-label">Список языков проекта: </span>
            <Select
                v-if="isProjectLanguagesLoaded"
                class="form-element"
                :value="selectedLanguages"
                multiple
                filterable
                :placeholder="'Выберете языки проекта'"
                @on-change="onLanguageSectionChange"
            >
                <Option
                    v-for="language in languages"
                    :key="language.id"
                    :value="language.code"
                    >{{ language.name }}</Option
                >
            </Select>
        </div>
    </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import AInput from '@atoms/a-input'
import { projectMethods } from '@state/helpers'
import { Button, Select, Option } from 'view-design'
import { projectComputed, languageComputed } from '@state/helpers'
import ProjectService from '@services/project-service'
import LanguageService from '@services/language-service'

export default {
    name: 'OProjectEdit',
    components: {
        ValidationObserver,
        Button,
        AInput,
        Select,
        Option,
    },
    data() {
        return {
            isLoading: false,
            isProjectLanguagesLoaded: false,

            localProject: {},
            selectedLanguages: [],

            item: null,
            isSelectLoading: false,
        }
    },
    async created() {
        this.localProject = { ...this.project }

        await this.getProjectLanguages()
    },
    computed: {
        ...projectComputed,
        ...languageComputed,
    },
    methods: {
        ...projectMethods,
        async onUpdateProject() {
            const isValid = await this.$refs.updateProjectForm.validate()
            if (!isValid) return

            this.isLoading = true

            try {
                await ProjectService.updateProject({
                    projectUuid: this.localProject.projectUuid,
                    data: {
                        name: this.localProject.projectName,
                    },
                })

                // TODO move to store and fire getProjectInfo
                this.setProject({
                    project: {
                        ...this.project,
                        ...{
                            projectName: this.localProject.projectName,
                        },
                    },
                })
            } catch (err) {
                console.log(err)
            }

            this.isLoading = false
        },

        async getProjectLanguages() {
            try {
                const { items } = await LanguageService.getProjectLanguages({
                    projectUuid: this.localProject.projectUuid,
                    params: {
                        pageSize: 1000,
                    },
                })
                this.selectedLanguages = items.map(lang => lang.code)
                this.isProjectLanguagesLoaded = true
            } catch (err) {
                console.log(err)
            }
        },

        async onLanguageSectionChange(options) {
            // iview spesific mapping data from strings
            // TODO move to utils
            const addedOptions = options.filter(
                x => !this.selectedLanguages.includes(x)
            )
            const removedOptions = this.selectedLanguages.filter(
                x => !options.includes(x)
            )

            // TODO check error handing for deleting main language
            try {
                if (addedOptions.length > 0) {
                    await LanguageService.addLanguage({
                        projectUuid: this.localProject.projectUuid,
                        data: [
                            {
                                code: addedOptions[0],
                            },
                        ],
                    })
                }

                if (removedOptions.length > 0) {
                    await LanguageService.deleteProjectLanguage({
                        projectUuid: this.localProject.projectUuid,
                        langCode: removedOptions[0],
                    })
                }
            } catch (err) {
                console.log(err)
            }

            await this.getProjectLanguages()
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
