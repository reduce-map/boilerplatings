<template>
    <table class="table table-hover">
        <thead>
            <tr>
                <slot name="table-header"/>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="user in users"
                :key="user.id">
                <slot
                    :user="user"
                    name="table-row"/>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th colspan="8">
                    Users: {{ total }}
                </th>
            </tr>
        </tfoot>
    </table>
</template>

<script>
export default {
    name: 'UsersTable',
    props: {
        users: {
            type: Array,
            required: true
        },
        ableToEdit: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        total() {
            return this.users.length
        }
    },
    methods: {
        deleteUser(id) {
            this.$emit('deleteUser', id)
        }
    }
}
</script>
