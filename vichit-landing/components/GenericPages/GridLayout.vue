<template>
  <div class="grid-layout" :class="[`grid-layout--${cols}-col`]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'GridLayout',
  props: {
    cols: {
      type: [String, Number],
      default: 2,
    },
  },
}
</script>

<style lang="scss" scoped>
.grid-layout {
  @apply grid gap-4;
  &--4-col {
    @apply grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4;
  }
  &--2-col {
    @apply grid-cols-1 md:grid-cols-2;
  }
}
</style>
