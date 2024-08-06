<template>
  <div>
    <vt-overlay
      :open="showOverlay"
      v-bind="overlayOption"
      @click="closePopover"
    />
    <vt-tooltip
      ref="tooltip"
      v-bind="$attrs"
      :trigger="trigger"
      :hide-on-click="hideOnClick"
      :placement="placement"
      :fallback-placements="[]"
      :append-to="appendTo"
      interactive
      theme="popover"
      @on-mount="onMount"
      @on-hide="onHide"
      @on-click-outside="onClickOutside"
    >
      <slot />
      <template #content>
        <div v-if="$slots.header" ref="popover-header" class="popover-header">
          <slot name="header" />
        </div>
        <div
          class="popover-content"
          :style="{
            'max-height': maxHeight,
          }"
        >
          <slot name="content" />
        </div>
      </template>
    </vt-tooltip>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('store')
export default {
  name: 'Popover',

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    trigger: {
      type: String,
      default: 'click', // focus if hideOnClick 'false' || 'toggle' when focus is lost, the element closes
    },
    hideOnClick: {
      type: [String, Boolean],
      default: 'toggle',
    },
    placement: {
      type: String,
      default: 'bottom-start',
    },
    modal: {
      type: Boolean,
      default: false,
    },

    // Overlay
    overlayOption: {
      type: Object,
      default: () => ({}),
    },

    isCloseByOverlay: {
      type: Boolean,
      default: true,
    },

    // eslint-disable-next-line vue/require-prop-types
    appendTo: {
      default: 'app-popover-holder',
    },

    fixedMaxHeight: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    maxHeight: 'none',
    isOpenedPopover: false,
  }),

  computed: {
    ...mapGetters(['windowHeight']),
    showOverlay() {
      return this.modal && this.isOpenedPopover
    },
  },

  watch: {
    value: 'handlePopover',
  },
  created() {
    this.maxHeight = this.fixedMaxHeight
  },
  methods: {
    onClickOutside() {
      this.$emit('on-click-outside')
    },
    closePopover() {
      if (this.isCloseByOverlay) {
        this.$refs.tooltip.closeTooltip()
      }
    },
    handlePopover() {
      if (this.value) {
        this.$refs.tooltip.openTooltip()
      } else {
        this.$refs.tooltip.closeTooltip()
      }
    },
    onHide() {
      this.isOpenedPopover = false
      this.$emit('input', false)
      this.$emit('on-hide')
    },

    onMount() {
      this.isOpenedPopover = true
      this.$emit('input', true)
      if (this.fixedMaxHeight) {
        this.$emit('on-mount')
        return
      }
      let headerHeight = 0

      if (this.$slots.header) {
        headerHeight = this.$refs['popover-header'].offsetHeight
      }
      this.maxHeight = `${this.windowHeight - headerHeight - 5}px`
      this.$emit('on-mount')
    },
  },
}
</script>

<style lang="scss">
.tippy-box[data-theme='popover'] {
  .tippy-arrow {
    &:before {
      @apply transition-[border-color] duration-300 ease-in-out;
    }
  }

  .tippy-content {
    padding: 0;
    // color: var(--vichit-purple-dark);
  }
}

.popover-header {
  padding: 5px 9px;
  border-bottom: 1px solid var(--black);
}

.popover-content {
  overflow-y: auto;
}
</style>
