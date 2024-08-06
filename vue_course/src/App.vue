<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm bg-dark">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" @click.prevent='click'>Vue test title</a>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/">Главная</router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/users">Список пользователей</router-link>
        </li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    a{
      color: #fff;
      &:hover{
        text-decoration: underline;
      }
    }
  }
</style>
