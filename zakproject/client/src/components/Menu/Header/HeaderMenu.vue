<template>
  <header>
    <div class="wrap">
      <div class="logo">
        <div class="title">Logo name</div>
        <div class="subtitle">Descriptions logo</div>
      </div>
      <navigator></navigator>
    </div>
  </header>
</template>

<script>
  import Navigator from './Navigator'

  export default {
    components: {
      'navigator': Navigator
    },
    name: "main-header"
  }
</script>

<style lang="scss">
  @import '../../../assets/css/positionClassic.css';

</style>
