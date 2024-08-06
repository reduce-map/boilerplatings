<template>
  <div v-if="isDebugEnabled" class="debug-wrapper">
    <!--    <p>scrollTop {{ scrollTop }}</p>-->
    <!--    <p>scrollDirection {{ scrollDirection }}</p>-->
    <!--    <p>windowWidth {{ windowWidth }}</p>-->
    <!--    <p>windowHeight {{ windowHeight }}</p>-->
    <!--    <p><strong>touchData</strong> {{ touchData }}</p>-->
    <!--    <p>deviceConfig {{ deviceConfig }}</p>-->
    <p>isBurgerMenuOpened {{ isBurgerMenuOpened }}</p>
    <p>pageHasSliderAnimation {{ pageHasSliderAnimation }}</p>
    <!--    <p>timeInitApp {{ timeInitApp }}</p>-->
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters } = createNamespacedHelpers('store')

export default {
  name: 'DebugWrapper',
  data() {
    return {
      touchData: null, // debug data remove after
    }
  },
  computed: {
    ...mapState([
      'isDebugEnabled',
      'isBurgerMenuOpened',
      'scrollTop',
      'scrollDirection',
      'windowWidth',
      'windowHeight',
      'deviceConfig',
      'timeInitApp',
    ]),
    ...mapGetters(['pageHasSliderAnimation']),
  },
  mounted() {
    document.addEventListener('touchmove', this.setTouchData)
  },
  beforeDestroy() {
    document.removeEventListener('touchmove', this.setTouchData)
  },
  methods: {
    setTouchData(event) {
      this.touchData = event.touches[0].pageY
    },
  },
}
</script>

<style lang="scss" scoped>
.debug-wrapper {
  padding: 10px;
  position: fixed;
  width: 300px;
  bottom: 20px;
  left: 20px;
  background: #fff;
  opacity: 0.8;
  z-index: 9999;
}
</style>
