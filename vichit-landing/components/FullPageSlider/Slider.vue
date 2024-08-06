<template>
  <div ref="slider" class="relative">
    <div
      v-for="(node, i) in filteredSlots"
      :id="`slides-${i}`"
      :key="i"
      ref="slides"
      :data-slide="i"
    >
      <render-slot :node="node" />
    </div>
    <button-scroll-down
      v-if="!isLastSlidePosition"
      :is-white="current === 0"
      @next-page="nextSlide"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import {
  animateSlideTo,
  getIntersectionObserver,
  getSlideId,
  debounce,
} from './utils'
import gsap from '@/utils/gsap'
const keys = { ArrowDown: true, ArrowUp: true, Space: true }
const { mapState } = createNamespacedHelpers('store')

export default {
  name: 'Slider',
  components: {
    RenderSlot: () => import('./RenderSlot.vue'),
    ButtonScrollDown: () =>
      import('@/components/FullPageSlider/ButtonScrollDown'),
  },
  data: () => ({
    current: 0,
    isAnimating: false,
    slides: [],
    scrollStopped: true,
    touchStart: 0,
    touchEnd: 0,
    observer: null,
    intersections: {},
    lastIndex: null,
    styleOption: {},
    touchMoveCalls: [],
    rangeToSlide: 5,
  }),
  computed: {
    ...mapState(['slidePageNumber', 'isPageReadyToShow']),
    filteredSlots() {
      return this.$slots.default.filter((v) => v.tag)
    },
    isLastSlidePosition() {
      return this.current === this.lastIndex
    },
  },
  watch: {
    current: {
      handler() {
        this.$emit('change-slide', this.current)
      },
    },
    async isPageReadyToShow() {
      await this.init()
    },
  },
  beforeDestroy() {
    this.$refs.slides.forEach((el) => {
      this.observer.unobserve(el)
    })

    this.slides.forEach((slide) => {
      delete slide.slideTo
    })

    this.slides = []
    this.destroyEvents()
  },
  async mounted() {
    this.current = this.slidePageNumber
    this.$emit('init')
    this.initIntersectionObserver()
    this.initEvents()
    this.initSlides()
    this.lastIndex = this.slides.length - 1
    await this.init()
  },
  methods: {
    async init() {
      if (this.isPageReadyToShow && this.current !== 0) {
        await this.$nextTick()
        this.scrollStopped = false
        this.isAnimating = true
        this.$emit('scroll-to', false, true)
      }
    },
    // Parent calls this method
    slide() {
      this.slides[this.current].slideTo()
    },

    initSlides() {
      this.slides = this.$refs.slides.map((el, i) => ({
        slideTo: (svgAnimate = true) => {
          animateSlideTo({
            el,
            onComplete: () => {
              this.$emit('move-end', svgAnimate)
            },
          })
        },
      }))
    },

    initIntersectionObserver() {
      this.observer = getIntersectionObserver((intersections) => {
        this.intersections = {
          ...this.intersections,
          ...intersections,
        }
      })

      this.$refs.slides.forEach((el) => {
        this.observer.observe(el)
      })
    },

    nextSlide() {
      if (!this.isAnimating) {
        this.slideToNext()
      }
    },

    scrollStop: debounce(function () {
      this.scrollStopped = true
      if (this.current === this.$refs.slides.length - 1) {
        const slideId = getSlideId(this.intersections, this.current)

        if (slideId !== undefined && this.slides[slideId]) {
          this.changeSlide(slideId, true, true)
          this.slides[this.current].slideTo(false)
        }
      }
    }, 100),
    touchMoveStop: debounce(function () {
      this.touchEnd = this.touchMoveCalls.pop()
      this.touchStart = this.touchMoveCalls[0]

      const isNext =
        this.touchStart > this.touchEnd + this.rangeToSlide &&
        this.current + 1 <= this.lastIndex

      const isPrev =
        this.touchStart < this.touchEnd - this.rangeToSlide &&
        this.current - 1 >= 0

      isNext && this.slideToNext(!this.isLastSlidePosition)
      isPrev && this.slideToPrev(!this.isLastSlidePosition)
      this.touchMoveCalls = []
    }, 100),

    touchMoveHandler(e) {
      this.touchMoveCalls.push(e.touches[0].clientY)
      if (!this.isLastSlidePosition || this.isAnimating) {
        e.preventDefault()
      }
      if (!this.isAnimating && this.scrollStopped && !this.isLastSlidePosition)
        this.touchMoveStop(e)
    },

    // Parent calls this method
    allowScroll() {
      const tl = gsap.timeline()
      tl.fadeOut('.scroll-down')
      setTimeout(() => {
        this.isAnimating = false
      }, 450)
    },

    buttonScrollFadeIn(onComplete = () => {}) {
      const tl = gsap.timeline()
      tl.fadeIn('.scroll-down', {
        onComplete,
      })
    },

    initEvents() {
      window.addEventListener('wheel', this.preventDefault, { passive: false }) // modern desktop
      window.addEventListener(
        'keydown',
        this.preventDefaultForScrollKeys,
        false
      )
      window.addEventListener('touchmove', this.touchMoveHandler, {
        passive: false,
      })
      window.addEventListener('mouseup', this.mouseUpHandler)
      window.addEventListener('scroll', this.scrollStop, false)
    },

    destroyEvents() {
      window.removeEventListener('wheel', this.preventDefault, {
        passive: false,
      })
      window.removeEventListener(
        'keydown',
        this.preventDefaultForScrollKeys,
        false
      )
      window.removeEventListener('touchmove', this.touchMoveHandler, {
        passive: false,
      })
      window.removeEventListener('mouseup', this.mouseUpHandler)
      window.removeEventListener('scroll', this.scrollStop, false)
    },

    preventDefault(e) {
      if (
        !this.isAnimating &&
        this.scrollStopped &&
        !this.isLastSlidePosition
      ) {
        if (e.type === 'wheel') {
          this.wheelHandler(e)
        }

        if (e.type === 'keydown') {
          this.keydownHandler(e)
        }
      }

      if (!this.isLastSlidePosition || this.isAnimating) {
        e.preventDefault()
      }
    },

    preventDefaultForScrollKeys(e) {
      if (keys[e.code]) {
        this.preventDefault(e)
        return false
      }
    },

    mouseUpHandler(e) {
      if (e.toElement.nodeName === 'HTML' && !this.isAnimating) {
        const slideId = getSlideId(this.intersections, this.current)
        if (slideId !== undefined) {
          this.changeSlide(slideId)
          this.slides[slideId].slideTo(false)
        }
      }
    },

    keydownHandler(e) {
      if (e.code === 'ArrowDown' || (!e.shiftKey && e.code === 'Space')) {
        if (this.current + 1 <= this.lastIndex) {
          this.slideToNext(!this.isLastSlidePosition)
        }
      }
      if (e.code === 'ArrowUp' || (e.shiftKey && e.code === 'Space')) {
        if (this.current - 1 >= 0) {
          this.slideToPrev(!this.isLastSlidePosition)
        }
      }
    },

    wheelHandler(e) {
      if (e.deltaY < 0) return this.current && this.slideToPrev()
      if (this.current + 1 <= this.lastIndex) this.slideToNext()
    },

    slideToNext(svgAnimate = true) {
      this.changeSlide(this.current + 1)
      this.buttonScrollFadeIn(() => this.$emit('scroll-to', svgAnimate))
    },

    slideToPrev(svgAnimate = true) {
      this.changeSlide(this.current - 1)
      this.buttonScrollFadeIn(() => this.$emit('scroll-to', svgAnimate))
    },

    changeSlide(value, scrollStopped = false, isAnimating = true) {
      this.scrollStopped = scrollStopped
      this.isAnimating = isAnimating
      this.current = value
    },
  },
}
</script>
