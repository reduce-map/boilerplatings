<template>
  <canvas
    ref="background"
    class="background-random-dots absolute w-full h-full top-0 left-0"
    :class="{
      'h-[105%]': $device.isMobileOrTablet,
    }"
  ></canvas>
</template>

<script>
import { counter, Circle } from './utils'

export default {
  props: {
    startAnimate: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    canvas: null,
    context2D: null,
    circles: {},
    isAlive: true,
  }),

  watch: {
    startAnimate: {
      handler(isStart) {
        if (isStart) {
          this.animate()
        }
      },
    },
  },

  mounted() {
    this.canvas = this.$refs.background
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.context2D = this.canvas.getContext('2d')

    Array.from({ length: 50 }, this.createCircle)

    if (this.startAnimate) {
      this.animate()
    }

    window.addEventListener('resize', this.onResize)
  },

  beforeDestroy() {
    this.isAlive = false
    Object.values(this.circles).forEach((circle) => circle.destroy())
    this.canvas = null
    this.context2D = null
    window.removeEventListener('resize', this.onResize)
  },

  methods: {
    onResize() {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
    },
    animate() {
      if (this.startAnimate && this.isAlive) {
        requestAnimationFrame(this.animate)
        this.context2D.clearRect(0, 0, window.innerWidth, window.innerHeight)
        for (const key in this.circles) {
          const id = this.circles[key].update()
          if (id) {
            this.circles[id].destroy()
            delete this.circles[id]
            this.createCircle()
          }
        }
      }
    },
    createCircle() {
      const radius = Math.floor(Math.random() * 2) + 1
      const x = Math.random() * (window.innerWidth - radius * 2) + radius
      const y = Math.random() * (window.innerHeight - radius * 2) + radius
      const id = counter()
      this.circles[id] = new Circle({
        x,
        y,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
        radius,
        id,
        context2D: this.context2D,
        canvas: this.canvas,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.background-random-dots {
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
}
</style>
