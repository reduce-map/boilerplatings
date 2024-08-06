<template>
  <div
    class="relative"
    :style="{
      '--hexagon-icon-size': size,
      '--hexagon-svg-color': svgColor,
    }"
  >
    <div
      v-if="left"
      class="svg-rect -mr-px"
      v-html="
        require(`~/assets/icons/hexagonal/hexagonal-svgrepo-left-com.svg?raw`)
      "
    />
    <div
      v-else
      class="svg-rect -ml-px"
      v-html="
        require(`~/assets/icons/hexagonal/hexagonal-svgrepo-right-com.svg?raw`)
      "
    />
  </div>
</template>

<script>
export default {
  name: 'TimelineItemRectangle',
  props: {
    svgColor: {
      type: String,
      default: 'transparent',
    },
    size: {
      type: String,
      default: '40px',
    },
    left: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .svg-rect {
    height: 100%;
    svg {
      height: 100%;
      width: auto;
      fill: var(--hexagon-svg-color-main, var(--hexagon-svg-color));

      path {
        width: 100% !important;
        height: 100% !important;
      }
    }
  }
}
</style>
