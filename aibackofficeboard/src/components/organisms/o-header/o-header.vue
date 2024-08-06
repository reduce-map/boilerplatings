<template>
    <div class="o-header">
        <div class="page-center-wrapper">
            <div class="header-holder">
                <div class="header-holder">
                    <Slide width="250" :cross-icon="false">
                        <div class="nav-header">
                            <a-logo />
                            <p class="store-name">The Store 3.0</p>
                        </div>
                        <nav id="nav">
                            <ul>
                                <li>
                                    <router-link exact to="/">
                                        <img
                                            class="white"
                                            src="@assets/users white.svg"
                                            alt="users white"
                                        />
                                        <img
                                            class="yellow"
                                            src="@assets/users yellow.svg"
                                            alt="users yellow"
                                        />
                                        Users
                                    </router-link>
                                </li>
                                <li>
                                    <router-link exact to="/products">
                                        <img
                                            class="white"
                                            src="@assets/products white.svg"
                                            alt="products white"
                                        />
                                        <img
                                            class="yellow"
                                            src="@assets/products yellow.svg"
                                            alt="products yellow"
                                        />
                                        Products
                                    </router-link>
                                </li>
                                <li>
                                    <router-link exact to="/categories">
                                        <img
                                            class="white"
                                            src="@assets/categories white.svg"
                                            alt="categories white"
                                        />
                                        <img
                                            class="yellow"
                                            src="@assets/categories yellow.svg"
                                            alt="categories yellow"
                                        />
                                        Categories
                                    </router-link>
                                </li>
                                <li>
                                    <router-link exact to="/sales">
                                        <img
                                            class="white"
                                            src="@assets/sales white.svg"
                                            alt="sales white"
                                        />
                                        <img
                                            class="yellow"
                                            src="@assets/sales yellow.svg"
                                            alt="sales yellow"
                                        />
                                        Sales
                                    </router-link>
                                </li>
                                <li>
                                    <router-link exact to="/devices">
                                        <img
                                            class="white"
                                            src="@assets/devices white.svg"
                                            alt="devices white"
                                        />
                                        <img
                                            class="yellow"
                                            src="@assets/devices yellow.svg"
                                            alt="devices yellow"
                                        />
                                        Devices
                                    </router-link>
                                </li>
                            </ul>
                        </nav>
                        <a-button class="logout" @click.native="onLogOut">
                            LogOut
                        </a-button>
                    </Slide>
                    <a-logo />
                </div>
                <div class="header-holder">
                    <span class="user-name">
                        {{ userName }}
                    </span>
                    <a-avatar :full-name="userName" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ALogo from '@atoms/a-logo'
import AButton from '@atoms/a-button'
import AAvatar from '@atoms/a-avatar'
import { Slide } from 'vue-burger-menu'
import { authComputed, authMethods } from '@state/helpers'

export default {
    name: 'OHeader',
    components: {
        Slide,
        ALogo,
        AAvatar,
        AButton,
    },
    computed: {
        ...authComputed,
    },
    methods: {
        ...authMethods,
        onLogOut() {
            this.logOut()
            this.$router.push({
                name: 'login',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
