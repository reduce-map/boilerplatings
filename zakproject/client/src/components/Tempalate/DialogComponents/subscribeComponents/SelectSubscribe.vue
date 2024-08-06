<template>
  <v-container fluid  class="search" >
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-subheader v-text="'Subscribe'"></v-subheader>
      </v-flex>
      <v-btn>Search</v-btn>
      <v-btn>GetAll</v-btn>
    </v-layout>
    <v-layout >
      <v-list-tile-content>
        <v-list-tile-title>Параметры поиска</v-list-tile-title>
        <v-list-tile-sub-title>По сайту:</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
        name: "select-subscribe"
    }
</script>

<style scoped>

</style>
