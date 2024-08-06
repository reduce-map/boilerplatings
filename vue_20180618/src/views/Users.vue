<template>
    <div class="panel panel-default">
        <div
            v-if="!usersOnPage"
            class="alert alert-warning">
            No users
        </div>
        <div
            v-else
            class="panel-body">
            <div class="panel-heading">
                <h2>User list (total {{ usersLength }} users)</h2>
                <button
                    type="button"
                    class="btn btn-primary"
                    @click="loadUsers">
                    <i
                        :class="[ loading ? 'fa-spin' : '']"
                        class="fa fa-fw fa-refresh"/>
                    Update grid
                </button>
            </div>
            <app-users-grid
                :page="page"
                :pages="pages"
                :rows-per-page="rowsPerPage"
                :search-query="searchQuery"
                :users="filteredUsers"
                @load="loadUser">
                <template slot="table-header">
                    <th>#</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Active</th>
                    <th>Ballance</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Registered</th>
                    <th>Delete</th>
                    <th>Copy full name</th>
                </template>

                <template
                    slot="table-row"
                    slot-scope="{ user }">
                    <td>
                        <router-link
                            v-if="ableToEdit"
                            :to="`/user/edit/${user.id}`">
                            # {{ user.id }}
                        </router-link>
                        <span v-else># {{ user.id }}</span>
                    </td>
                    <td>{{ user.firstName | capitalize }}</td>
                    <td>{{ user.lastName | capitalize }}</td>
                    <td>{{ user.isActive }}</td>
                    <td>{{ user.balance }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phone }}</td>
                    <td>{{ user.registered }}</td>
                    <td>
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="deleteUser(user.id)">
                            delete user
                        </button>
                    </td>
                    <td>
                        <template>
                            <button
                                v-copy="copyFullName(user)"
                                type="button"
                                class="btn btn-primary"> {{ 'copy full name' | capitalize }} </button>
                        </template>
                    </td>
                </template>
            </app-users-grid>
        </div>
    </div>
</template>

<script>
import ApiUsers from '@/api/users'
import { copy } from 'v-copy'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('users')

export default {
    name: 'Users',
    directives: {
        copy
    },
    components: {
        'app-users-grid': () => import('@/components/UsersGrid')
    },
    filters: {
        capitalize: function(value) {
            return !value
                ? ''
                : value
                      .toString()
                      .charAt(0)
                      .toUpperCase() + value.toString().slice(1)
        }
    },
    data: () => ({
        usersOnPage: null,
        loading: false,
        page: 1,
        rowsPerPage: 5,
        ableToEdit: true
    }),
    computed: {
        ...mapGetters(['users', 'usersLength']),
        searchQuery: {
            get: function() {
                return this.$store.getters['users/searchQuery']
            },
            set: function(query) {
                this.$store.commit('users/setQuery', query)
            }
        },
        pages() {
            return Math.ceil(this.users.length / this.rowsPerPage)
        },
        filteredUsers() {
            if (!this.searchQuery) return this.usersOnPage

            const query = this.searchQuery.toLocaleLowerCase()

            return this.usersOnPage.filter(user => {
                const matchQuery = user.firstName.toLowerCase().match(query)
                return matchQuery && matchQuery.length ? user : null
            })
        }
    },
    created() {
        this.loadUser({
            searchQuery: this.searchQuery,
            rowsPerPage: this.rowsPerPage,
            page: this.page
        })
        this.loadUsers()
    },
    methods: {
        ...mapActions(['loadUsers']),
        // saved from past for comparison
        // loadUsers() {
        //     ApiUsers.loadUsers().then(users => {
        //         this.users = users
        //     })
        // },
        loadUser({ searchQuery, rowsPerPage, page }) {
            this.loading = true
            this.searchQuery = searchQuery
            this.rowsPerPage = rowsPerPage
            this.page = page

            ApiUsers.loadUsersRange((page - 1) * this.rowsPerPage, page * this.rowsPerPage).then(
                users => {
                    this.loading = false
                    this.usersOnPage = users
                }
            )
        },
        deleteUser(id) {
            ApiUsers.deleteUser(id).then(id => this.removeUserWithId(id))
        },
        removeUserWithId(id) {
            this.usersOnPage = this.usersOnPage.filter(user => user.id !== id)
        },
        copyFullName(user) {
            return [user.firstName, user.lastName].join(' ')
        }
    }
}
</script>
