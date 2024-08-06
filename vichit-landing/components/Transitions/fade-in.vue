<template>
  <component
    :is="component"
    tag="div"
    enter-active-class="animate__animated animate__fadeInUp"
    :leave-active-class="leaveActiveClass"
    mode="out-in"
    appear
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'FadeIn',
  props: {
    component: {
      type: String,
      default: 'transition',
    },
    leaveActive: {
      type: String,
      default: 'animate__fadeOutDown',
    },
  },

  computed: {
    leaveActiveClass() {
      return `animate__animated ${this.leaveActive}`
    },
  },
}
</script>
