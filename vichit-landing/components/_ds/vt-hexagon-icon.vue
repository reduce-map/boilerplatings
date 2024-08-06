<template>
  <div
    class="hexagon-icon"
    :style="{
      '--hexagon-icon-size': size,
      '--hexagon-svg-color': svgColor,
    }"
  >
    <div
      class="svg-hexagon-background"
      v-html="require(`~/assets/icons/hexagonal/hexagonal-svgrepo-com.svg?raw`)"
    />
    <div
      class="svg-hexagon-center"
      v-html="require(`~/assets/icons/hexagonal/hexagonal-svgrepo-com.svg?raw`)"
    />
    <div class="icon-svg" v-html="icon" />
  </div>
</template>

<script>
export default {
  name: 'VtHexagonIcon',
  props: {
    size: {
      type: String,
      default: '40px',
    },
    svgColor: {
      type: String,
      default: '',
    },
    iconName: {
      type: String,
      default: 'react',
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
  .icon-svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    svg {
      width: calc(var(--hexagon-icon-size) / 2);
      height: calc(var(--hexagon-icon-size) / 2);
    }
  }

  .svg-hexagon-background {
    svg {
      height: var(--hexagon-icon-size);
      width: var(--hexagon-icon-size);
      fill: var(--hexagon-svg-color-main, var(--hexagon-svg-color));
    }
  }

  .svg-hexagon-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    svg {
      width: calc(var(--hexagon-icon-size) / 1.1);
      height: calc(var(--hexagon-icon-size) / 1.1);
      fill: transparent;
      transition: width 0.3s, height 0.3s;
    }
  }
}

.hexagon-icon {
  position: relative;
  height: var(--hexagon-icon-size);
  width: var(--hexagon-icon-size);

  &:hover {
    ::v-deep {
      .svg-hexagon-center {
        svg {
          width: calc(var(--hexagon-icon-size) / 1.05);
          height: calc(var(--hexagon-icon-size) / 1.05);
          fill: var(--hexagon-svg-color-main, var(--hexagon-svg-color));
        }
      }
    }
  }
}
</style>
