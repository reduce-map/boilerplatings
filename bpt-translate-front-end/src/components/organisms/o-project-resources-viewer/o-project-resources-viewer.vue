<template>
    <div class="o-project-resources-viewer">
        <div v-if="searchable" class="app-row">
            <a-input
                v-model="search"
                :validation="true"
                :validation-config="{
                    name: 'Email',
                    rules: 'required|email',
                }"
                class="app-row"
                label="Поиск ресурса по ключу"
                placeholder="Веедите"
            />
        </div>

        <div v-if="filterable" class="app-row">
            <CheckboxGroup v-model="filter" class="resources-checkboxes">
                <Checkbox
                    v-for="item in filterableList"
                    :key="item"
                    class="resources-checkbox"
                    :label="item"
                >
                    {{ item }}
                </Checkbox>
            </CheckboxGroup>
        </div>

        <template v-if="isCheckAble">
            <CheckboxGroup
                v-model="selectedResources"
                class="resources-checkboxes"
            >
                <Checkbox
                    v-for="resource in resourcesList"
                    :key="resource.key"
                    class="resources-checkbox"
                    :label="resource.key"
                >
                    {{ resource.value }}
                </Checkbox>
            </CheckboxGroup>
            <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </template>
        <template v-else>
            <div>
                <div
                    v-for="resource in resourcesList"
                    :key="resource.key"
                    :class="{
                        active: resourceClickSelected.key === resource.key,
                    }"
                    class="resource-holder"
                    @click="onResourceClick(resource)"
                >
                    <span>{{ resource.value }}</span>
                </div>
                <infinite-loading
                    @infinite="infiniteHandler"
                ></infinite-loading>
            </div>
        </template>
    </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { Checkbox, CheckboxGroup } from 'view-design'
import AInput from '@atoms/a-input'

import ResourceService from '@services/resource-service'
import _ from 'lodash'

export default {
    name: 'OProjectResourcesViewer',
    components: {
        InfiniteLoading,
        Checkbox,
        CheckboxGroup,
        AInput,
    },
    props: {
        isCheckAble: {
            type: Boolean,
            default: false,
        },
        searchable: {
            type: Boolean,
            default: false,
        },
        filterable: {
            type: Boolean,
            default: false,
        },
        needToUpdate: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            // store resources
            resourcesList: [],
            selectedResources: [],
            filter: [],

            resourceClickSelected: {},

            search: '',

            //
            filterableList: ['translated', 'Not translated'],

            page: 1,
            pagesTotal: 1,

            isLoaded: false,
        }
    },
    computed: {
        projectUuid() {
            return this.$route.params.projectUuid
        },
    },
    watch: {
        selectedResources() {
            this.$emit('selectedResources', this.selectedResources)
        },
        search: _.debounce(function() {
            this.page = 1
            this.resourcesList = []
            this.loadProjectResources()
        }, 100),
        filter() {
            this.page = 1
            this.resourcesList = []
            this.loadProjectResources()
        },
        async needToUpdate(val) {
            if (val) {
                this.page = 1
                this.resourcesList = []

                await this.loadProjectResources()
                const el = this.resourcesList.filter(el => {
                    return el.key === this.resourceClickSelected.key
                })[0]
                console.log(el)
                this.onResourceClick(el)
            }
        },
    },
    async created() {
        await this.loadProjectResources()
    },
    methods: {
        async loadProjectResources() {
            const params = {
                pageNum: this.page,
            }

            if (this.search) {
                params.query = this.search
            }

            if (this.filter.length === 1) {
                if (this.filter[0] === 'translated') {
                    params.isEmpty = false
                } else if (this.filter[0] === 'Not translated') {
                    params.isEmpty = true
                }
            }

            const { items, meta } = await ResourceService.getResources({
                projectUuid: this.projectUuid,
                params,
            })

            this.resourcesList = [...this.resourcesList, ...items]
            this.pagesTotal = meta.totalPages

            this.isLoaded = true

            // here request could be to cached to store
            // this.setResources({
            //     resources: items,
            // })
        },
        async infiniteHandler($state) {
            this.page += 1

            if (this.isLoaded && this.page > this.pagesTotal) {
                $state.complete()
            }

            try {
                await this.loadProjectResources()
                $state.loaded()
            } catch (err) {
                console.log(err)
            }
        },

        onResourceClick(resource) {
            this.resourceClickSelected = resource
            this.$emit('resourceClick', resource)
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
