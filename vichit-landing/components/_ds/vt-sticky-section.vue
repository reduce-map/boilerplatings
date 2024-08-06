<template>
  <section class="vt-sticky-section">
    <vt-heading level="2" class="sticky top-20 left-0 w-full">
      <slot name="heading" />
    </vt-heading>
    <slot />
  </section>
</template>

<script>
export default {
  name: 'VtStickySection',
}
</script>

<style lang="scss" scoped>
.vt-sticky-section__heading {
  background-color: var(--white);
  @apply sticky top-20 left-0 w-full;
}
</style>
