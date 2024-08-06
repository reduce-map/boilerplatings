import gsap from '@/utils/gsap'
const DURATION = 1
const DELAY = 2000
const EASE = 'power4.out'
const POSITIONS = {
  TOP: 0,
  CENTER: 100,
  BOTTOM: 200,
}

const SCALE = {
  CENTER: 1,
  OTHER: 0.95,
}

const OPACITY = {
  CENTER: 1,
  SIDE: 0.55,
  NONE: 0,
}

export class AnimateCarousel {
  listText
  beforeTopFrame
  topFrame
  centerFrame = 0
  bottomFrame = 1
  afterBottomFrame
  firstTime = true
  isRunning = true
  timeline = null

  constructor(list) {
    this.listText = list
    this.topFrame = list.length - 1
    this.beforeTopFrame = list.length - 2
    this.afterBottomFrame = 2
  }

  changePositions() {
    this.afterBottomFrame = this.bottomFrame
    this.bottomFrame = this.centerFrame
    this.centerFrame = this.topFrame
    this.topFrame = this.beforeTopFrame
    this.beforeTopFrame = this.prevIndex()
  }

  prevIndex() {
    return this.beforeTopFrame - 1 >= 0
      ? this.beforeTopFrame - 1
      : this.lastIndex
  }

  animateWithAdditionalParameters(onComplete) {
    this.timeline = gsap
      .timeline({
        duration: DURATION,
        ease: EASE,
        onComplete,
      })
      .add(this.animateAfterBottomFrame.bind(this), '<')
      .add(this.animateTopFrame.bind(this), '<')
      .add(this.animateCenter.bind(this), '<')
      .add(this.animateBottomFrame.bind(this), '<')
      .add(this.animateBeforeTopFrame.bind(this), '<')
  }

  animateTopFrame() {
    return gsap.to(this.listText[this.topFrame], {
      yPercent: POSITIONS.TOP,
      scale: SCALE.OTHER,
      opacity: OPACITY.SIDE,
    })
  }

  animateBeforeTopFrame() {
    return gsap.to(this.listText[this.beforeTopFrame], {
      yPercent: POSITIONS.TOP,
      scale: SCALE.OTHER,
      opacity: OPACITY.NONE,
    })
  }

  animateCenter() {
    return gsap.to(this.listText[this.centerFrame], {
      yPercent: POSITIONS.CENTER,
      scale: SCALE.CENTER,
      opacity: OPACITY.CENTER,
    })
  }

  animateBottomFrame() {
    return gsap.to(this.listText[this.bottomFrame], {
      yPercent: POSITIONS.BOTTOM,
      scale: SCALE.OTHER,
      opacity: OPACITY.SIDE,
    })
  }

  animateAfterBottomFrame() {
    return gsap.to(this.listText[this.afterBottomFrame], {
      yPercent: POSITIONS.BOTTOM,
      scale: SCALE.OTHER,
      opacity: OPACITY.NONE,
    })
  }

  async start() {
    this.isRunning = true
    while (this.isRunning) {
      await new Promise((resolve) =>
        setTimeout(
          () => {
            this.changePositions()
            this.animateWithAdditionalParameters(resolve)
          },
          this.firstTime ? 0 : DELAY
        )
      )
      this.firstTime = false
    }
  }

  stop() {
    this.isRunning = false
  }

  init() {
    this.timeline = gsap
      .timeline()
      .add(this.animateTopFrame.bind(this), '<')
      .add(this.animateCenter.bind(this), '<')
      .add(this.animateBottomFrame.bind(this), '<')
  }

  destroy() {
    this.stop()
    this.timeline.kill()
    this.listText = null
  }

  get lastIndex() {
    return this.listText.length - 1
  }
}
