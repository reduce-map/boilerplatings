<template>
  <div>
    <button @click="isOn=!isOn">Click</button>
    <div v-show="isOn">
      <app_dialog v-model="isOn"></app_dialog>
    </div>
  </div>
</template>

<script>
  import Dialog from './Dialog'

  export default {
    data() {
      return {
        isOn: false,
      }
    },
    components: {
      'app_dialog': Dialog
    }
  }
</script>

<style scoped>

</style>
