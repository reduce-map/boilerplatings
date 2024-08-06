<template>
  <component
    :is="wrapperTag"
    class="tippy vt-tooltip"
    :class="{
      'opacity-0': hideContent,
    }"
  >
    <component :is="anchorTag" ref="anchor">
      <slot />
    </component>
    <component
      :is="contentTag"
      ref="content"
      :class="{
        'opacity-0': hideContent,
      }"
      :style="{
        width: widthContent,
        height: heightContent,
      }"
    >
      <slot name="content" />
    </component>
  </component>
</template>

<script>
import tippy, { inlinePositioning, followCursor } from 'tippy.js'
import { hideOnEsc, modifiers, getAppendTo } from '@/utils/tippy'

export default {
  name: 'Tooltip',
  props: {
    hideOnEsc: {
      type: Boolean,
      default: true,
    },
    interactive: {
      type: Boolean,
      default: true,
    },

    trigger: {
      type: String,
      default: 'mouseenter focus',
    },
    theme: {
      type: String,
      default: 'tooltip',
    },
    fallbackPlacements: {
      type: Array,
      default: () => ['bottom', 'right'],
    },
    placement: {
      type: String,
      default: 'top',
    },
    // eslint-disable-next-line vue/require-prop-types
    appendTo: {
      default: 'app-tooltip-holder',
    },

    hideOnClick: {
      type: [String, Boolean],
      default: true,
    },

    maxWidth: {
      type: [String, Number],
      default: 350,
    },

    widthContent: {
      type: String,
      default: null,
    },

    heightContent: {
      type: String,
      default: null,
    },
    inlinePositioning: {
      type: Boolean,
      default: true,
    },
    wrapperTag: {
      type: String,
      default: 'span',
    },
    contentTag: {
      type: String,
      default: 'span',
    },
    anchorTag: {
      type: String,
      default: 'span',
    },
    offset: {
      type: Array,
      default: () => [0, 10],
    },
    followCursor: {
      type: [Boolean, String],
      default: 'horizontal',
    },
    arrow: {
      type: [Boolean, String],
      default: true,
    },
    allowShowTooltip: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    tip: null,
    hideContent: true,
  }),

  mounted() {
    this.initTippy()
  },

  beforeDestroy() {
    if (this.tip) {
      this.tip.destroy()
    }
  },
  methods: {
    openTooltip() {
      this.tip?.show()
    },

    closeTooltip() {
      this.tip?.hide()
    },

    getAnchor() {
      const anchor = this.$refs.anchor.firstChild
      return anchor
    },

    initTippy() {
      this.tip = tippy(this.getAnchor(), {
        ...this.tippyOption(),
        ...this.tippyPluginsAndModifiers(),
        ...this.tippyCallbacks(),
      })
      this.hideContent = false
    },

    tippyOption() {
      return {
        content: this.$refs.content,
        hideOnEsc: this.hideOnEsc,
        placement: this.placement,
        allowHTML: true,
        trigger: this.trigger,
        interactive: this.interactive,
        appendTo: getAppendTo(this.appendTo),
        theme: this.theme,
        hideOnClick: this.hideOnClick,
        maxWidth: this.maxWidth,
        inlinePositioning: this.inlinePositioning,
        followCursor: this.followCursor,
        offset: this.offset,
        arrow: this.arrow,
      }
    },

    tippyCallbacks() {
      return {
        onMount: () => {
          this.$emit('on-mount')
        },
        onShow: () => {
          return this.allowShowTooltip
        },
        onHide: () => {
          this.$emit('on-hide')
        },
        onClickOutside: () => {
          this.$emit('on-click-outside')
        },
      }
    },

    tippyPluginsAndModifiers() {
      return {
        popperOptions: {
          // If your reference element is in a fixed container, use the fixed strategy:
          // strategy: 'fixed',
          modifiers: modifiers({
            flipOption: { fallbackPlacements: this.fallbackPlacements },
          }),
        },
        plugins: [hideOnEsc, inlinePositioning, followCursor],
      }
    },
  },
}
</script>

<style lang="scss">
.tippy-arrow {
  color: var(--vichit-purple-dark) !important;
}
.tippy-box {
  background-color: var(--vichit-purple-dark) !important;
  color: var(--white);
}
.tippy-box[data-theme='tooltip'] {
  .tippy-content {
    color: var(--white);
  }
}
</style>
