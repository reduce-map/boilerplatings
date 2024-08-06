<template>
  <v-container>
   <v-layout raw wrap>
     <v-form>
       <v-text-field label="first_name"
                     v-model="client.name.first_name"
                     color="green lighten-1">
       </v-text-field>
       <v-text-field label="second_name"
                     v-model="client.name.second_name"
                     color="green lighten-1">
       </v-text-field>
       <v-text-field label="patronymic"
                     v-model="client.name.patronymic"
                     color="green lighten-1">
       </v-text-field>
       <v-text-field label="site"
                     v-model="client.data.site"
                     color="green lighten-1">
       </v-text-field>
       <v-text-field label="email"
                     v-model="client.data.mail"
                     color="green lighten-1">
       </v-text-field>
       <v-text-field label="telephone"
                     v-model="client.data.telephone"
                     color="green lighten-1">
       </v-text-field>
       <v-text-field label="Message"
                     v-model="client.message"
                     color="green lighten-1">
       </v-text-field>
         <v-text-field label="Post"
                       v-model="client.post"
                       color="green lighten-1">
         </v-text-field>
     </v-form>
   </v-layout>
        <v-btn block color="md-add-item-btn green lighten-1" @click.native="saveClient(client)">Save</v-btn>

</v-container>
</template>

<script>
  export default {
    data() {
      return {
        client: {
        name: {
          first_name: '',
            second_name: '',
            patronymic: ''
          },
          data: {
            site: '',
            mail: '',
            telephone: '',
          },
          items: '',
          message: '',
          post: '',
        }
      }
    },
  }
</script>

<style scope>


</style>

