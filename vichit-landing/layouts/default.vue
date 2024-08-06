<template>
  <div
    :class="[
      `app-lang-${currentLocalCode}`,
      {
        'scroll-smooth': !pageHasSliderAnimation,
      },
    ]"
    class="app-default-layout app-selection-default js-default-layout"
  >
    <!--    TODO do we need loading on server side -->
    <client-only>
      <main-loading
        v-if="isMainLoadingRendered"
        :loading="isMainLoadingAnimated"
        @loading-end="onLoadingEnd"
      />
    </client-only>

    <div v-show="isPageReadyToShow">
      <main-header :navigation-header="navigationHeader" />
      <burger-navigation :navigation-header="navigationHeader" />

      <nuxt class="z-[1] relative" />
      <cookie-banner />

      <div class="hidden md:block md:h-96" />

      <main-footer />
    </div>

    <!-- app popover and modal holder -->
    <div class="app-modal-holder" />
    <div class="app-popover-holder" />
    <div class="app-tooltip-holder" />
    <client-only>
      <debug-wrapper v-if="isDebugEnabled" />
    </client-only>
  </div>
</template>

<script>
import _ from 'lodash'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions, mapGetters } =
  createNamespacedHelpers('store')
const DebounceGlobalEvenListenersTimeout = 10 // ms by default

export default {
  components: {
    MainLoading: () => import('@/components/Loading/MainLoading.vue'),
    MainHeader: () => import('@/components/Header/MainHeader.vue'),
    MainFooter: () => import('@/components/Footer/main-footer.vue'),
    BurgerNavigation: () => import('@/components/Header/BurgerNavigation.vue'),
    CookieBanner: () => import('@/components/CookieBanner.vue'),
    DebugWrapper: () => import('@/components/debug-wrapper.vue'),
  },
  data() {
    return {
      isClient: process.client,
      navigationHeader: [
        {
          name: 'servicesPage.link',
          link: 'services',
        },
        {
          name: 'expertise.link',
          link: 'expertise',
          // turn off header dropdown for now
          // children: [
          //   {
          //     name: 'technologies.link',
          //     link: 'technologies',
          //   },
          // ],
        },
      ],
    }
  },
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    i18nHead.meta.push({
      content: `${process.env.NUXT_ENV_BASE_URL}${this.$route.fullPath}`,
      property: 'og:url',
    })
    return i18nHead
  },
  computed: {
    ...mapState([
      'isPageReadyToShow',
      'isMainLoadingRendered',
      'isDebugEnabled',
      'scrollTop',
      'slidePageNumber',
    ]),
    ...mapGetters([
      'isMainLoadingAnimated',
      'currentLocalCode',
      'pageHasSliderAnimation',
    ]),
  },
  watch: {
    '$i18n.localeProperties.code': 'setupLocalesData',
    'route.name': {
      handler: 'setRouteName',
      immediate: true,
    },
  },

  created() {
    if (this.isClient) {
      // handle client side
      const timeInitApp = new Date().valueOf()
      // eslint-disable no-console
      console.log('default layout is created, setTimeInitApp: ', timeInitApp)
      this.setTimeInitApp(timeInitApp)
    }
  },

  mounted() {
    this.$log.debug('default layout is mounted')

    this.setPageReadyToShow()
    this.setupLocalesData()
    this.setWindowData()
    this.setDeviceData()
    this.setOrientationData()
    this.initGlobalEventListeners()
  },
  beforeDestroy() {
    this.removeGlobalEventListeners()
  },
  methods: {
    setRouteName() {
      this.$log?.debug('set route name: ', this.$route.name)
      this.setRoute(this.$route.name)
    },
    onLoadingEnd() {
      this.setMainLoadingRendered(false)
    },
    ...mapMutations([
      'setMainLoadingRendered',
      'setWindowWidth',
      'setWindowHeight',
      'setDevice',
      'setOrientation',
      'setScrollTop',
      'setScrollDirection',
      'setLocalesData',
      'setRoute',
      'setTimeInitApp',
    ]),
    ...mapActions(['setPageReadyToShow']),
    // MANAGE GLOBAL EVENTS
    initGlobalEventListeners() {
      // init global event listeners to track : device, page width etc.
      // to be able to manage behaviour animation, custom components etc.
      this.setWindowData()
      window.addEventListener('resize', this.setWindowData)
      window.addEventListener('orientationchange', this.setOrientationData)
      document.addEventListener('scroll', this.setScrollData)
    },
    removeGlobalEventListeners() {
      window.removeEventListener('resize', this.setWindowData)
      window.removeEventListener('orientationchange', this.setOrientationData)
      document.removeEventListener('scroll', this.setScrollData)
    },
    // debounce store mutations DebounceGlobalEvenListenersTimeout by default
    setWindowData: _.debounce(function () {
      this.setWindowWidth(window.innerWidth)
      this.setWindowHeight(window.innerHeight)
    }, DebounceGlobalEvenListenersTimeout - 5),
    setScrollData: _.debounce(function () {
      this.setScrollDirection(
        this.scrollTop - window.scrollY > 0 ? 'up' : 'down'
      )
      this.setScrollTop(window.scrollY)
    }, DebounceGlobalEvenListenersTimeout + 5),
    // ###########################################
    setOrientationData() {
      const orientation =
        _.get(window, 'screen.orientation.type') || window.orientation

      if (
        orientation === 'portrait-primary' ||
        orientation === 90 ||
        orientation === -90
      ) {
        this.setOrientation('portrait')
      } else if (
        orientation === 'landscape-primary' ||
        orientation === 0 ||
        orientation === 180
      ) {
        this.setOrientation('landscape')
      }
    },
    setDeviceData() {
      this.setDevice(
        _.pick(this.$device, [
          'isTablet',
          'isMobile',
          'isDesktop',
          'isMobileOrTablet',
          'isDesktopOrTablet',
        ])
      )
    },
    setupLocalesData() {
      const currentLocalCode = this.$i18n.localeProperties.code
      const fallbackLocal = this.$i18n.locales.filter(
        ({ code }) => currentLocalCode !== code
      )[0]
      const fallbackLocalCode = fallbackLocal?.code

      this.setLocalesData({
        currentLocalCode,
        fallbackLocal,
        fallbackLocalCode,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.app-default-layout {
  overflow-x: hidden;
  width: 100%;
  position: relative;
}
.app-popover-holder {
  position: relative;
  z-index: 1000;
}
</style>
