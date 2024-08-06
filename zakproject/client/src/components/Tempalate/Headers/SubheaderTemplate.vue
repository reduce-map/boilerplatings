<template>
  <v-container class="header">
    <v-layout>
      <v-flex v-if="isVisibleMenuClient">
        <v-btn class="btn" @click="getFieldAddClient">Add Client</v-btn>
        <v-btn class="btn" @click="getFieldSearchClient">Search</v-btn>
      </v-flex>
      <v-flex v-if="isVisibleMenuItem">
        <v-btn class="btn" @click="getFieldAddItem">Add Item</v-btn>
        <v-btn class="btn" @click="getFieldSearchItem">Search</v-btn>
      </v-flex>
      <v-flex v-if="isVisibleMenuSubscribe">
        <v-btn class="btn" @click="getFieldAddSubscribe">Add Subscribe</v-btn>
        <v-btn class="btn" @click="getFieldSearchSubscribe">Search</v-btn>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
  export default {
    computed: {
      isVisible() {
        return this.$store.getters['navigation/visiblemenusections/visibleMenu'];
      },
      isVisibleMenuClient() {
        return this.isVisible.menuClient
      },
      isVisibleMenuSubscribe() {
        return this.isVisible.menuSubscribe
      },
      isVisibleMenuItem() {
        return this.isVisible.menuItem
      }
    },
    methods: {
      openDialog() {
        this.$store.dispatch('navigation/dialog/openDialog')
      },
      getFieldAddClient() {
        this.$store.dispatch('navigation/clientaction/openMenuClient', {
          data: {
            addClient: true
          }
        })
        this.openDialog()
      },
      getFieldSearchClient() {
        this.$store.dispatch('navigation/clientaction/openMenuClient', {
          data: {
            searchClient: true
          }
        })
        this.openDialog()
      },


      getFieldAddItem() {
        this.$store.dispatch('navigation/itemaction/openMenuItem', {
          data: {
            addItem: true
          }
        })
        this.openDialog()
      },
      getFieldSearchItem() {
        this.$store.dispatch('navigation/itemaction/openMenuItem', {
          data: {
            searchItem: true
          }
        })
        this.openDialog()
      },


      getFieldAddSubscribe() {
        this.$store.dispatch('navigation/subscribeaction/openMenuSubscribe', {
          data: {
            addSubscribe: true
          }
        })
        this.openDialog()
      },
      getFieldSearchSubscribe() {
        this.$store.dispatch('navigation/subscribeaction/openMenuSubscribe', {
          data: {
            searchSubscribe: true
          }
        })
        this.openDialog()
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
