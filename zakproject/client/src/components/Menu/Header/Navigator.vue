<template>
  <nav>
    <ul class="mainNav">
      <li><router-link :to="{path:'/search'}">Search</router-link></li>
      <li><router-link :to="{ path: '/myclient' }">My Client</router-link></li>
      <li><router-link :to="{ path: '/addClient' }">addClient</router-link></li>
      <li><button v-on:click="submitSignout()">Выход</button></li>
    </ul>
  </nav>
</template>

<script>
  import Authentication from '../../pages/Authentication'
    export default {
        name: "navigator",
      methods:{
        submitSignout () {
          Authentication.signout(this, '/login')
        }
      }
    }
</script>

<style lang="scss">
  @import '../../../assets/css/positionClassic.css';
nav{font-size:16px; color:DarkRed}
</style>

