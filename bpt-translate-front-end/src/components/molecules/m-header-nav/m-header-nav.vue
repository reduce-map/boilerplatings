<template>
    <div class="m-header-nav">
        <div>
            <Breadcrumb v-if="isProjectExist" class="project-holder">
                <BreadcrumbItem :to="{ name: 'user-main' }">
                    <i class="uil uil-home-alt"></i>
                    Home
                </BreadcrumbItem>
                <BreadcrumbItem>
                    {{ project.projectName }} ({{ project.roles[0] }})
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <ul class="header-nav">
            <li>
                <o-language-select-app />
            </li>
            <li>
                <router-link :to="{ name: 'user-related' }">
                    <i class="uil uil-users-alt"></i>
                    {{ $t('app.Related_users') }}
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'user-main' }" exact>
                    <i class="uil uil-bag"></i>
                    <span>{{ $t('app.Your_projects') }}</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'user-profile' }">
                    <i class="uil uil-bag"></i>
                    <span>{{ $t('app.Profile') }}</span>
                </router-link>
            </li>
            <li>
                <i class="uil uil-exit logout" @click="onLogOutClick" />
            </li>
        </ul>

        <!--        <Select-->
        <!--            v-model="projectLanguage"-->
        <!--            class="select-s select-lang"-->
        <!--            @on-change="onChange"-->
        <!--        >-->
        <!--            <Option-->
        <!--                v-for="lang in projectLanguages"-->
        <!--                :key="lang"-->
        <!--                :value="lang"-->
        <!--                >{{ lang }}</Option-->
        <!--            >-->
        <!--        </Select>-->

        <!--        <Dropdown placement="bottom-end" @on-click="onDropDownClick">-->
        <!--            Menu-->
        <!--            <DropdownMenu slot="list">-->
        <!--                &lt;!&ndash;                TODO ask BE &ndash;&gt;-->
        <!--                &lt;!&ndash;                <DropdownItem name="profile" class="dropdown-item">&ndash;&gt;-->
        <!--                &lt;!&ndash;                    <i class="uil uil-cog"></i>&ndash;&gt;-->
        <!--                &lt;!&ndash;                    <span>{{ $t('header_nav.profile') }} </span>&ndash;&gt;-->
        <!--                &lt;!&ndash;                </DropdownItem>&ndash;&gt;-->
        <!--                <DropdownItem name="logout" class="dropdown-item">-->
        <!--                    <Icon type="md-log-out" size="16" class="dropdown-icon" />-->
        <!--                    <span>{{ $t('header_nav.logout') }}</span>-->
        <!--                </DropdownItem>-->
        <!--            </DropdownMenu>-->
        <!--        </Dropdown>-->
    </div>
</template>

<script>
import { Breadcrumb, BreadcrumbItem } from 'view-design'
import { SUPPORTED_LANGUAGES } from '@constants/translations.js'
import { getLocale, setLocale } from '@utils/user-info.js'
import OLanguageSelectApp from '@organisms/o-language-select-app'

export default {
    name: 'MHeaderNav',
    components: {
        Breadcrumb,
        BreadcrumbItem,
        OLanguageSelectApp,
    },
    props: {
        project: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            projectLanguage: getLocale(),
            projectLanguages: SUPPORTED_LANGUAGES,
        }
    },
    computed: {
        isProjectExist() {
            return !!this.project && !!this.project.projectName
        },
    },
    methods: {
        onChange(locale) {
            setLocale(locale)
            window.location.reload()
        },
        async onDropDownClick(name) {
            if (name === 'profile') {
                this.$router.push({ name: 'profile' })
            }

            if (name === 'notifications') {
                this.$router.push({ name: 'notifications' })
            }

            if (name === 'logout') {
                // await login.logOut()
                this.$router.push({ name: 'login' })
            }
        },
        onLogOutClick() {
            this.$emit('log-out')
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
