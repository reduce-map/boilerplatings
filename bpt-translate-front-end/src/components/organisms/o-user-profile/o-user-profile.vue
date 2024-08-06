<template>
    <div class="o-user-profile">
        <div class="holder">
            <p>{{ $t('app.Your_email_is') }} - {{ userProfile.login }}</p>

            <ValidationObserver
                ref="editUserProfile"
                tag="form"
                @submit.prevent="onEditUserProfile"
            >
                <div class="app-form-holder">
                    <a-input
                        v-model="userProfile.name"
                        :validation="true"
                        :validation-config="{
                            name: 'Email',
                            rules: {
                                required: true,
                                email: true,
                            },
                        }"
                        class="app-row"
                        :label="$t('app.User_name')"
                        :placeholder="$t('app.Enter_user_name')"
                    />

                    <Select
                        v-model="userProfile.knownLanguages"
                        multiple
                        filterable
                        class="app-row"
                        :placeholder="$t('app.Choose_the_languages_you_know')"
                    >
                        <Option
                            v-for="language in languages"
                            :key="language.id"
                            :value="language.code"
                            >{{ language.name }}</Option
                        >
                    </Select>

                    <o-language-select-app class="app-row" />

                    <div class="btns-holder">
                        <Button
                            type="primary"
                            :loading="isLoading"
                            html-type="submit"
                        >
                            {{ $t('app.Edit') }}
                        </Button>
                    </div>
                </div>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
import AInput from '@atoms/a-input'
import { ValidationObserver } from 'vee-validate'
import { Button, Select, Option } from 'view-design'
import { userComputed, languageComputed, userMethods } from '@state/helpers'
import UserService from '@services/user-service'
import { SUPPORTED_LANGUAGES } from '@constants/translations.js'
import OLanguageSelectApp from '@organisms/o-language-select-app'

export default {
    name: 'OUserProfile',
    components: {
        AInput,
        Button,
        Select,
        Option,
        ValidationObserver,
        OLanguageSelectApp,
    },
    data() {
        return {
            isLoading: false,

            userProfile: {
                login: '',
                name: '',
                language: '',
                knownLanguages: [],
            },

            projectLanguages: SUPPORTED_LANGUAGES,
        }
    },

    computed: {
        ...userComputed,
        ...languageComputed,
    },
    async created() {
        await this.getProfile()
        this.setLocaleProfile()
    },
    methods: {
        ...userMethods,
        async onEditUserProfile() {
            try {
                await UserService.updateUserInfo({
                    userUuid: this.user.uuid,
                    data: {
                        name: this.userProfile.name,
                        knownLanguages: this.userProfile.knownLanguages,
                        language: this.userProfile.language,
                    },
                })
                await this.getProfile()
            } catch (e) {
                console.log(e)
            }
        },
        setLocaleProfile() {
            this.userProfile = { ...this.user }
            this.userProfile.language = this.user.language.code
            this.userProfile.knownLanguages = this.user.knownLanguages.map(
                el => el.code
            )
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
