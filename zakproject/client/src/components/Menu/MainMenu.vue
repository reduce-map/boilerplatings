<template>
 <div> <header-menu></header-menu>
   <select-table></select-table>
   <table-client></table-client>
   <aside-menu></aside-menu>
   <footer-menu></footer-menu></div>
</template>

<script>
  import Header from './Header/HeaderMenu'
  import Aside from './Main/AsideMenu'
  import Footer from './Main/FooterMenu'
  import TableClient from '../Table/TableClient'
  import Select from '../Table/Select'

  export default {
    name: "main-menu",
    components: {
      'header-menu': Header,
      'aside-menu': Aside,
      'footer-menu': Footer,
      'table-client':TableClient,
      'select-table':Select
    }
  }
</script>

<style scoped>

</style>
