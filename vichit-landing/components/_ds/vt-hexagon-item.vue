<template>
  <div
    :class="[
      'hexagon-card transition-all',
      {
        'hexagon-card--hover': hasHover,
      },
    ]"
    :style="cssProperties"
  >
    <div
      class="background-image text-base"
      @mouseover="hasHover = true"
      @mouseleave="hasHover = false"
    >
      <div class="img-container">
        <slot name="background-image" />
      </div>
      <div v-if="$slots.title && $slots.paragraph" class="content">
        <div class="text-content">
          <div class="title p-1">
            <slot name="title" />
          </div>
          <div class="paragraph p-1">
            <slot name="paragraph" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VtHexagonItem',
  props: {
    size: {
      type: String,
      default: '300px',
    },

    margin: {
      type: String,
      default: '4px',
    },

    transitionDuration: {
      type: String,
      default: '.3s',
    },
  },

  data: () => ({
    hasHover: false,
  }),

  computed: {
    cssProperties() {
      return {
        '--size-card': this.size,
        '--margin-card': this.margin,
        '--transition-duration': this.transitionDuration,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.hexagon-card {
  --size: var(--size-grid, var(--size-card));
  --margin: var(--margin-grid, var(--margin-card));

  filter: drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5));
  display: inline-block;
  transition: filter var(--transition-duration);
  width: var(--size);
  height: calc(var(--size) * 1.1547);
  margin: var(--margin);
  margin-bottom: calc(var(--margin) - var(--size) * 0.2885);
  // this line fixes 'filter: drop-shadow' on safari
  will-change: filter;

  &--hover {
    filter: drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.8));
  }
}
.background-image {
  position: relative;
  width: 100%;
  height: 100%;
  clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);

  .img-container {
    &,
    & > * {
      position: absolute;
      top: 0;
      left: 0;
      width: inherit;
      height: inherit;
      object-fit: cover;
      clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
    }
  }

  &:hover {
    .text-content {
      opacity: 1;
      backdrop-filter: blur(4px);
    }
    .paragraph,
    .title {
      transform: translateY(0);
    }
  }
}

.content {
  position: absolute;
  width: inherit;
  height: inherit;
}

.text-content {
  width: inherit;
  height: inherit;
  display: grid;
  place-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 1fr);
  opacity: 0;
  transition: all var(--transition-duration);
  backdrop-filter: blur(0);

  .title {
    grid-row-start: 3;
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
    transform: translateY(calc(-1 * var(--size)));
    transition: transform calc(var(--transition-duration) * 2);
  }

  .paragraph {
    grid-row-start: 4;
    font-size: 1em;
    font-weight: bold;
    text-align: center;
    transform: translateY(var(--size));
    transition: transform calc(var(--transition-duration) * 2);
  }
}
</style>
