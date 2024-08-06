<template>
  <div>
    <header-content>

    </header-content>

    <subheader-content>

    </subheader-content>

    <dialog-app>

      <add-client slot="add_client" v-if="isAddClient">
      </add-client>
      <select-client slot="search_client" v-else-if="isSearchClient">
      </select-client>


      <add-item slot="add_item" v-if="isAddItem">
      </add-item>

      <select-item slot="select_item" v-if="isSearchItem">

      </select-item>


      <add-subscribe slot="add_subscribe" v-if="isAddSubscribe">

      </add-subscribe>

      <select-subscribe slot="select_subscribe" v-if="isSearchSubscribe">

      </select-subscribe>

    </dialog-app>
  </div>
</template>

<script>
  import Header from './Headers/HeaderTemplate'
  import SubHeader from './Headers/SubheaderTemplate'
  import Dialog from './Dialog'

  import AddClient from './DialogComponents/clientsComponents/addClient'
  import SelectClient from './DialogComponents/clientsComponents/SelectClient'

  import AddSubscribe from './DialogComponents/subscribeComponents/AddSubscribe'
  import SelectSubscribe from './DialogComponents/subscribeComponents/SelectSubscribe'

  import AddItem from './DialogComponents/itemComponents/AddItem'
  import SelectItem from './DialogComponents/itemComponents/SelectItem'

  export default {
    components: {
      'header-content': Header,
      'subheader-content': SubHeader,
      'dialog-app': Dialog,
      'add-client': AddClient,
      'select-client': SelectClient,
      'add-subscribe':AddSubscribe,
      'select-subscribe':SelectSubscribe,
      'add-item':AddItem,
      'select-item':SelectItem,
    },
    computed: {
      isAddClient() {
        return this.$store.getters['navigation/clientaction/openAddClient']
      },
      isSearchClient() {
        return this.$store.getters['navigation/clientaction/openSearchClient']
      },
      isAddItem() {
        return this.$store.getters['navigation/itemaction/openAddItem']
      },
      isSearchItem() {
        return this.$store.getters['navigation/itemaction/openSearchItem']
      },
      isAddSubscribe() {
        return this.$store.getters['navigation/subscribeaction/openAddItem']
      },
      isSearchSubscribe() {
        return this.$store.getters['navigation/subscribeaction/openSearchItem']
      }
    },
  }
</script>

<style scoped>

</style>
