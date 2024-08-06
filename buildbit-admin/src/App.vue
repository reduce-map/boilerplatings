<template>
<!--  <MyGridComponent />-->
  <RichGridExample />
  <Button type="primary">Primary Button</Button>
</template>

<script>
// import MyGridComponent from './components/MyGridComponent.vue';
import RichGridExample from "./components/rich-grid-example/RichGridExample.vue"

export default {
  name: 'App',
  components: {
    // MyGridComponent,
    RichGridExample
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
}

.my-grid {
  flex: 1;
}
</style>
