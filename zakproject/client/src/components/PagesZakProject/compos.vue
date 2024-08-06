<template>
  <div>
    <header-content>

    </header-content>

    <subheader-content>

    </subheader-content>
<v-btn @click="getInfo">Info</v-btn>
    <dialog-app>

      <add-client slot="add_client" v-if="isAddClient">
   </add-client>
      <select-client slot="search_client" v-else-if="isSearchClient">
      </select-client>


      <add-item slot="" v-if="isAddItem">
      </add-item>

      <searchitem slot="" v-if="isSearchItem"></searchitem>

      <addsubscribe slot="" v-if="isAddSubscribe"></addsubscribe>
      <searchsubscribe slot="" v-if="isSearchSubscribe"></searchsubscribe>

    </dialog-app>
  </div>
</template>

<script>
  import Header from './Headers/HeaderTemplate'
  import SubHeader from './Headers/SubheaderTemplate'
  import Dialog from './Main/Dialog'
  import addClient from '../Menu/addClient'
  import selectClient from '../Table/Select'

  export default {
    components: {
      'header-content': Header,
      'subheader-content': SubHeader,
      'dialog-app': Dialog,
      'add-client':addClient,
      'select-client':selectClient,

    },
    computed: {
      isAddClient() {
        return this.$store.getters['navigation/clientaction/openAddClient']
      },
      isSearchClient() {
        return this.$store.getters['navigation/clientaction/openSearchClient']
      },
      isAddItem(){
        return this.$store.getters['navigation/itemaction/openAddItem']
      },
      isSearchItem(){
        return this.$store.getters['navigation/itemaction/openSearchItem']
      },
      isAddSubscribe(){
        return this.$store.getters['navigation/subscribeaction/openAddItem']
      },
      isSearchSubscribe(){
        return this.$store.getters['navigation/subscribeaction/openSearchItem']
      }
    },
    methods: {
      getInfo(){
        let res = this.$store.getters['navigation/clientaction/openSearchClient']
        console.log(this.$store);
        console.log(res)
      }
    }

  }
</script>

<style scoped>

</style>
