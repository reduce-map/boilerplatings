<template>
    <div class="container">
        <div class="jumbotron">
            <h1>Hi there. Here on the page you can:</h1>
            <ul class="list-group">
                <li class="list-group-item">
                    go to
                    <router-link to="/users">users list</router-link>
                    to see all users
                </li>
                <li class="list-group-item">
                    go to
                    <router-link to="/user/create">create a user</router-link>
                </li>
                <li class="list-group-item">
                    go to
                    <router-link to="/user/edit/0">edit first user</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
