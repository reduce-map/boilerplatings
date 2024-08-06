<template>
  <v-container class="header">
    <v-layout>
      <v-flex>
        <v-btn class="btn" @click="isVisibleMenuClient">Client</v-btn>
        <v-btn class="btn" @click="isVisibleMenuItem">Item</v-btn>
        <v-btn class="btn" @click="isVisibleMenuSubscribe">Subscribe</v-btn>
      </v-flex>
      <v-spacer></v-spacer>
      <v-btn class="btn" @click="submitSignout" v-if="isAuthenticated">Exit</v-btn>
    </v-layout>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
  import Authentication from '../../pages/Authentication'

  export default {
    name: "header-template",
    computed: {
      isAuthenticated() {
        return Authentication.isAuthenticated();
      },
    },
    methods: {
      submitSignout() {
        Authentication.signout(this, '/login')
      },
      isVisibleMenuClient() {
        this.changeVisibleMenu('menuClient', true)
      },
      isVisibleMenuItem() {
        this.changeVisibleMenu('menuItem', true)
      },
      isVisibleMenuSubscribe() {
        this.changeVisibleMenu('menuSubscribe', true)
      },
      changeVisibleMenu(property, value) {
        this.$store.dispatch('navigation/visiblemenusections/changeVisibleMenu', {
          data: {
            [property]: value
          }
        })
      }
    }
  }
</script>

<style scoped>
  .header {
    margin-top: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    background: linear-gradient(to top left, #b0e0e6, pink);
    -moz-background-size: 100%; /* Firefox 3.6+ */
    -webkit-background-size: 100%; /* Safari 3.1+ и Chrome 4.0+ */
    -o-background-size: 100%; /* Opera 9.6+ */
    background-size: 100%; /* Современные браузеры */
    color: antiquewhite;
    border: 1px outset;
    border-radius: 5px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, .6);
  }

  .btn {
    background: -moz-linear-gradient(#00BBD6, #EBFFFF);
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#FFE2C2), to(#D4FFC0));
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00BBD6', endColorstr='#EBFFFF');
    padding: 3px 7px;
    color: #333;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    border: 1px solid #666;
  }
</style>
