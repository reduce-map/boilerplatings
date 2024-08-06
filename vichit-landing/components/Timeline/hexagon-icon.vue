<template>
  <div
    :style="{
      '--hexagon-svg-color': svgColor,
    }"
  >
    <div
      :class="[
        'svg-rect',
        {
          'rotate-90 rotate': rotate,
        },
      ]"
      v-html="
        require(`~/assets/icons/hexagonal/hexagonal-svgrepo-com2.svg?raw`)
      "
    />
    <div
      :class="[
        'svg-rect-icon',
        {
          '-rotate-90 rotate': rotate,
        },
      ]"
      v-html="icon"
    />
  </div>
</template>

<script>
export default {
  props: {
    svgColor: {
      type: String,
      default: '',
    },
    iconName: {
      type: String,
      default: 'react',
    },
    rotate: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    let icon = ''
    if (this.iconName) {
      icon = require(`~/assets/icons/technologies/${this.iconName}.svg?raw`)
    }
    return {
      icon,
    }
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .svg-rect-icon,
  .svg-rect {
    height: 100%;
    svg {
      height: 100%;
      width: auto;
      fill: var(--hexagon-svg-color-main, var(--hexagon-svg-color));
      filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
      path {
        width: 100% !important;
        height: 100% !important;
      }
    }

    &.rotate:not(.svg-rect-icon) {
      svg {
        filter: drop-shadow(3px -3px 2px rgba(0, 0, 0, 0.7));
      }
    }
  }
  .svg-rect-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 55%;
  }
}
</style>
