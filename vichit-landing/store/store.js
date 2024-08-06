import _ from 'lodash'

let firstLoading = true // is the default layout loaded first time

export function state() {
  return {
    windowWidth: null, // window width [number]
    windowHeight: null, // window height [number]
    scrollTop: 0, // scroll top [number]
    scrollDirection: null, // ['up', 'down']

    timeInitApp: null, // start loading time to handle first load, will be set in default view on created
    timeLoadingStart: null, // start loading time to handle route change
    timeMinLoading: 1400, // minimum duration for main loading (first load and route change)

    routeName: '', // current route / router name
    localesData: {
      //
      currentLocalCode: null,
      fallbackLocal: null,
      fallbackLocalCode: null,
    },

    deviceConfig: {
      $device: {}, // the section is for nuxt device flags https://github.com/nuxt-community/device-module#flags
      orientation: 'landscape', // device orientation can be ['landscape', 'portrait']
    },

    isMainLoadingRendered: true, // main loading state (but animation is not running!)
    isMainLoadingAnimated: false, // additional flag to control animation for main loading
    isPageReadyToShow: false, // will be true when default layout is loaded and first animation is done | see action setPageReadyToShow
    isBurgerMenuOpened: false, // burger menu open state

    slidePageNumber: 0, // store slidePageNumber and set it back on route change

    // utils state
    isDebugEnabled: process.env.NUXT_ENV_DEBUG_APP === 'true', // when true, debug popup is visible

    // features
    isLanguageSwitchEnabled: false, // enable or disable NL language | TODO uncomment after translation | do translation after 1 week EN last changes (page by page ?)
    isLongLoadingEnabled: false, // enable or disable long loading animation though pages
  }
}
export const mutations = {
  setWindowWidth(state, width) {
    state.windowWidth = width
  },
  setWindowHeight(state, height) {
    state.windowHeight = height
  },
  setScrollTop(state, scrollTop) {
    state.scrollTop = scrollTop
  },
  setScrollDirection(state, direction) {
    state.scrollDirection = direction
  },
  setSliderPageNumber(state, slideNumber) {
    state.slidePageNumber = slideNumber
  },
  setDevice(state, $device) {
    state.deviceConfig.$device = $device
  },
  setOrientation(state, orientation) {
    state.deviceConfig.orientation = orientation
  },
  setRoute(state, routeName) {
    state.routeName = routeName
  },
  setBurgerMenuState(state, isBurgerMenuOpened) {
    state.isBurgerMenuOpened = isBurgerMenuOpened
  },
  setLocalesData(state, localesData) {
    state.localesData = localesData
  },
  // Loading
  setTimeInitApp(state, timeInitApp) {
    state.timeInitApp = timeInitApp
  },
  setPageReadyToShow(state, isPageReadyToShow) {
    state.isPageReadyToShow = isPageReadyToShow
  },
  setMainLoadingRendered(state, isMainLoadingRendered) {
    state.isMainLoadingRendered = isMainLoadingRendered
  },
}

export const actions = {
  setPageReadyToShow({ commit, state }, isPageReadyToShow = true) {
    // console.log('actions setPageReadyToShow is fired ...', isPageReadyToShow, 'firstLoading: ', firstLoading)
    if (firstLoading) {
      firstLoading = false

      const now = new Date().valueOf()
      const delay = now - state.timeInitApp

      if (state.isDebugEnabled) {
        // console.log('Debug is enabled, turn off animation for dev speed')
        setTimeout(() => {
          commit('setPageReadyToShow', isPageReadyToShow)
        }, 200) // hot fix 200 ms for a reason on stuck Oo
        return
      }

      // console.log(delay, state.timeInitApp, now - state.timeInitApp)
      if (delay < state.timeMinLoading) {
        // console.log('will be closed in', state.timeMinLoading - delay)
        setTimeout(() => {
          // console.log('setPageReadyToShow: ', isPageReadyToShow)
          commit('setPageReadyToShow', isPageReadyToShow)
        }, state.timeMinLoading - delay)
      } else {
        // console.log('close')
        setTimeout(() => {
          commit('setPageReadyToShow', isPageReadyToShow)
        }, 200) // hot fix 200 ms for a reason on stuck Oo
      }

      return
    }

    // console.log('setPageReadyToShow: ', isPageReadyToShow)
    commit('setPageReadyToShow', isPageReadyToShow)
  },
}

export const getters = {
  isMainLoadingAnimated(state) {
    // main getter to manage main loading animation
    return !state.isPageReadyToShow || state.isMainLoadingAnimated
  },
  isBurgerNavigationVisible(state, getters) {
    if (getters.isIndexPage) {
      return !getters.pageHasSliderAnimation
    }
    return state.windowWidth < 1024
  },
  isOrientationPortrait(state) {
    return _.get(state, 'deviceConfig.orientation') === 'portrait'
  },
  isOrientationLandscape(state) {
    return _.get(state, 'deviceConfig.orientation') === 'landscape'
  },
  pageHasSliderAnimation(state, getters) {
    // https://tailwindcss.com/docs/responsive-design
    // sm	640px	@media (min-width: 640px) { ... }
    // md	768px	@media (min-width: 768px) { ...  }
    // lg	1024px	@media (min-width: 1024px) { ... }
    // xl	1280px	@media (min-width: 1280px) { ... }
    // 2xl	1536px	@media (min-width: 1536px) { ... }

    const isLandscapeTablet = getters.isTablet && getters.isOrientationLandscape
    const isDesktopWidth =
      getters.isDesktop && state.windowWidth && state.windowWidth >= 1024

    return getters.isIndexPage && (isLandscapeTablet || isDesktopWidth)
  },
  isHeaderWhite(state, getters) {
    if (getters.isIndexPage) {
      const shouldBeWhiteWhenHasSlider =
        getters.wasHeaderScrolled &&
        !(getters.pageHasSliderAnimation && state.slidePageNumber < 2)

      return getters.isBurgerMenuOpened || shouldBeWhiteWhenHasSlider
    }

    return true
  },
  wasHeaderScrolled: (state) => state.scrollTop > 10,
  // router getters
  isIndexPage(state) {
    return state.routeName?.includes('index___')
  },
  // i18n getters
  isLangNL(state) {
    return state.localesData.currentLocalCode?.toLowerCase() === 'nl'
  },
  // use same getters and store for simplification
  isPageReadyToShow: (state) => state.isPageReadyToShow,
  isDebugEnabled: (state) => state.isDebugEnabled,
  deviceConfig: (state) => state.deviceConfig,
  isBurgerMenuOpened: (state) => state.isBurgerMenuOpened,
  windowWidth: (state) => state.windowWidth,
  windowHeight: (state) => state.windowHeight,
  isLanguageSwitchEnabled: (state) => state.isLanguageSwitchEnabled,
  fallbackLocalCode: (state) => state.localesData.fallbackLocalCode,
  currentLocalCode: (state) => state.localesData.currentLocalCode,
  // device getters
  isTablet: (state) => _.get(state, 'deviceConfig.$device.isTablet'),
  isDesktop: (state) => _.get(state, 'deviceConfig.$device.isDesktop'),
  isMobile: (state) => _.get(state, 'deviceConfig.$device.isMobile'),
  isMobileOrTablet: (state) =>
    _.get(state, 'deviceConfig.$device.isMobileOrTablet'),
}
