<template>
  <div class="image-card">
    <div v-if="hasOverlay" class="absolute rounded-lg overlay"></div>
    <div
      class="p-2 h-56 w-full backdrop-blur text-center md:flex-1 image-wrapper"
    >
      <slot name="image" />
    </div>
    <div class="relative image-card__img-content rounded-lg md:flex-[2] md:p-4">
      <div
        class="text-lg text-center font-medium mb-5 md:text-xl"
        :class="{
          'app-text-white': hasOverlay,
        }"
      >
        <slot name="title" />
      </div>
      <div class="image-card__content p-2">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VtCardImage',
  props: {
    hasOverlay: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.image-card {
  @apply relative md:mt-0 flex flex-col md:flex-row md:items-center;

  .image-wrapper {
    @apply md:max-h-[80%];
    * {
      @apply block w-full h-full object-cover rounded-lg  max-w-screen-sm inline;
      @apply md:max-w-none;
    }
  }
  .overlay {
    background-color: var(--vichit-coral);
    border: 1px solid var(--velvet-pink);
    width: 100%;
    height: calc(100% - 7rem);
    bottom: 0;
    z-index: 0;

    @media (min-width: 768px) {
      & {
        height: 100%;
        width: 82%;
        right: 0;
      }
    }
  }
}
</style>
