<template>
  <svg
    class="fixed w-full h-full z-10 top-0 left-0 pointer-events-none"
    width="100%"
    height="100%"
  >
    <defs>
      <linearGradient :id="id" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#643066">
          <animate
            attributeName="stop-color"
            values="#643066; #6868ac; #643066"
            dur="5s"
            repeatCount="indefinite"
          ></animate>
        </stop>
        <stop offset="50%" stop-color="#db6f91">
          <animate
            attributeName="stop-color"
            values="#db6f91; #643066; #db6f91"
            dur="3s"
            repeatCount="indefinite"
          ></animate>
        </stop>
        <stop offset="100%" stop-color="#643066">
          <animate
            attributeName="stop-color"
            values="#643066; #e99276; #643066"
            dur="5s"
            repeatCount="indefinite"
          ></animate>
        </stop>
      </linearGradient>
    </defs>
    <path ref="shape" :fill="`url(#${id})`" d="" />
  </svg>
</template>

<script>
/* eslint-disable vue/require-prop-types */
import { animateShapeIn, animateShapeOut, calculatePath } from './utils'
import { getRandomString } from '@/utils/helper'

export default {
  name: 'SvgAnimate',

  data: () => ({
    id: null,
    viewBoxWidth: 0,
    viewBoxHeight: 0,
    paths: {},
    frameSize: 0,
  }),

  mounted() {
    window.addEventListener('resize', this.init)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.init)
  },

  methods: {
    async init() {
      this.id = getRandomString('SVG_BORDER')
      this.setSizes()
      const viewport = { height: this.viewBoxHeight, width: this.viewBoxWidth }
      this.paths = {
        initial: calculatePath(viewport, this.frameSize, 'initial'),
        final: calculatePath(viewport, this.frameSize),
      }
      await this.$nextTick()
    },
    setSizes() {
      this.viewBoxWidth = window.innerWidth
      this.viewBoxHeight = window.innerHeight
      this.frameSize = this.viewBoxWidth / 20
    },
    async shapeIn() {
      await this.init()
      this.$emit('shape-in-begin')
      await animateShapeIn(this.$refs.shape, this.paths)
      this.$emit('shape-in-end')
    },

    async shapeOut() {
      await this.init()
      this.$emit('shape-out-begin')
      await animateShapeOut(this.$refs.shape, this.paths)
      this.$emit('shape-out-end')
    },
  },
}
</script>
