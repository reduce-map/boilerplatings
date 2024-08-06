<template>
  <div
    class="second-slide-holder"
    :class="{
      'second-slide-holder--slider': pageHasSliderAnimation,
    }"
  >
    <div
      class="bg-second-slide"
      :class="{
        'bg-second-slide-slider': pageHasSliderAnimation,
      }"
    />
    <div class="app-page-wrapper second-slide-content">
      <services-second-slide class="self-center" />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('store')
export default {
  name: 'SecondSlide',
  components: {
    ServicesSecondSlide: () =>
      import('@/components/Content/ServicesSecondSlide.vue'),
  },
  props: {
    currentSlide: {
      type: Object,
      required: true,
    },
    slideId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['pageHasSliderAnimation']),
  },
}
</script>

<style lang="scss" scoped>
.bg-second-slide {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background: var(--white);
  transform: translate3d(0, 0, 0);
  z-index: -2;
}

.bg-second-slide-slider {
  height: calc(100% + 110px);
}
.second-slide-holder {
  display: flex;
  position: relative;
  @apply pt-16;

  &--slider {
    width: 100%;
    min-height: 100vh;
    @apply pt-28;
  }
}
.second-slide-content {
  @apply sm:items-center md:pb-36;
  display: flex;
}
</style>
