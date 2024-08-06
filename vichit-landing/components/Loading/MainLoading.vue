<template>
  <div
    class="vt-main-loading"
    :class="{
      'vt-main-loading--hide': !loading,
      'vt-main-loading--appear': animateAppear,
      'vt-main-loading--show': loaded,
    }"
  >
    <loading-background-canvas-hexagon />
    <div
      class="bg-triangle bg-triangle-left-top"
      :style="{
        'border-bottom-width': `${borderTopBottomWidth}px`,
        'border-left-width': `${borderLeftRightWidth}px`,
      }"
    />
    <div
      class="bg-triangle bg-triangle-right-bottom"
      :style="{
        'border-top-width': `${borderTopBottomWidth}px`,
        'border-right-width': `${borderLeftRightWidth}px`,
      }"
    />
    <div
      :style="{
        transform: logoTextTransform,
      }"
      class="triangle-left-top-text"
    >
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold word-wrap">
        {{ $t('VICHIT.TECH') }}
      </h1>
    </div>
    <div
      :style="{
        transform: loadingTextTransform,
      }"
      class="triangle-right-bottom-text"
    >
      <div class="triangle-right-bottom-text-holder">
        <h2 class="text-3xl font-bold">
          {{ $t('Loading') }}
        </h2>
        <div class="dot-pulse" />
      </div>
    </div>
    <central-loading-hexagon v-if="loading" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import 'three-dots/dist/three-dots.css'
const { mapGetters } = createNamespacedHelpers('store')

export default {
  name: 'MainLoading',
  components: {
    CentralLoadingHexagon: () => import('./LoadingCenterHexagon.vue'),
    LoadingBackgroundCanvasHexagon: () =>
      import('@/components/Loading/LoadingBackgroundCanvasHexagon.vue'),
  },
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    animateAppear: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loaded: false,
      loadingDuration: 1000,
    }
  },
  computed: {
    ...mapGetters(['windowWidth', 'windowHeight']),
    borderTopBottomWidth() {
      return Math.round(Number(this.windowHeight) * 0.68 || 500)
    },
    borderLeftRightWidth() {
      return Math.round(Number(this.windowWidth) * 0.68 || 500)
    },
    logoTextTransform() {
      return `translateX(${Math.round(
        this.borderLeftRightWidth / 4 - 60
      )}px) translateY(${Math.round(this.borderTopBottomWidth / 4 - 60)}px)`
    },
    loadingTextTransform() {
      return `translateX(${Math.round(
        -this.borderLeftRightWidth / 4 + 90
      )}px) translateY(${Math.round(-this.borderTopBottomWidth / 4 + 90)}px)`
    },
  },

  watch: {
    loading() {
      if (!this.loading) {
        // on loading end trigger
        // this.$emit('before-end')
        setTimeout(() => {
          this.$emit('loading-end')
        }, this.loadingDuration)
      }
    },
  },

  mounted() {
    setTimeout(() => {
      // wait to trigger css3 animation Oo
      this.loaded = true
    }, 0)
  },
}
</script>

<style lang="scss" scoped>
.vt-main-loading {
  background: var(--vichit-purple-dark);
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 9999;
  @apply transition-opacity duration-100;
}

.vt-main-loading--appear {
  opacity: 0;
  @apply transition-opacity duration-100;
}

.vt-main-loading--show {
  opacity: 1;
  @apply transition-opacity duration-1000;
}

.vt-loading-holder {
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
}

.bg-triangle {
  position: absolute;
  width: 0;
  height: 0;
  @apply transition-transform duration-300;
}

.bg-triangle-left-top {
  left: 0;
  top: 0;
  border-bottom: 560px solid transparent;
  border-left: 560px solid var(--vichit-lavender-blush);
  @apply transition-all duration-1000;
}

.bg-triangle-right-bottom {
  right: 0;
  bottom: 0;
  border-top: 560px solid transparent;
  border-right: 560px solid var(--vichit-lavender-blush);
  @apply transition-all duration-1000;
}

.vt-main-loading--hide-hexagon {
  @apply transition-opacity duration-700;
  opacity: 0;
}

.vt-main-loading--hide {
  @apply transition-opacity duration-1000;
  opacity: 0;

  .bg-triangle-left-top {
    transform: translate(-100%, -100%);
  }

  .bg-triangle-right-bottom {
    transform: translate(100%, 100%);
  }
}

.triangle-right-bottom-text,
.triangle-left-top-text {
  @apply transition-transform duration-1000;
  color: var(--vichit-purple-dark);
  transform: translateX(0);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
}

.triangle-right-bottom-text {
  bottom: 100px;
  padding-right: 30px;
  top: auto;
  left: auto;
  right: 0;
}

.triangle-right-bottom-text-holder {
  display: flex;
  align-items: baseline;
  justify-content: center;

  h2 {
    padding-right: 23px;
  }

  .dot-pulse,
  .dot-pulse::before,
  .dot-pulse::after {
    color: var(--vichit-purple-dark);
    background: var(--vichit-purple-dark);
    width: 6px;
    height: 6px;
  }
}
</style>
