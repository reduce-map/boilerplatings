<template>
  <div>
    <select-table :sites="sites" :getAll="getAllClients.bind(this)" @searchValue="getClientByValue"></select-table>
    <main-table :headersTable="headersTable" :clients="clients" :dataPage="dataPage"
                :getAll="getAllClients.bind(this)"></main-table>
  </div>
</template>

<script>
  import Table from './CustomTable'
  import Select from './Select'
  import Axios from 'axios';
  import Authentication from '../pages/Authentication'

  export default {
    components: {
      'main-table': Table,
      'select-table': Select
    },
    data() {
      return {
        dataPage: {
          absent: 'отсутствует'
        },
        headersTable: {header: [], isData: true},
        clients: [],
        sites: [],
        defaultClients: []
      }
    },
    /*mounted() {
      this.getAllClients()
    },*/
    methods: {
      getClientByValue(value) {
        console.log(value);
        if (value) {
          let arr=[];
          this.clients = Object.assign({},{defaultClients:this.defaultClients}).defaultClients;
          this.clients.forEach(client => {
            client.site.forEach(item => {
              if (client.site.length !== 0 && client.site.indexOf(value) !== -1) {
                arr.push(client);
              }
            })
          })
          this.clients = arr;
          console.log(arr);
        }
      },
      getHeadersTable(client) {
        if (client !== undefined) {
          this.headersTable.header = [];
          Object.keys(this.clients[0]).forEach(key => {
            if (key !== '_id' && key !== 'user_id') {
              this.headersTable.header.push(key);
            }

          })
        }
      },
      getAllClients() {
        console.log("GET ALL");
        Axios.get(`http://localhost:8080/findAllClients`, {
          headers: {'Authorization': Authentication.getAuthenticationHeader(this)},
          params: {user_id: this.$cookie.get('user_id')}
        }).then(({data}) => {
          if (data.length !== 0) {
            this.headersTable.isData = true;
            this.clients = data;
            this.defaultClients = Object.assign({}, {data: data}).data;
            this.getHeadersTable(this.clients[0]);
            this.getSite();
          } else {
            this.headersTable.header = ['first_name', 'second_name', 'patronymic', 'site', 'mail', 'telephone', 'post', 'message'];
            this.headersTable.isData = false;
          }
        }).catch(error => {
          console.error(error);
        })
      },
      getSite() {
        this.clients.forEach(client => {
          client.site.forEach(item => {
            if (this.sites.length === 0 || this.sites.indexOf(item) === -1) {
              this.sites.push(item);
            }
          })
        })
      },

    },
    mounted(){
      this.getAllClients();
    }
  }
</script>

<style scoped>

</style>
