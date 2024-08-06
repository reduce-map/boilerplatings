<template>

  <div>
    <table v-for="(value,key,index) in paramsQu.client" v-if="key!=='_id'&&key!=='user_id'">
      <tr>
        <th>{{key}}</th>
      </tr>
      <tr v-if="!Array.isArray(value)||value===''">
        <td>
          <v-layout>
            <v-flex xs8>
              <v-text-field
                v-bind:label="key"
                v-model="curVal[key]">
              </v-text-field>
            </v-flex>
          </v-layout>
        </td>
        <td v-for="methodTable in bindMethods">
          <v-btn v-on:click='methodTable.method(curVal[key],key)'>{{methodTable.name}}</v-btn>
        </td>
      </tr>
      <tr v-else-if="Array.isArray(value)">
        <td>
          <v-layout>
            <v-flex xs4>
              <v-subheader>{{key}}</v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field
                v-bind:label="key"
                v-model="curVal[key]">
              </v-text-field>
            </v-flex>
          </v-layout>
        </td>
        <td v-for="methodTable in bindMethods">
          <v-btn v-on:click='methodTable.method(curVal[key],key)'>{{methodTable.name}}</v-btn>
        </td>
      </tr>
      <tr v-for="item in value" v-if="Array.isArray(value)">
        <td>
          <div>{{item}}</div>
        </td>
        <td v-for="methodForValue in methodsValue">
          <button v-on:click="methodForValue.method(item,key)">{{methodForValue.name}}</button>
        </td>
      </tr>
    </table>
    <div>
      <v-btn v-on:click='updateClient()'>Сохранить</v-btn>
      <router-link :to="{path:'/table'}">Back</router-link>
    </div>
  </div>
</template>
<script>
  import Axios from 'axios'
  import Authentication from '../pages/Authentication'


  export default {
    data() {
      return {
        curVal: {
          first_name: '',
          second_name: '',
          patronymic: '',
          site: '',
          mail: '',
          telephone: '',
          items: '',
          message: '',
          post: '',
        },
        vurVal: '',
        paramsQu: {},
        client_id: '',
        client: {
          name: {
            first_name: '',
            second_name: '',
            patronymic: ''
          },
          data: {
            site: [],
            mail: [],
            telephone: [],
          },
          items: [],
          message: [],
          post: [],
        },
        methodsTable: [
          {
            method: function (value, field) {
              let res = this.checkerField(field);
              console.log(res);
              Array.isArray(res) ? res.push(value) : res[field] = value;
              console.log(this.client.data.site);
            },
            name: "Добавить"
          }
        ],
        methodsForItem: [
          {
            method: function (value, field) {
              console.log(this.client);
              let res = this.checkerField(field);
              console.log(res);
              let index = res.indexOf(value);
              if (index !== -1) {
                res.splice(index, 1);
              }
            },
            name: 'Удалить'
          }
        ]
      }

    }, computed: {
      bindMethods: function () {
        return this.methodsTable.map(item => {
          return {
            method: item.method.bind(this),
            name: item.name
          }
        })
      },
      methodsValue: function () {
        return this.methodsForItem.map(item => {
          return {
            method: item.method.bind(this),
            name: item.name
          }
        })
      }
    },
    methods: {
      remove(arr, item) {
        let index = arr.indexOf(item);
        if (index !== -1) {
          arr.splice(index, 1);
        }
      },
      addName(name, newName) {
        console.log(this.client.name.first_name);
        this.client.name[name] = newName;
        console.log(this.client.name.first_name);
      },
      getParams() {
        let params = this.$route.query ? Object.assign({}, this.$route.query) : {};
        console.log(this.$route.query);
        this.paramsQu = params.change;
      },
      addDefaultValue() {
        this.client.name.first_name = this.paramsQu.client.first_name;
        this.client.name.second_name = this.paramsQu.client.second_name;
        this.client.name.patronymic = this.paramsQu.client.patronymic;

        this.curVal.first_name = this.paramsQu.client.first_name;
        this.curVal.second_name = this.paramsQu.client.second_name;
        this.curVal.patronymic = this.paramsQu.client.patronymic;


        this.client.data.site = this.paramsQu.client.site;
        this.client.data.mail = this.paramsQu.client.mail;
        this.client.data.telephone = this.paramsQu.client.telephone;

        this.client.items = this.paramsQu.client.items;
        this.client.message = this.paramsQu.client.message;
        this.client.post = this.paramsQu.client.post;

      },
      checkerField(field) {
        if (field === 'site' || field === 'mail' || field === 'telephone') {
          return this.client.data[field];
        } else if (field === 'first_name' || field === 'second_name' || field === 'patronymic') {
          return this.client.name;
        } else {
          return this.client[field];
        }
      },
      updateClient() {
        this.paramsQu.client.first_name = this.client.name.first_name;
        this.paramsQu.client.second_name = this.client.name.second_name;
        this.paramsQu.client.patronymic = this.client.name.patronymic;

      Axios.post(`http://localhost:8080/updateClient`, this.paramsQu, {
          headers: {'Authorization': Authentication.getAuthenticationHeader(this)},
          params: {user_id: this.$cookie.get('user_id')}
        }).then(({data}) => {
          console.log('update');
        }).catch(error => {
          console.err(error);
        })
      },
    },
    mounted() {
      this.getParams()
      this.addDefaultValue()

    },
  }

</script>

<style scoped>
  table {
    margin: 10px;
    border-style: solid;
    border-width: 2px 10px 4px 20px;
  }
</style>
