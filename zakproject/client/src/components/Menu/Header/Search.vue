<template>
  <div>
    <v-text-field label="Mail"
                  v-model="searchValues.mail"
                  prepend-icon="account_box"
                  required
                  color="light-blue lighten-1">
    </v-text-field>
    <v-text-field label="Telephone"
                  v-model="searchValues.telephone"
                  prepend-icon="account_box"
                  required
                  color="light-blue lighten-1">
    </v-text-field>
    <v-text-field label="Telephone"
                  v-model="searchValues.site"
                  prepend-icon="account_box"
                  required
                  color="light-blue lighten-1">
    </v-text-field>
  </div>
</template>

<script>
    export default {
        name: "search",
      data(){
          return {
            searchValues:{
              mail:'',
              telephone:'',
              site:''
            }
          }
      }
    }
</script>

<style scoped>

</style>
