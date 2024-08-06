<template>
  <div
    class="app-page-indent first-slide-holder"
    :class="{
      'first-slide-holder--slider-animation': pageHasSliderAnimation,
    }"
  >
    <div class="bg-first-slide" />
    <div
      class="app-page-wrapper first-slide-content"
      :class="{
        'first-slide-content--slider-animation': pageHasSliderAnimation,
      }"
    >
      <div class="self-center">
        <typer-first-slide ref="typer" :show-typer="showTyper" />
        <vt-heading :level="1">
          <span class="main-heading-text">
            <span ref="banner-text-prefix" class="inline-block mb-2">
              {{ $t('firstSlide.bannerText.prefix') }}
            </span>
            <span
              v-for="(text, index) in $t('firstSlide.bannerText.textList')"
              :key="`translated-item-${index}`"
              ref="banner-text-list"
              class="block"
            >
              <span
                class="highlight-container"
                :class="`highlight-container-${index + 1}`"
              >
                <span>
                  {{ text }}
                </span>
              </span>
            </span>
          </span>
        </vt-heading>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import TyperFirstSlide from '../Content/TyperFirstSlide.vue'
import gsap from '@/utils/gsap'
const { mapGetters, mapState } = createNamespacedHelpers('store')

export default {
  name: 'FirstSlide',
  components: { TyperFirstSlide },
  props: {
    currentSlide: {
      type: Object,
      required: true,
    },
    slideId: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    animateOption: null,
    showTyper: false,
    loaded: false,
  }),
  computed: {
    ...mapState(['isMainLoadingRendered', 'isPageReadyToShow']),
    ...mapGetters(['pageHasSliderAnimation', 'deviceConfig']),
  },
  watch: {
    isPageReadyToShow() {
      this.init()
    },
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      if (this.isPageReadyToShow && !this.loaded) {
        this.loaded = true
        this.animateOption = {
          duration: 0.2,
        }
        this.animate()
      }
    },
    animate() {
      const textList = [
        this.$refs['banner-text-prefix'],
        ...this.$refs['banner-text-list'],
      ]

      this.fadeInDown(this.$refs.typer.$el, {
        ...this.animateOption,
        onComplete: () => {
          this.showTyper = true
        },
      })
      textList.forEach((target) => {
        this.fadeInDown(target, this.animateOption)
      })
    },

    fadeInDown(target, option) {
      const isMobile = this.$device.isMobile
      gsap
        .timeline(option)
        .from(target, {
          opacity: 0,
          [isMobile ? 'y' : 'yPercent']: -100,
        })
        .to(target, {
          opacity: 1,
          y: 0,
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.first-slide-holder {
  @apply relative flex;

  &--slider-animation {
    @apply w-full min-h-screen;
  }
}
.first-slide-content {
  color: var(--white);
  @apply flex pt-32 pb-12;

  &--slider-animation {
    @apply pt-0 pb-28;
  }
}

.main-heading-text {
  @apply block uppercase text-3xl leading-normal font-bold;
  @apply lg:text-4xl lg:leading-normal;
}

.bg-first-slide {
  background: var(--black) url('~/assets/img/bg-slide-1.png');
  height: calc(100% + var(--app-header-height) + 230px);
  transform: translate3d(0, 0, 0);
  @apply absolute left-0 top-0 w-full z-[-1];
}

.highlight-container {
  @apply relative inline-block;
  &:before {
    content: '';
    @apply absolute block w-full;
    height: 98%;
    margin-left: -3px;
    margin-right: -3px;
    background: rgba(
      var(--vichit-purple-rgb),
      var(--highlight-background-opacity)
    );
    top: -1px;
    left: -1px;
    z-index: -1;
  }

  span {
    @apply relative pr-1 mr-1;
  }

  &-1 {
    &:before {
      background-color: rgba(
        var(--vichit-purple-rgb),
        var(--highlight-background-opacity)
      );
    }
  }
  &-2 {
    &:before {
      background-color: rgba(
        var(--vichit-blue-rgb),
        var(--highlight-background-opacity)
      );
    }
  }
  &-3 {
    &:before {
      background-color: rgba(
        var(--vichit-green-rgb),
        var(--highlight-background-opacity)
      );
    }
  }
}
</style>
