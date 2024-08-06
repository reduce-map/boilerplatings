<template>
  <div id="app">
    <navigation />
    <div class="content">
      <menu>
        <router-view />
      </menu>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navigation from "@/views/Navigation.vue";
@Component({
  components: {
    Navigation,
  },
})
export default class Home extends Vue {}
</script>
<style lang="scss">
body {
  background-color: #f9fbfd;
  min-height: 100vh;
  margin: 0;
}
menu,
ul {
  padding: 0;
  margin: 0;
}

h1 {
  height: 60px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  min-height: 100vh;
}

.content {
  width: 100%;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
