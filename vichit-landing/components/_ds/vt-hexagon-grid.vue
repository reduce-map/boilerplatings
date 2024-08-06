<template>
  <div
    class="hexagon-grid"
    :class="{
      'hexagon-grid-one-line': oneLine,
    }"
    :style="cssVariables"
  >
    <div class="hexagon-grid__container">
      <!-- Fix bug after nuxt generate -->
      <div
        class="shape-outside"
        :style="{
          'shape-outside': `repeating-linear-gradient(
        #0000 0 calc(var(--shape) - 3px),
        #000 0 var(--shape)
      )`,
        }"
      ></div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VtHexagonGrid',
  props: {
    elementSize: {
      type: String,
      default: '150px',
    },
    margin: {
      type: String,
      default: '4px',
    },
    oneLine: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    // odd 'repeating-linear-gradient( #000 0 3px, #0000 0 calc(var(--shape)) )'
    cssVariables() {
      return {
        '--max-size-grid': this.elementSize,
        '--margin-grid': this.margin,
        '--shape':
          'calc(var(--size-grid) * 1.732 + 4 * var(--margin-grid) - 1px)',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.hexagon-grid {
  --size-grid: 70px;
  --padding-bottom: 90px;

  display: flex;

  @media (min-width: 440px) {
    --size-grid: 80px;
    --padding-bottom: 110px;
  }
  @media (min-width: 600px) {
    --size-grid: 100px;
    --padding-bottom: 130px;
  }
  @media (min-width: 940px) {
    --size-grid: 120px;
  }
  @media (min-width: 1200px) {
    --size-grid: var(--max-size-grid);
  }
  // prevent overflow
  padding-bottom: var(--padding-bottom);

  &__container {
    font-size: 0; /* disable white space between inline block element */
    // This block is used for inline shape outside
    .shape-outside {
      width: calc(var(--size-grid) / 2 + var(--margin-grid));
      float: left;
      height: 120%;
    }
  }
}

.hexagon-grid-one-line {
  display: block;
  text-align: center;

  .hexagon-grid__container {
    white-space: nowrap;
  }
}
</style>
