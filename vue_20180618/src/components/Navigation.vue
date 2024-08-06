<template>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <router-link 
            to="/" 
            class="navbar-brand">Vue SPA</router-link>

        <button 
            class="navbar-toggler" 
            type="button" 
            data-toggle="collapse" 
            data-target="#navbarCollapse" 
            aria-controls="navbarCollapse" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"/>
        </button>

        <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <router-link 
                    to="/" 
                    tag="li" 
                    class="nav-item" 
                    exact>
                    <a 
                        class="nav-link" 
                        href="#">Main</a>
                </router-link>
                <router-link 
                    to="/users" 
                    tag="li" 
                    class="nav-item">
                    <a 
                        class="nav-link" 
                        href="#">User List</a>
                </router-link>
                <router-link 
                    to="/user/create" 
                    tag="li" 
                    class="nav-item">
                    <a 
                        class="nav-link" 
                        href="#">Create User</a>
                </router-link>
                <router-link 
                    to="/contacts" 
                    tag="li" 
                    class="nav-item">
                    <a 
                        class="nav-link" 
                        href="#">Contacts</a>
                </router-link>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navigation'
}
</script>
