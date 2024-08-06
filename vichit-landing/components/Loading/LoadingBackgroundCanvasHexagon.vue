<template>
  <div class="loading-bg-canvas-hexagon-holder">
    <div class="canvas-wrapper">
      <canvas ref="canvas" />
    </div>

    <div v-if="showControls" class="control-holder">
      <button type="button" @click="onStart">start</button>
      <button type="button" @click="onStop">stop</button>
    </div>
  </div>
</template>

<script>
class Dot {
  constructor(config, canvasX, canvasY) {
    this.config = config
    this.pos = { x: canvasX, y: canvasY }
    this.dir = ((Math.random() * 3) | 0) * 2
    this.step = 0
    this.dirsList = (() => {
      const result = []
      for (let i = 0; i < 360; i += 360 / 6) {
        const x = Math.cos((i * Math.PI) / 180)
        const y = Math.sin((i * Math.PI) / 180)
        result.push({ x, y })
      }
      return result
    })()
  }

  nextStep() {
    this.moveDot()
    this.changeDir()
    this.redrawDot()
  }

  redrawDot() {
    const color = this.config.dotColor
    const size = this.config.dotSize
    const x = this.pos.x - size / 2
    const y = this.pos.y - size / 2

    drawRect(color, x, y, size, size)
  }

  moveDot() {
    // console.log('moveDot')
    this.step++
    this.pos.x += this.dirsList[this.dir].x
    this.pos.y += this.dirsList[this.dir].y
  }

  changeDir() {
    if (this.step % this.config.stepsToTurn === 0) {
      this.dir =
        Math.random() > 0.5
          ? (this.dir + 1) % this.config.dirsCount
          : (this.dir + this.config.dirsCount - 1) % this.config.dirsCount
    }
  }
}

let ctx = null // side effect, need to set it in vue component
let dotsList = [] // store dot list. may be move to component ?
const drawRect = (color, x, y, w, h) => {
  if (ctx) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)
  }
}

export default {
  name: 'LoadingBackgroundCanvasHexagon',

  props: {
    isDotted: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    showControls: false,
    isCanvasVisible: false,
    requestAnimationFrameId: null,
    canvas: null,
    context2D: null,
    canvasX: null,
    canvasY: null,
    isAnimate: true,
    config: {
      bgFillColor: `rgba(255, 255, 255, 0)`,
      dotColor: '#e10c6c',
      dirsCount: 6,
      stepsToTurn: 20,
      maxDotsCount: 5000,
      dotSize: 2,
    },
  }),

  computed: {
    dotsOnStartAmount() {
      if (this.isDotted) {
        return 2500
      } else {
        // console.log(this.$device.isMobile)
        // console.log(this.$device.isTablet)
        // console.log(this.$device.isDesktop)

        return 200
      }
    },
  },

  mounted() {
    this.canvas = this.$refs.canvas
    ctx = this.canvas.getContext('2d')

    if (this.isDotted) {
      this.config.bgFillColor = `#fff` // or set what ever will be need at that moment
    }

    this.drawCanvas()
  },

  beforeDestroy() {
    this.removeCanvas()
  },

  methods: {
    onStart() {
      this.loop()
    },
    onStop() {
      cancelAnimationFrame(this.requestAnimationFrameId)
      dotsList = []
      this.$log.debug(
        'on stop canvas animation, animation frame was: ',
        this.requestAnimationFrameId
      )
    },
    removeCanvas() {
      this.canvas = null
      this.context2D = null
      window.removeEventListener('resize', this.resizeCanvas)
      this.onStop()
    },

    refreshDots() {
      dotsList.forEach((dot) => {
        dot.nextStep()
      })
    },

    addDot() {
      if (dotsList.length < this.config.maxDotsCount) {
        dotsList.push(new Dot(this.config, this.canvasX, this.canvasY))
      }
    },

    drawCanvas() {
      const startDrawCanvasTime = new Date().valueOf()

      this.resizeCanvas()
      window.addEventListener('resize', this.resizeCanvas)

      for (let i = 0; i < this.dotsOnStartAmount; i++) {
        drawRect(
          this.config.bgFillColor,
          0,
          0,
          this.canvas.width,
          this.canvas.height
        )
        this.addDot()
        this.refreshDots()
      }

      this.loop()
      this.$log.debug(
        'canvas loading time: ',
        new Date().valueOf() - startDrawCanvasTime,
        'dotsList: ',
        dotsList
      )
    },

    loop() {
      if (this.isDotted) {
        drawRect(
          this.config.bgFillColor,
          0,
          0,
          this.canvas.width,
          this.canvas.height
        )
      }

      this.addDot()
      this.refreshDots()
      this.requestAnimationFrameId = requestAnimationFrame(this.loop)
      this.$log.debug('requestAnimationFrameId: ', this.requestAnimationFrameId)
    },

    resizeCanvas() {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.canvasX = 0
      this.canvasY = this.canvas.height
    },
  },
}
</script>

<style lang="scss" scoped>
.loading-bg-canvas-hexagon-holder {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.control-holder {
  position: absolute;
  bottom: 200px;
  left: 200px;
  background: #fff;
}
</style>
