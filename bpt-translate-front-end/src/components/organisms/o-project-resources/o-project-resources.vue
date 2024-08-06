<template>
    <div class="o-project-resources">
        <div class="app-heading">
            <h2>
                Ресурсы
            </h2>
        </div>

        <b-tabs>
            <b-tab
                v-for="(lang, index) in projectLang"
                :key="lang.name"
                :title="lang.name"
                :active="index === 0"
            >
                <o-project-resources-tab
                    v-bind="{
                        projectLang,
                        lang,
                    }"
                />
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import LanguageService from '@services/language-service'
import OProjectResourcesTab from '@organisms/o-project-resources-tab'

export default {
    name: 'OProjectResources',
    components: {
        OProjectResourcesTab,
    },
    data() {
        return {
            resourceToDelete: null,
            isLoading: false,

            tableData: [],
            page: 1,
            pages: 1,

            projectLang: [],
            primaryLang: '',
            selectedLanguages: [],

            projectLanguageToLoad: 'en',
        }
    },
    computed: {
        projectUuid() {
            return this.$route.params.projectUuid
        },
    },
    async created() {
        await this.getProjectLanguages()
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

                this.projectLang = items
            } catch (err) {
                console.log(err)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
