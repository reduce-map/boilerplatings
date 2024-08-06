<template>
    <div>
        <div class="form-group row">
            <div class="col-6">
                <app-users-select v-model.number="rowsPerPageLocal" />
                <p>Elements on the page {{ rowsPerPageLocal }}</p>
            </div>
            <div class="col-6">
                <span>Search by name</span>
                <input
                    v-model="searchQueryLocal"
                    type="text"
                    name="gridSearch">
            </div>
        </div>

        <app-users-table
            :users="users"
            :able-to-edit="true">
            <template slot="table-header">
                <slot name="table-header"/>
            </template>

            <template
                slot="table-row"
                slot-scope="{ user }">
                <slot
                    :user="user"
                    name="table-row"/>
            </template>
        </app-users-table>

        <div class="form-group row">
            <div class="col">
                <strong>Selected page is {{ pageLocal }}</strong>
                <app-pagination
                    v-model.number="pageLocal"
                    :pages="pages" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UsersGrid',
    components: {
        'app-users-table': () => import('@/components/UsersTable'),
        'app-users-select': () => import('@/components/UserFormSelect'),
        'app-pagination': () => import('@/components/Pagination')
    },
    props: {
        users: {
            type: Array,
            required: true
        },
        page: {
            type: Number,
            required: true
        },
        pages: {
            type: Number,
            required: true
        },
        rowsPerPage: {
            type: Number,
            required: true
        },
        searchQuery: {
            type: String,
            required: true
        }
    },
    computed: {
        pageLocal: {
            get() {
                return this.page
            },
            set(value) {
                this.tableControlsChange({
                    page: value
                })
            }
        },
        searchQueryLocal: {
            get() {
                return this.searchQuery
            },
            set(value) {
                this.tableControlsChange({
                    searchQuery: value,
                    page: this.pageLocal
                })
            }
        },
        rowsPerPageLocal: {
            get() {
                return this.rowsPerPage
            },
            set(value) {
                this.tableControlsChange({ rowsPerPage: value })
            }
        }
    },
    methods: {
        tableControlsChange(payload) {
            const defaultPayload = {
                searchQuery: this.searchQueryLocal,
                rowsPerPage: this.rowsPerPageLocal,
                page: 1
            }

            this.$emit('load', { ...defaultPayload, ...payload })
        }
    }
}
</script>
