<template>
  <div>
    <child-vue @getMessage="getDataFromChild"></child-vue>
  </div>
</template>

<script>
  import Child from './child'

  export default {
    name: "parent",
    data() {
      return {
        dataFromChild: []
      }
    },
    components: {
      'child-vue': Child,
    },
    methods: {
      getDataFromChild(message) {
        console.log(message);
      }
    },
  }
</script>

<style scoped>

</style>
