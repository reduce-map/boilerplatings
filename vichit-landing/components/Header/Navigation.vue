<template>
  <nav
    :class="{
      'header-white': !isWhite,
    }"
    class="main-navigation"
    @mouseleave="mouseleave"
  >
    <ul
      :class="{
        'text-white': isWhite,
      }"
      class="navigation-list"
    >
      <li
        v-for="nav in navigation"
        :key="`desktop-${nav.link}`"
        class="navigation-item"
        @mouseleave="mouseleaveElement"
      >
        <link-popover
          v-if="nav.children && isDesktop"
          :trigger="isDesktop ? undefined : 'manual'"
          :option="nav"
          @set-active="setActive"
          @mouseover.native="onMouseover"
          @on-mount="onMountPopover"
          @on-hide="onHidePopover"
          @init="onInitPopover"
        />
        <div
          v-else
          ref="list"
          :data-menuanchor="nav.link"
          class="navigation-wrapper"
          @click="setActive()"
          @mouseover="onMouseover"
        >
          <nuxt-link
            class="nav-link"
            :to="localePath(nav.link)"
            exact
            @click.stop
          >
            {{ $t(nav.name) }}
          </nuxt-link>
        </div>
      </li>

      <li
        class="bg-navigation"
        :style="{
          'transition-duration': `${transitionDuration}s`,
          'transition-property': transitionProperty,
          left: `${offsetLeft}px`,
          opacity: `${opacity}`,
          width: `${clientWidth}px`,
        }"
      />
      <li
        class="bg-active-border"
        :style="{
          left: `${activeOffsetLeft}px`,
          'transition-duration': `${activeTransitionDuration}s`,
          opacity: `${activeOpacity}`,
          width: `${activeClientWidth}px`,
        }"
      />
    </ul>
  </nav>
</template>

<script>
import _ from 'lodash'
import { createNamespacedHelpers } from 'vuex'
import LinkPopover from './LinkPopover.vue'
const { mapGetters, mapState } = createNamespacedHelpers('store')

const DURATION = 0.33
const TIME_DEBOUNCE = DURATION * 100 + 100

const delay = (
  (debounce = 0) =>
  (fn) => {
    clearTimeout(debounce)
    debounce = setTimeout(fn, TIME_DEBOUNCE)
  }
)()

export default {
  name: 'DesktopNavigation',
  components: { LinkPopover },
  props: {
    navigation: {
      type: Array,
      required: true,
    },
    isWhite: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    offsetLeft: 0,
    transitionDuration: 0,
    opacity: 0,
    transitionProperty: 'opacity',
    activeOffsetLeft: 0,
    activeTransitionDuration: 0,
    activeOpacity: 0,
    clientWidth: 0,
    activeClientWidth: 0,
    shouldHideHover: true,
    closingPopover: false,
    amountHoveredElements: 0,
    amountPopoverOpened: 0,
    popovers: [],
    amountPopovers: 0,
    loaded: false,
  }),
  computed: {
    ...mapGetters(['isDesktop']),
    ...mapState(['isPageReadyToShow']),
    currentKey() {
      return this.$route?.name?.split?.('_')?.[0]
    },
  },
  watch: {
    currentKey: {
      handler: 'setActive',
    },
    closingPopover: 'closingPopoverHandler',
    isPageReadyToShow: 'init',
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.isPageReadyToShow && !this.loaded) {
        this.loaded = true
        this.setActive()
      }
    },
    onInitPopover(list) {
      this.popovers.push(list)
    },
    closingPopoverHandler: _.debounce(function () {
      if (
        !this.closingPopover ||
        this.amountHoveredElements > 0 ||
        this.amountPopoverOpened > 0
      )
        return
      this.mouseleaveHandler()
    }, 300),

    mouseleaveElement() {
      this.amountHoveredElements -= 1
    },

    onMountPopover() {
      this.amountPopoverOpened += 1
      this.shouldHideHover = false
      this.closingPopover = false
    },

    onHidePopover() {
      this.amountPopoverOpened -= 1
      this.shouldHideHover = true
      this.closingPopover = true
    },

    formattedAnchors() {
      const list = this.$refs.list ?? []
      const popovers = this.popovers.filter((v) => v)
      const anchors = list.concat(popovers)

      return (
        anchors.reduce(
          (acc, cur) => ({
            ...acc,
            [cur.getAttribute('data-menuanchor')]: cur,
          }),
          {}
        ) ?? {}
      )
    },
    setActive() {
      const list = this.formattedAnchors()
      const element = list[this.currentKey]
      if (!element) return (this.activeOpacity = 0)
      this.clientWidth = element.clientWidth
      this.activeOffsetLeft = element.offsetLeft
      this.activeClientWidth = element.clientWidth
      this.activeOpacity = 1
      delay(() => {
        this.activeTransitionDuration = DURATION
      })
    },

    mouseleave: _.debounce(function () {
      if (!this.shouldHideHover || this.amountPopoverOpened > 0) return
      this.mouseleaveHandler()
    }, 300),

    mouseleaveHandler() {
      this.opacity = 0

      delay(() => {
        this.transitionDuration = 0
        this.transitionProperty = 'opacity'
      })
    },

    onMouseover({ target }) {
      this.amountHoveredElements += 1
      if (this.closingPopover) {
        this.closingPopover = false
      }
      const li = target.localName === 'li' ? target : target.parentNode

      this.transitionDuration = DURATION
      this.offsetLeft = li.offsetLeft
      this.clientWidth = li.clientWidth
      this.opacity = 1
      delay(() => {
        this.transitionProperty = 'left, opacity, width'
      })
    },
  },
}
</script>

