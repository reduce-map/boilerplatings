<template>
  <canvas
    ref="background"
    class="bg-white absolute w-full h-full top-0 left-0"
  ></canvas>
</template>

<script>
import { WatersCircle } from './utils'
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
    waterCircles: [],
    isAlive: true,
    frame: 0,
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
  beforeDestroy() {
    this.isAlive = false
    this.waterCircles.forEach((waterCircle) => waterCircle.destroy())
    this.canvas = null
    this.context2D = null
    window.removeEventListener('resize', this.onResize)
  },
  mounted() {
    this.canvas = this.$refs.background
    this.context2D = this.canvas.getContext('2d')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    window.addEventListener('resize', this.onResize)

    if (this.startAnimate) {
      this.animate()
    }
  },
  methods: {
    onResize() {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
    },
    animate() {
      if (this.startAnimate && this.isAlive) {
        requestAnimationFrame(this.animate)
        this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.frame += 1
        this.handleCircle()
      }
    },

    handleCircle() {
      this.waterCircles = this.waterCircles.filter((el) => {
        el.update()
        el.draw()

        if (el.exit) {
          el.destroy()
          return false
        }
        return true
      })

      if (this.frame % 2 === 0) {
        this.waterCircles.push(
          new WatersCircle({ canvas: this.canvas, context2D: this.context2D })
        )
      }
    },
  },
}
</script>
