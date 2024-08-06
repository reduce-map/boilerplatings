<template>
  <div id="app">
    <component
      :is="pageWrapper"
      @change-slide="changeSlide"
      @shape-out-end="shapeEnd"
    >
      <first-slide :slide-id="0" :current-slide="slide" />
      <second-slide :slide-id="1" :current-slide="slide" />
      <third-slide :slide-id="2" />
    </component>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import AnimateSlider from '@/components/FullPageSlider/AnimateSlider.vue'
import FirstSlide from '~/components/IndexSlides/FirstSlide.vue'
import SecondSlide from '~/components/IndexSlides/SecondSlide.vue'
import ThirdSlide from '~/components/IndexSlides/ThirdSlide.vue'
// import { horizontalAnimate } from '@/utils/animations'
const { mapGetters, mapMutations } = createNamespacedHelpers('store')
export default {
  name: 'Index',
  components: {
    AnimateSlider,
    FirstSlide,
    SecondSlide,
    ThirdSlide,
  },
  asyncData() {
    return {
      slide: {
        value: 0,
      },
    }
  },
  head() {
    return this.$setupHead('index')
  },
  computed: {
    ...mapGetters(['pageHasSliderAnimation']),
    pageWrapper() {
      return this.pageHasSliderAnimation ? 'animate-slider' : 'div'
    },
  },
  mounted() {
    this.$log.debug('index page is mounted')
  },
  methods: {
    ...mapMutations(['setSliderPageNumber']),
    changeSlide(value) {
      this.slide.value = value
      this.setSliderPageNumber(this.slide.value)

      // TODO uncomment this for animation second slide
      // if (value === 1) {
      //   horizontalAnimate(
      //     Array.from(
      //       document.querySelectorAll('.second-slide-holder .slide-in'),
      //       (target) => ({
      //         target,
      //         trigger: target.parentElement,
      //       })
      //     ),
      //     { fromLeft: false, horizontal: false }
      //   )
      // }
    },
    shapeEnd() {
      this.$log.debug('shape-end')
    },
  },
}
</script>
