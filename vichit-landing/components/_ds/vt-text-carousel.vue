<template>
  <ul class="vt-text-carousel">
    <li
      v-for="(value, index) in items"
      :key="index"
      ref="text-li"
      class="vt-text-carousel__item"
      :class="{
        'vt-text-carousel__item--center': index === AnimateCarousel.centerFrame,
        'vt-text-carousel__item--top': index === AnimateCarousel.topFrame,
        'vt-text-carousel__item--bottom': index === AnimateCarousel.bottomFrame,
      }"
    >
      <slot :option="{ value, index }" />
    </li>
  </ul>
</template>

<script>
import { AnimateCarousel } from '@/utils/text-carousel-utils'
export default {
  name: 'VtTextCarousel',
  props: {
    items: {
      type: Array,
      required: true,
      validator(items) {
        return items && items.length >= 5
      },
    },
  },

  data() {
    return {
      AnimateCarousel: {},
    }
  },

  mounted() {
    this.AnimateCarousel = new AnimateCarousel(this.$refs['text-li'])
    this.AnimateCarousel.init()
    this.AnimateCarousel.start()
  },

  beforeDestroy() {
    this.AnimateCarousel.destroy()
    this.AnimateCarousel = {}
  },
}
</script>

<style lang="scss" scoped>
.vt-text-carousel {
  @apply relative h-60 mt-6 overflow-hidden;
}

.vt-text-carousel__item {
  @apply absolute w-full h-20 opacity-0;

  &--top {
    @apply origin-[center_bottom];
  }
  &--center {
    @apply origin-center border-y;
  }
  &--bottom {
    @apply origin-[center_top];
  }
}
</style>
