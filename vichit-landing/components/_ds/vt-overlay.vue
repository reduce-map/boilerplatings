<template>
  <transition name="fade" appear :duration="duration">
    <div
      v-if="open"
      class="overlay"
      :style="{
        'z-index': zIndex,
      }"
      @click="$emit('click')"
    ></div>
  </transition>
</template>

<script>
export default {
  name: 'Overlay',

  props: {
    open: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: [Number, Object],
      default: 300,
    },
    zIndex: {
      type: [Number, String],
      default: 'auto',
    },
  },
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(var(--vichit-blue-rgb), 0.4);
  top: 0;
  left: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