<style lang="scss">
.nav-link {
  display: inline-block;
  height: 36px;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: 500;
  text-transform: uppercase;
  &:active,
  &:focus {
    background: rgba(var(--vichit-bg-crystal-cut-rgb), 0.2);
  }
}

.main-navigation {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  z-index: 2;

  a:hover {
    text-decoration: none;
  }

  .navigation-list {
    display: flex;
    @apply mr-4 overflow-hidden;
  }
  .navigation-item {
    cursor: pointer;
    margin-left: 1rem;
  }
  .bg-navigation {
    position: absolute;
    border-radius: 0.25rem;
    height: 36px;
    z-index: 1;
    top: 50%;
    left: 0;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(-50%);
    background: rgba(var(--vichit-bg-crystal-cut-rgb), 0.2);
  }
  .bg-active-border {
    content: none;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 6px;
    border-radius: 0.5rem;
    background: rgba(var(--vichit-purple-rgb), 0.8);
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  &.header-white {
    .nav-link {
      user-select: none;

      //&:focus-visible {
      //  background: rgba(var(--vichit-purple-rgb), 0.2);
      //}
    }
    .bg-navigation {
      background: rgba(var(--vichit-purple-rgb), 0.2);
    }
    .bg-active-border {
      background: rgba(var(--vichit-purple-rgb), 0.8);
    }
  }
}

.nav-link {
  display: inline-block;
  height: 36px;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: 500;
  text-transform: uppercase;
  &:active,
  &:focus {
    background: rgba(var(--vichit-bg-crystal-cut-rgb), 0.2);
  }
}

.nav-sub-link {
  display: block;
  height: 36px;
  @apply font-semibold p-2 pr-4 duration-300 ease-in-out;
  text-transform: uppercase;
  color: var(--vichit-purple-dark);

  &:hover {
    text-decoration: none;
  }

  .prefix {
    @apply transition-all duration-300 ease-in-out font-semibold px-1;
    visibility: hidden;
    opacity: 0;
    color: var(--vichit-purple);
  }

  &:hover {
    background: var(--velvet-pink);
    @apply pr-3;

    .prefix {
      @apply pr-2;
      visibility: visible;
      opacity: 1;
    }
  }
}

.sub-navigation {
  overflow: hidden;

  li:first-child .nav-sub-link {
    border-radius: 4px 4px 0 0;
  }

  li:last-child .nav-sub-link {
    border-radius: 0 0 4px 4px;
  }
}
.navigation-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 36px;
  border-radius: 0.25rem;
  z-index: 2;
}
</style>
