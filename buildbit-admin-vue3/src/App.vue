<template>
  <!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <!--  <page-test />-->
  <!--  <Slider v-model="value" range />-->
  <!--  <RichGridExample class="ag-grid-holder" />-->
  <!--  <LargeDataSetExample />-->
  <!--  <div id="app">-->
  <router-view />
  <!--  </div>-->
</template>

<script>
import PageTest from '@/pages/PageTest.vue';
import RichGridExample from '@/components/rich-grid-example/RichGridExample.vue';
import LargeDataSetExample from '@/components/large-data-set-example/LargeDataSetExample.vue';

export default {
  name: 'App',
  data() {
    return {
      value: [20, 50],
    };
  },
  components: {
    LargeDataSetExample,
    RichGridExample,
    PageTest,
    // HelloWorld
  },
};
</script>

<style>
.ag-grid-holder {
  height: 700px;
}
</style>
