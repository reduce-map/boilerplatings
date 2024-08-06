<script>
import VtLink from '@/components/SiteMap/vt-link.vue'
function createLi({ path, text }, h, level) {
  const self = this

  return h(VtLink, {
    props: {
      text: self.$t(text),
      path,
    },
    style: {
      'margin-left': `${level}rem`,
    },
  })
}

function createTree(list, h, level) {
  const self = this

  const children = list
    .map((config) => {
      let ul = null
      const li = createLi.call(self, config, h, level)
      if (config.children?.length) {
        ul = createTree.call(self, config.children, h, level + 1)
      }

      return [li, ul].filter((v) => v)
    })
    .flat()

  return h('ul', children)
}
export default {
  name: 'VtLinkTree',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  render(h) {
    return createTree.call(this, this.list, h, 0)
  },
}
</script>
