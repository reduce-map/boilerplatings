<template>
  <canvas
    ref="background"
    class="background-random-dots absolute w-full h-full top-0 left-0"
  ></canvas>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Background3',
  mounted() {
    var canvas
    var context
    var screenH
    var screenW
    var stars = []
    var fps = 50
    var numStars = 2000
    // Calculate the screen size
    screenH = window.innerHeight
    screenW = window.innerWidth

    // Get the canvas
    canvas = this.$refs.background
    canvas.width = screenW
    canvas.height = screenH

    context = canvas.getContext('2d')

    // Create all the stars
    for (var i = 0; i < numStars; i++) {
      var x = Math.round(Math.random() * screenW)
      var y = Math.round(Math.random() * screenH)
      var length = 1 + Math.random() * 2
      var opacity = Math.random()

      // Create a new star and draw
      var star = new Star(x, y, length, opacity)

      // Add the the stars array
      stars.push(star)
    }

    setInterval(animate, 1000 / fps)
    function animate() {
      context.clearRect(0, 0, screenW, screenH)
      stars.forEach((star) => star.draw(context))
    }

    function Star(x, y, length, opacity) {
      this.x = parseInt(x)
      this.y = parseInt(y)
      this.length = parseInt(length)
      this.opacity = opacity
      this.factor = 1
      this.increment = Math.random() * 0.03
    }
    Star.prototype.draw = function () {
      context.rotate((Math.PI * 1) / 10)

      // Save the context
      context.save()

      // move into the middle of the canvas, just to make room
      context.translate(this.x, this.y)

      // Change the opacity
      if (this.opacity > 1) {
        this.factor = -1
      } else if (this.opacity <= 0) {
        this.factor = 1

        this.x = Math.round(Math.random() * screenW)
        this.y = Math.round(Math.random() * screenH)
      }

      this.opacity += this.increment * this.factor

      context.beginPath()
      for (var i = 5; i--; ) {
        // context.lineTo(0, this.length)
        context.arc(this.x, this.y, this.length, 0, this.length * Math.PI)
        // context.translate(0, this.length)
        // context.rotate((Math.PI * 2) / 10)
        // context.lineTo(0, -this.length)
        // context.translate(0, -this.length)
        // context.rotate(-((Math.PI * 6) / 10))
      }
      // context.lineTo(0, this.length)
      context.closePath()
      context.fillStyle = '#000' //'rgba(255, 255, 200, ' + this.opacity + ')'
      context.shadowBlur = 5
      context.shadowColor = '#000'
      context.fill()

      context.restore()
    }
  },
}
</script>
