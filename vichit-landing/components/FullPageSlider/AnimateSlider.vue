<template>
  <div class="relative">
    <svg-animate
      ref="svg-animate"
      @shape-in-begin="$emit('shape-in-begin')"
      @shape-in-end="$emit('shape-in-end')"
      @shape-out-begin="$emit('shape-out-begin')"
      @shape-out-end="shapeOutEnd"
    />
    <slider
      ref="slider"
      @move-end="moveEnd"
      @move-start="$emit('move-start')"
      @scroll-to="scrollTo"
      @change-slide="$emit('change-slide', $event)"
    >
      <slot />
    </slider>
  </div>
</template>

<script>
import SvgAnimate from '@/components/FullPageSlider/SvgAnimate.vue'
import Slider from '@/components/FullPageSlider/Slider.vue'
import { sleep } from '@/utils/helper'
export default {
  name: 'AnimateSlider',
  components: { SvgAnimate, Slider },
  data: () => ({
    SvgAnimate: null,
    Slider: null,
    isInit: false,
  }),

  async mounted() {
    const slider = this.$refs.slider
    this.SvgAnimate = this.$refs['svg-animate']
    this.Slider = slider
    await this.$nextTick()
    await this.SvgAnimate.init()
    this.$emit('init', this)
  },

  methods: {
    async scrollTo(svgAnimate = true, isInit = false) {
      this.isInit = isInit
      if (svgAnimate) {
        await this.SvgAnimate.shapeIn()
        await this.Slider.slide()
      }

      if (isInit) {
        await this.Slider.slide()
      }

      if (!svgAnimate) {
        this.shapeOutEnd()
      }
    },
    async moveEnd(svgAnimate = true) {
      if (this.isInit) {
        await sleep(this.shapeOutEnd, 1000)
      } else if (svgAnimate) {
        await this.SvgAnimate.shapeOut()
      } else {
        this.shapeOutEnd()
      }
    },

    shapeOutEnd() {
      this.Slider.allowScroll()
      this.$emit('shape-out-end')
    },
  },
}
</script>
