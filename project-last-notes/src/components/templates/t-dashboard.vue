<template>
    <div class="grid-container">
        <header class="header"><h1>Home Page</h1></header>
        <aside class="sidenav"><ONavBar /></aside>
        <main class="main">
            <ODashboard />
            <form @submit.prevent="tryToLogIn">
                <button type="submit">LogIn</button>
            </form>
        </main>
        <footer class="footer" />
    </div>
</template>

<script>
import ONavBar from '@organisms/o-nav-bar.vue'
import ODashboard from '@organisms/o-form-dashboard.vue'
import { authMethods } from '@state/helpers'

export default {
    components: {
        ONavBar,
        ODashboard,
    },
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    methods: {
        ...authMethods,
        // Try to log the user in with the username
        // and password they provided.
        tryToLogIn() {
            // Reset the authError if it existed.
            return this.logIn({
                username: 'user',
                password: 'password',
            }).then(() => {
                this.$router.push(
                    this.$route.query.redirectFrom || { name: 'home' }
                )
            })
        },
    },
}
</script>

<style scoped>
/* Simple dashboard grid CSS */

/* Assign grid instructions to our parent grid container */
.grid-container {
    display: grid;
    grid-template-areas:
        'sidenav header'
        'sidenav main'
        'sidenav footer';
    grid-template-rows: 50px 1fr 50px;
    grid-template-columns: 240px 1fr;
    height: 100vh;
}

/* Give every child element its grid name */
.header {
    grid-area: header;
    background-color: #648ca6;
}

.sidenav {
    grid-area: sidenav;
    background-color: #394263;
}

.main {
    grid-area: main;
    background-color: #8fd4d9;
}

.footer {
    grid-area: footer;
    background-color: #648ca6;
}

.header,
.footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    background-color: #648ca6;
}
</style>
