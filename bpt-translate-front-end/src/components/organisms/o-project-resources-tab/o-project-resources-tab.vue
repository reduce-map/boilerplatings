<template>
    <div class="o-project-resources-tab">
        <div class="controls">
            <div class="column">
                <div class="controls-row search">
                    <a-input
                        v-model="resourcesSearch"
                        class="app-row"
                        label="Resources search"
                        placeholder="Resources search:"
                    />

                    <Spin v-if="isLoadingResourcesSearch" class="spin" />
                </div>
                <div class="controls-row columns">
                    <div class="column">
                        <strong>Выберете языки ресурсов</strong>
                        <CheckboxGroup v-model="selectedLanguagesCodes">
                            <Checkbox
                                v-for="language in languagesFilteredForTab"
                                :key="language.code"
                                :label="language.code"
                            >
                                {{ language.name }}
                            </Checkbox>
                        </CheckboxGroup>
                    </div>

                    <div class="column">
                        <strong>Выберете теги ресурсов</strong>
                        <CheckboxGroup v-model="selectedTags">
                            <Checkbox
                                v-for="tag in tags"
                                :key="tag"
                                :label="tag"
                            >
                                {{ tag }}
                            </Checkbox>
                        </CheckboxGroup>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="controls-row">
                    <Button type="primary" @click="onOpenAddResourceModal">
                        <i class="uil uil-plus" />
                        Добавить ресурс
                    </Button>
                </div>
            </div>
        </div>

        <a-table
            class="resources-list-table app-table"
            pagination
            v-bind="{
                data: tableData,
                page,
                pages,
            }"
            @onLoadData="onLoadData"
        >
            <template slot="header">
                <div class="resources app-col">
                    <div class="resources-holder">
                        Keys
                    </div>
                </div>

                <div class="value app-col">
                    <div class="resources-holder">
                        {{ lang.name }}
                    </div>
                </div>

                <div class="tags app-col">
                    <div class="resources-holder">
                        Resources tags
                    </div>
                </div>

                <div
                    v-for="language of selectedLanguages"
                    :key="language.code"
                    class="lang app-col"
                >
                    {{ language.name }}
                </div>

                <div class="actions app-col">
                    {{ $t('app.Actions') }}
                </div>
            </template>
            <template slot="row" slot-scope="{ row }">
                <div class="resources app-col">
                    <div class="resources-holder">
                        <span>
                            {{ row.key }}
                        </span>
                    </div>
                </div>

                <div class="value app-col">
                    <!--                    row.value-->
                    <!--                    {{row.value}}-->
                    <span>
                        <template v-if="row.value[lang.code]">
                            {{ row.value[lang.code] }}
                        </template>
                        <template v-else>
                            {{ row.value }}
                        </template>
                    </span>
                </div>

                <div class="tags app-col">
                    <div class="resources-holder">
                        <span>
                            {{ row.tags.join(',') }}
                        </span>
                    </div>
                </div>

                <div
                    v-for="language of selectedLanguages"
                    :key="language.code"
                    class="lang app-col"
                >
                    {{ row.value[language.code] }}
                </div>

                <div class="actions app-col">
                    <i
                        class="uil uil-trash-alt delete"
                        @click="onOpenDeleteResourceModal(row)"
                    />
                    <i
                        class="uil uil-edit edit"
                        @click="onOpenEditResourceModal(row)"
                    />
                </div>
            </template>

            <template slot="empty">
                <div class="empty">
                    <div class="empty-holder">
                        <p>You don't have any resources</p>
                    </div>
                </div>
            </template>
        </a-table>

        <a-modal
            class="add-resource-modal"
            name="add-resource"
            @onClose="onCloseAddResourceModal"
        >
            <h2>Добавить ресурс для языка {{ lang.name }}</h2>

            <RadioGroup v-model="createResourceForm.typeLoad">
                <Radio label="text">
                    <span>Введите текст</span>
                </Radio>
                <Radio label="file">
                    <span>Загрузить файл</span>
                </Radio>
            </RadioGroup>

            <template v-if="isResourceFile">
                <div class="row-modal">
                    <p>Загрузить ресурс {{ loadUrl }}</p>

                    <Upload :action="loadUrl" :headers="headersUpload">
                        <Button icon="ios-cloud-upload-outline">
                            Upload files
                        </Button>
                    </Upload>
                </div>
            </template>
            <template v-if="isResourceText">
                <ValidationObserver
                    ref="addResourcesForm"
                    tag="form"
                    @submit.prevent="onAddResource"
                >
                    <div class="columns-holder">
                        <a-input
                            v-model="createResourceForm.key"
                            :validation="true"
                            :validation-config="{
                                name: 'resourceName',
                                rules: {
                                    required: true,
                                },
                            }"
                            class="app-row-form"
                            label="Ключ ресурса"
                            :placeholder="'Введите ключ ресурса'"
                        />

                        <Select
                            v-model="createResourceForm.tags"
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

                        <ValidationProvider
                            v-slot="{ errors }"
                            name="resourceDescription"
                            :rules="{
                                required: true,
                            }"
                            mode="eager"
                        >
                            <b-form-textarea
                                v-model="createResourceForm.value"
                                placeholder="Enter something..."
                                rows="3"
                                max-rows="6"
                            />
                            <span class="app-error">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>

                    <div class="btns-holder">
                        <Button
                            :loading="isLoadingAddResource"
                            html-type="submit"
                        >
                            Создать
                        </Button>
                    </div>
                </ValidationObserver>
            </template>
        </a-modal>

        <a-modal
            class="edit-resource-modal"
            name="edit-resource"
            @onClose="onCloseEditResourceModal"
        >
            <h2>
                Изменить ресурс {{ editResourceForm.key }} для языка
                {{ lang.name }}
            </h2>

            <ValidationObserver
                ref="editResourcesForm"
                tag="form"
                @submit.prevent="onEditResource"
            >
                <div class="columns-holder">
                    <a-input
                        v-model="editResourceForm.value"
                        :validation="true"
                        :validation-config="{
                            name: 'resourceValueName',
                            rules: {
                                required: true,
                            },
                        }"
                        class="app-row-form"
                        label="главное значение ключа ресурса"
                        :placeholder="'Изменить главное значение ключа ресурса'"
                    />

                    <p>Изменить tag ресурса</p>
                    <Select
                        v-model="editResourceForm.tags"
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
                </div>

                <div class="btns-holder">
                    <Button :loading="isLoadingEditResource" html-type="submit">
                        Изменить
                    </Button>
                </div>
            </ValidationObserver>
        </a-modal>

        <a-modal-confirmation
            class="delete-resource-modal"
            name="delete-resource-modal"
            @onConfirm="onConfirmDeleteResource"
            @onDecline="onConfirmCloseDeleteResource"
            @onClose="onConfirmCloseDeleteResource"
        >
            <h2>
                Delete resource
            </h2>
            <div>
                Are you sure that you want to delete resource key -
                {{ resourceToDelete && resourceToDelete.key }} for language
                {{ lang.name }}
            </div>
        </a-modal-confirmation>
    </div>
