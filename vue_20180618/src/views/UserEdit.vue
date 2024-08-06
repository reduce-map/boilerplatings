<template>
    <div class="container">
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li>
                    <a
                        class="page-link"
                        href="#"
                        @click.prevent="prevUser">
                        Previous user edit route
                    </a>
                </li>
                <li>
                    <a
                        class="page-link"
                        href="#"
                        @click.prevent="nextUser">
                        Next user edit
                    </a>
                </li>
            </ul>
        </nav>

        <div
            v-if="error"
            class="alert alert-danger">
            There's an error - error
            <template v-if="error.status">
                {{ error.status }}
            </template>
            <template v-if="error.statusText">
                {{ error.statusText }}
            </template>
            <router-link to="/users"> Go to users page </router-link>
        </div>
        <div v-else-if="!user">
            loading
        </div>
        <app-user-form
            v-else
            v-model="user"
            @sendForm="editUser" />
    </div>
</template>

<script>
import ApiUsers from '@/api/users'

export default {
    components: {
        'app-user-form': () => import(/* webpackChunkName: "group-foo" */ '@/components/UserForm')
    },
    data: () => ({
        user: null,
        error: null
    }),
    computed: {
        id() {
            return Number(this.$route.params.id)
        }
    },
    watch: {
        id: 'loadUser'
    },
    mounted() {
        this.loadUser()
    },
    methods: {
        loadUser() {
            ApiUsers.loadUser(this.id)
                .then(user => {
                    this.error = null
                    this.user = user
                })
                .catch(error => (this.error = error.response))
        },
        editUser() {
            ApiUsers.editUser(this.user)
                .then(() => {
                    setTimeout(() => {
                        this.$router.push({ name: 'Users' })
                    }, 1000)
                })
                .catch(error => (this.error = error))
        },

        prevUser() {
            this.goToUser(this.id - 1)
        },

        nextUser() {
            this.goToUser(this.id + 1)
        },

        goToUser(id) {
            this.$router.push({
                name: 'UserEdit',
                params: {
                    id
                }
            })
        }
    }
}
</script>
