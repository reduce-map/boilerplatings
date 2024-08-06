<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'li',
    },
    path: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },

  render(h) {
    const self = this
    return h(
      this.tag,
      {
        class: 'link-tree',
      },
      [
        h(
          'nuxt-link',
          {
            class: 'link-tree__link',
            props: {
              to: self.localePath(this.path),
            },
          },
          [this.text]
        ),
      ]
    )
  },
}
</script>

<style lang="scss" scoped>
.link-tree {
  @apply relative cursor-pointer;

  &:after {
    content: '•';
    color: var(--vichit-blue);
    @apply absolute -left-2 top-1/2 -translate-y-1/2 text-xs;
  }

  &:before {
    content: '/';
    @apply absolute left-2 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-300;
  }

  &:hover {
    color: var(--vichit-blue);
    > .link-tree__link {
      @apply ml-2.5 transition-all duration-300;
    }

    &:after {
      @apply delay-100 opacity-100;
      color: var(--vichit-blue);
    }
    &:before {
      color: var(--velvet-violet);
      @apply opacity-100;
    }
  }

  .link-tree__link {
    @apply uppercase p-2 transition-all duration-300;
  }
}
</style>
