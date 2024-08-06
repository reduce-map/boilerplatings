<template>
    <div class="o-user-members">
        <div class="app-heading">
            <h2>
                Related Users
            </h2>
        </div>

        <a-table
            class="users-table app-table"
            pagination
            v-bind="{
                data: tableData,
                page,
                pages,
            }"
            @onLoadData="onLoadData"
        >
            <template slot="header">
                <div class="name app-col">
                    <div class="holder">
                        {{ $t('app.Name') }}
                    </div>
                </div>
                <div class="login app-col">
                    {{ $t('app.Log_in') }}
                </div>
                <div class="lang app-col">
                    {{ $t('app.Languages') }}
                </div>
                <div class="lang app-col">
                    {{ $t('app.Known_languages') }}
                </div>
            </template>
            <template slot="row" slot-scope="{ row }">
                <div class="name app-col">
                    <div class="holder">
                        <span>
                            {{ row.name }}
                        </span>
                    </div>
                </div>
                <div class="login app-col">
                    <span> {{ row.login }} </span>
                </div>
                <div class="lang app-col">
                    <span> {{ row.language.name }} </span>
                </div>
                <div class="lang app-col">
                    <span>
                        {{ getKnownLanguages(row.knownLanguages) }}
                    </span>
                </div>
            </template>

            <template slot="empty">
                <div class="empty">
                    <div class="empty-holder">
                        <p>No members</p>
                    </div>
                </div>
            </template>
        </a-table>
    </div>
</template>

<script>
import ATable from '@atoms/a-table'
import UserService from '@services/user-service'
import { authComputed } from '@state/helpers'

export default {
    name: 'OUserMembers',
    components: {
        ATable,
    },
    data() {
        return {
            isLoading: false,
            tableData: [],
            page: 1,
            pages: 1,
            pageSize: 20,
        }
    },
    computed: {
        ...authComputed,
    },
    async created() {
        await this.getUsers()
    },
    methods: {
        async getUsers() {
            const { items, meta } = await UserService.getUserRelatedList({
                userUuid: this.userUuid,
                params: {
                    pageNum: this.page,
                },
            })

            this.tableData = items
            this.page = meta.pageNum
            this.pages = meta.totalPages
            this.pageSize = meta.pageSize
        },
        async onLoadData({ page }) {
            this.page = page
            await this.getUsers()
        },

        getKnownLanguages(languages) {
            return languages.map(lang => lang.name).join(',')
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
