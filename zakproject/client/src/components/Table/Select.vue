<template>
  <div>
    <v-container fluid  class="search" >
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-subheader v-text="'Sites'"></v-subheader>
        </v-flex>
        <v-flex xs12 sm6>
          <v-select
            label="Site"
            autocomplete
          ></v-select>
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
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  .search {
    transition-duration: .2s;
  }
</style>
