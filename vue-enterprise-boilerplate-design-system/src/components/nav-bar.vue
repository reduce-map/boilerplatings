<script>
import { authComputed } from '@state/helpers'
import NavBarRoutes from './nav-bar-routes'
import mogin from '@molecules/m-form-password-change.vue'
export default {
    components: { NavBarRoutes, mogin },
    data() {
        return {
            profileData: {
                avatar:
                    'https://vignette.wikia.nocookie.net/robocraft/images/2/26/Smile.png/revision/latest?cb=20150110152441',
                name: 'Smile',
                email: 'email@gmail.com',
                phone: '093 123 45 67',
            },
            persistentNavRoutes: [
                {
                    name: 'home',
                    title: 'Home',
                },
            ],
            loggedInNavRoutes: [
                {
                    name: 'profile',
                    title: () => 'Logged in as ' + this.currentUser.name,
                },
                {
                    name: 'logout',
                    title: 'Log out',
                },
            ],
            loggedOutNavRoutes: [
                {
                    name: 'login',
                    title: 'Log in',
                },
            ],
        }
    },
    computed: {
        ...authComputed,
    },
    methods: {
        onLogOut() {
            this.$router.push('logout')
        },
        onLoadFile(file) {},
        onSubmitProfile(profile) {},
        onSubmitChangePassword(passwords) {},
    },
}
</script>

<template>
  <ul :class="$style.container">
    <NavBarRoutes :routes="persistentNavRoutes" />

    <NavBarRoutes
      v-if="loggedIn"
      :routes="loggedInNavRoutes"
    />
    <NavBarRoutes
      v-else
      :routes="loggedOutNavRoutes"
    />
    <mogin />
  </ul>
</template>

<style lang="scss" module>
@import '@design';

.container {
    display: flex;
    padding: 0;
    margin: 0 0 $size-grid-padding;
    text-align: center;
    list-style-type: none;

    > li {
        display: inline-block;
        margin-right: $size-grid-padding;
    }
}
</style>
