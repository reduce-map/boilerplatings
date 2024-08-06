export class Circle {
  id
  x
  y
  dx
  dy
  radius
  color = '#fff'
  context2D
  canvas

  constructor(option) {
    this.id = option.id
    this.x = option.x
    this.y = option.y
    this.dx = option.dx
    this.dy = option.dy
    this.radius = option.radius
    this.context2D = option.context2D
    this.canvas = option.canvas
  }

  draw() {
    this.context2D.beginPath()
    this.context2D.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    this.context2D.fillStyle = this.color
    this.context2D.fill()
    this.context2D.stroke()
  }

  update() {
    this.draw()
    if (
      this.x + this.radius >= this.canvas.width ||
      this.x - this.radius <= 0
    ) {
      return this.id
    }
    if (
      this.y + this.radius >= this.canvas.height ||
      this.y - this.radius <= 0
    ) {
      return this.id
    }
    this.x += this.dx
    this.y -= this.dy
  }

  destroy() {
    this.context2D = null
    this.canvas = null
  }
}

export const counter = (
  (count = 1) =>
  () => {
    count += 1
    return count
  }
)()

export class WatersCircle {
  size = 1
  opacity = 1
  context2D
  colorH = this.rnd(1, 360)
  colorH = this.rnd(1, 360)
  color = `rgba(0, 0, 0, ${this.opacity})`
  speedx = Math.random() * 5 - 2.5
  speedy = Math.random() * 5 - 2.5
  exit = false

  constructor({ canvas, context2D }) {
    this.x = this.rnd(10, canvas.width)
    this.y = this.rnd(10, canvas.height)
    this.context2D = context2D
  }

  rnd(min, max) {
    return Math.floor(Math.random() * max) + min
  }

  update() {
    this.opacity -= 0.004
    this.color = `rgba(0, 0, 0, ${this.opacity})`
    this.size += 0.15
    if (this.opacity < 0) {
      this.exit = true
    }
  }

  draw() {
    this.context2D.beginPath()
    this.context2D.fillStyle = this.color
    this.context2D.strokeStyle = this.color
    this.context2D.lineWidth = 2
    this.context2D.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    this.context2D.stroke()
  }

  destroy() {
    this.context2D = null
  }
}
