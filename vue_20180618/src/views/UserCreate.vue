<template>
    <div class="container">
        <div v-if="user.id">
            Hey you, yes you. You've just created user with ID: {{ user.id }}. Congrats
        </div>
        <app-user-form
            v-model="user"
            @sendForm="sendForm" />
    </div>
</template>

<script>
import ApiUsers from '@/api/users'

export default {
    components: {
        'app-user-form': () => import(/* webpackChunkName: "group-foo" */ '@/components/UserForm')
    },
    data: () => ({
        user: {
            isActive: false,
            balance: null,
            age: null,
            firstName: null,
            lastName: null,
            company: null,
            email: null,
            phone: null,
            address: null,
            about: '',
            registered: '',
            picture: ''
        }
    }),
    methods: {
        sendForm() {
            ApiUsers.createUser(this.user).then(newUser => {
                setTimeout(() => {
                    this.$router.push({ name: 'UserEdit', params: { id: newUser.id } })
                }, 1000)
            })
        }
    }
}
</script>