</template>

<script>
import {
    Button,
    RadioGroup,
    Radio,
    Upload,
    Select,
    Option,
    Checkbox,
    CheckboxGroup,
    Spin,
} from 'view-design'
import AModalConfirmation from '@atoms/a-modal-confirmation'
import ATable from '@atoms/a-table'
import AInput from '@atoms/a-input'
import AModal from '@atoms/a-modal'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import _ from 'lodash'

import { resourcesComputed, authComputed } from '@state/helpers'
import ResourceService from '@services/resource-service'

export default {
    name: 'OProjectResourcesTab',
    components: {
        Button,
        ATable,
        RadioGroup,
        Radio,
        Upload,
        AInput,
        AModal,
        AModalConfirmation,
        ValidationObserver,
        ValidationProvider,
        Select,
        Option,
        Checkbox,
        CheckboxGroup,
        Spin,
    },
    props: {
        lang: {
            type: Object,
            required: true,
        },
        projectLang: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            resourceToDelete: null,
            isLoading: false,
            isLoadingResourcesSearch: false,
            isLoadingAddResource: false,
            isLoadingEditResource: false,

            tableData: [],
            page: 1,
            pages: 1,

            // table filters data
            selectedLanguagesCodes: [],
            selectedTags: [],
            resourcesSearch: '',

            // data add
            createResourceForm: {
                key: '',
                value: '',
                tags: [],
                typeLoad: 'text',
            },

            // data edit
            editResourceForm: {
                key: '',
                value: '',
                tags: [],
            },
        }
    },
    computed: {
        ...resourcesComputed,
        ...authComputed,
        projectUuid() {
            return this.$route.params.projectUuid
        },
        isResourceFile() {
            return this.createResourceForm.typeLoad === 'file'
        },
        isResourceText() {
            return this.createResourceForm.typeLoad === 'text'
        },
        primaryLang() {
            return this.lang.code
        },
        languagesFilteredForTab() {
            return this.projectLang.filter(lang => {
                return lang.code !== this.lang.code
            })
        },
        selectedLanguages() {
            return this.selectedLanguagesCodes.map(code => {
                return this.languagesFilteredForTab.filter(lang => {
                    return lang.code === code
                })[0]
            })
        },
        loadUrl() {
            return `/projects/${this.projectUuid}/${this.lang.code}/resource-uploads`
        },
        headersUpload() {
            return {
                Authorization: this.authToken,
            }
        },
    },
    watch: {
        selectedLanguagesCodes() {
            this.getResources()
        },
        selectedTags() {
            this.getResources()
        },
        resourcesSearch: _.debounce(function() {
            this.getResources()
        }, 100),
    },
    async created() {
        await this.getResources()
    },
    methods: {
        async getResources() {
            this.isLoading = true

            const params = {
                pageNum: this.page,
                primaryLang: this.primaryLang,
            }

            params.langs = [
                this.primaryLang,
                ...this.selectedLanguagesCodes,
            ].join(',')

            if (this.resourcesSearch.length) {
                params.query = this.resourcesSearch
                this.isLoadingResourcesSearch = true
            }

            if (this.selectedTags.length) {
                params.tags = this.selectedTags.join(',')
            }

            try {
                const { items, meta } = await ResourceService.getResources({
                    projectUuid: this.projectUuid,
                    params,
                })

                this.tableData = items

                this.page = meta.pageNum
                this.pages = meta.totalPages
                this.langs = meta.langs
            } catch (err) {
                console.log(err)
            }

            this.isLoading = false
            this.isLoadingResourcesSearch = false
        },

        async onLoadData({ page }) {
            this.page = page
            await this.getResources()
        },

        async onAddResource() {
            const isValid = await this.$refs.addResourcesForm.validate()
            if (!isValid) return

            this.isLoadingAddResource = true
            try {
                await ResourceService.addResources({
                    projectUuid: this.projectUuid,
                    langCode: this.lang.code,
                    data: [
                        {
                            key: this.createResourceForm.key,
                            value: this.createResourceForm.value,
                            tags: this.createResourceForm.tags,
                        },
                    ],
                })
                this.onCloseAddResourceModal()
                await this.getResources()
            } catch (err) {
                console.log(err)
            }
            this.isLoadingAddResource = false
        },

        async onEditResource() {
            this.isLoadingEditResource = true
            try {
                await ResourceService.updateResourceInfo({
                    projectUuid: this.projectUuid,
                    key: this.editResourceForm.key,
                    data: {
                        // TODO check seems doesn't update the value
                        value: this.editResourceForm.value,
                        tags: this.editResourceForm.tags,
                        primaryLanguage: this.lang.code,
                    },
                })
                this.onCloseEditResourceModal()
                await this.getResources()
            } catch (err) {
                console.log(err)
            }
            this.isLoadingEditResource = false
        },

        async onConfirmDeleteResource() {
            try {
                await ResourceService.deleteResourceKey({
                    projectUuid: this.projectUuid,
                    key: this.resourceToDelete.key,
                })

                this.onConfirmCloseDeleteResource()
                await this.getResources()
            } catch (err) {
                console.log(err)
            }
        },

        // modals
        onOpenAddResourceModal() {
            this.$modal.show('add-resource')
        },
        onCloseAddResourceModal() {
            this.$modal.hide('add-resource')
        },

        onOpenDeleteResourceModal(resource) {
            this.resourceToDelete = resource
            this.$modal.show('delete-resource-modal')
        },
        onConfirmCloseDeleteResource() {
            this.resourceToDelete = null
            this.$modal.hide('delete-resource-modal')
        },

        onOpenEditResourceModal(row) {
            this.editResourceForm.key = row.key
            this.editResourceForm.value = row.value[this.lang.code]
                ? row.value[this.lang.code]
                : row.value
            this.editResourceForm.tags = row.tags

            this.$modal.show('edit-resource')
        },
        onCloseEditResourceModal() {
            this.editResourceForm.key = ''
            this.editResourceForm.value = ''
            this.editResourceForm.tags = []
            this.$modal.hide('edit-resource')
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
