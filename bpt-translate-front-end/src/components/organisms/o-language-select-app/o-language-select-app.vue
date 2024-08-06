<template>
    <div class="o-language-select-app">
        <Select
            v-model="selectedLanguage"
            filterable
            placeholder="Select language"
        >
            <Option
                v-for="(language, index) in languages"
                :key="index"
                :value="language"
                >{{ language }}</Option
            >
        </Select>
    </div>
</template>

<script>
import { Option, Select } from 'view-design'
import {
    SUPPORTED_LANGUAGES,
    DEFAULT_LANGUAGE,
} from '@constants/translations.js'
import { loadLanguageAsync } from '@/i18n'
import UserService from '@services/user-service'
import { authComputed } from '@state/helpers'

export default {
    name: 'OLanguageSelectApp',
    components: {
        Option,
        Select,
    },
    data() {
        return {
            selectedLanguage: DEFAULT_LANGUAGE,
            languages: SUPPORTED_LANGUAGES,
        }
    },
    computed: {
        ...authComputed,
    },
    watch: {
        async selectedLanguage() {
            const lang = this.selectedLanguage

            try {
                if (this.loggedIn) {
                    await this.updateUserLanguage()
                }

                await loadLanguageAsync(lang)
            } catch (err) {
                console.log(err)
            }
        },
    },
    methods: {
        async updateUserLanguage() {
            try {
                await UserService.updateUserInfo({
                    userUuid: this.userUuid,
                    data: {
                        language: this.selectedLanguage,
                    },
                })
            } catch (e) {
                console.log(e)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
