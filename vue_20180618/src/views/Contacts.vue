<template>
    <div>
        <h1>Enjoy seeing our contacts</h1>
        <app-users-table
            v-if="users"
            :users="users">
            <template
                slot="table-header">
                <th>Name</th>
                <th>Last name</th>
                <th>Phone</th>
            </template>
            <template
                slot="table-row"
                slot-scope="{ user }">
                <td>{{ user.firstName }}</td>
                <td>{{ user.lastName }}</td>
                <td>{{ user.phone }}</td>
            </template>
        </app-users-table>
    </div>
</template>

<script>
import ApiUsers from '@/api/users'

export default {
    name: 'Contacts',
    components: {
        'app-users-table': () => import('@/components/UsersTable')
    },
    data: () => ({
        users: null
    }),
    mounted() {
        this.loadUsers()
    },
    methods: {
        loadUsers() {
            ApiUsers.loadUsers().then(users => {
                this.users = users
            })
        }
    }
}
</script>
