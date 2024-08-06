<script>
const HEADING_CLASSES = {
  1: 'header-1',
  2: 'header-2',
  3: 'header-3',
}
export default {
  props: {
    level: {
      type: [Number, String],
      required: true,
    },

    classContent: {
      type: String,
      default: '',
    },
  },
  render(createElement) {
    return createElement(
      'h' + this.level,
      {
        class: `${HEADING_CLASSES[this.level]} ${this.classContent}`,
      },
      this.$slots.default
    )
  },
}
</script>

<style scoped lang="scss">
.header-1 {
  @apply text-4xl sm:text-4xl lg:text-4xl font-bold;
}
.header-2 {
  @apply text-3xl sm:text-3xl lg:text-3xl font-bold;
}
.header-3 {
  @apply text-2xl sm:text-2xl lg:text-2xl font-bold;
}
</style>
