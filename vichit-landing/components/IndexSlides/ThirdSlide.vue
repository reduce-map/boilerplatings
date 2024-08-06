<template>
  <div
    class="third-slide-holder"
    :class="{
      'third-slide-holder--slider': pageHasSliderAnimation,
    }"
  >
    <div
      class="bg-third-slide"
      :class="{
        'bg-third-slide-slider': pageHasSliderAnimation,
      }"
    />
    <content-third-slide class="app-page-wrapper" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('store')

export default {
  components: {
    ContentThirdSlide: () => import('@/components/Content/ContentThirdSlide'),
  },
  computed: {
    ...mapGetters(['pageHasSliderAnimation']),
  },
}
</script>

<style lang="scss" scoped>
.third-slide-holder {
  display: flex;
  position: relative;
  @apply pt-16;

  &--slider {
    width: 100%;
    min-height: 100vh;
    @apply pt-28;
  }
}

.bg-third-slide {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  z-index: -1;
  width: 100%;
  background: var(--white);
  transform: translate3d(0, 0, 0);
}

.bg-third-slide-slider {
  height: calc(100% - var(--app-header-height));
}
</style>
