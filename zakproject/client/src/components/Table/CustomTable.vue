<template>
  <div>
    <table>
      <tr>
        <th v-for="head in headersTable.header"
            v-if="head!=='items'"
        >{{head}}
        </th>
      </tr>
      <tr v-for="item in clients">
        <td v-for="(value, key, index) in item"
            v-if="item[key]!==item._id&&item[key]!==item.user_id&&key!=='items'">

          <div v-if="Array.isArray(item[key])">
            <div v-if="item[key].length===0">{{dataPage.absent}}</div>
            <div v-else v-for="val in item[key]">{{val}}</div>
          </div>

          <div v-else>
            <div v-if="item[key].length===0||item[key][0]===''">{{dataPage.absent}}</div>
            <div v-else>{{item[key]}}</div>
          </div>
        </td>
        <td>
          <div>
            <router-link :to="{path:'/change',query:{ change:{client:item}}}">Изменить
            </router-link>
          </div>
        </td>
        <td>
          <div>
            <v-btn @click="remove(item._id)">Удалить</v-btn>
          </div>
        </td>
      </tr>
    </table>
    <div v-if="!headersTable.isData">
      <v-layout>
        <v-flex xs4>
          <v-subheader>Data is empty</v-subheader>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios'
  import Authentication from '../pages/Authentication'

  export default {
    props: ['headersTable', 'clients', 'dataPage', 'getAll',],

    data() {
      return {
        tableValues: {},

      }
    },
    methods: {
      remove(id_client) {
        Axios.post(`http://localhost:8080/deleteClient`, {
          id_client: id_client
        }, {
          headers: {'Authorization': Authentication.getAuthenticationHeader(this)},
          params: {user_id: this.$cookie.get('user_id')}
        }).then(({data}) => {
          this.getAll();
        }).catch(error => {
          console.error(error);
        })
      },
    }
  }
</script>

<style scoped>
  table {
    border: 1px solid #69c;
  }

  th {
    font-weight: normal;
    color: #039;
    border-bottom: 1px dashed #69c;
    padding: 12px 17px;
  }

  td {
    color: #669;
    padding: 7px 17px;
  }

  tr:hover td {
    background: #ccddff;
  }
</style>
