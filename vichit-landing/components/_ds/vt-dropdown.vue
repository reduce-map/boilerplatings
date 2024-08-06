<template>
  <vt-popover
    v-model="open"
    trigger="focusin"
    wrapper-tag="div"
    content-tag="div"
    anchor-tag="div"
    fixed-max-height="200px"
    placement="bottom"
    max-width="none"
    :allow-show-tooltip="allowShowTooltip"
    :offset="[0, -24]"
    :follow-cursor="false"
    :arrow="false"
    :width-content="widthContent"
    @input="focusWithin"
    @keydown.native="keyDown"
    @on-click-outside="open = false"
  >
    <vt-text-field
      ref="input"
      :value="search"
      :label-text="labelText"
      :required="required"
      :error-message="errorMessage"
      :show-error-message="showErrorMessage"
      @init="onInit"
      @input="setSearch"
      @blur="onBlur"
    />
    <template #content>
      <ul ref="list" class="dropdown__option-list">
        <li
          v-for="(item, index) in filteredItems"
          :key="item.name"
          ref="options"
          class="dropdown__option"
          :class="{
            'dropdown__option--active': activeIndex === index,
          }"
          @click="setValue(item)"
        >
          <span v-html="setMatch(item.name)"></span>
        </li>
      </ul>
    </template>
  </vt-popover>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    hasInit: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      required: true,
    },
    labelText: {
      type: String,
      default: '',
    },

    errorMessage: {
      type: String,
      default: '',
    },

    showErrorMessage: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    open: false,
    widthContent: undefined,
    search: '',
    allowShowTooltip: false,
    activeIndex: 0,
    timer: 0,
  }),

  computed: {
    filteredItems() {
      return this.items.filter(({ name }) =>
        name.match(new RegExp(this.search, 'ig'))
      )
    },

    lastIndexFilteredItems() {
      return this.filteredItems.length - 1
    },
  },

  watch: {
    hasInit() {
      this.init()
    },
  },

  async mounted() {
    if (this.hasInit) {
      await this.init()
    }
  },

  beforeDestroy() {
    clearTimeout(this.timer)
  },

  methods: {
    focusWithin(value) {
      if (!value) {
        this.activeIndex = 0
      }
    },
    keyDown(event) {
      if (event.key === 'Down' || event.key === 'ArrowDown') {
        this.activeIndex =
          this.activeIndex + 1 <= this.lastIndexFilteredItems
            ? this.activeIndex + 1
            : this.activeIndex
        this.scrollTo()
        return
      }
      if (event.key === 'Up' || event.key === 'ArrowUp') {
        this.activeIndex = this.activeIndex =
          this.activeIndex - 1 >= 0 ? this.activeIndex - 1 : this.activeIndex
        this.scrollTo()
        return
      }

      if (event.key === 'Enter') {
        this.setInnerValue()
      }
    },
    onBlur() {
      this.$emit('blur')
    },
    setInnerValue() {
      const el = this.$refs.options[this.activeIndex]
      el?.click()
    },
    scrollTo() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const el = this.$refs.list.getElementsByClassName(
          'dropdown__option--active'
        )?.[0]

        this.$refs.list.parentElement.scrollTo({
          top: el?.offsetTop,
          behavior: 'smooth',
        })
      }, 100)
    },
    async setSearch(search) {
      if (search.includes('/') || search.includes('\\')) {
        return
      }
      this.search = search
      if (!this.search) {
        this.allowShowTooltip = false
        this.open = false
        this.$emit('input', '')
      } else {
        this.allowShowTooltip = true
        await this.$nextTick()
        this.open = true
        if (this.activeIndex > this.lastIndexFilteredItems) {
          this.activeIndex = this.lastIndexFilteredItems
        }
      }
    },
    setValue(item) {
      this.open = false
      this.search = item.name
      this.$emit('input', item.name)
    },
    setMatch(name) {
      return name.replace(new RegExp(this.search, 'gi'), (match) => {
        return `<span class="font-bold">${match}</span>`
      })
    },
    onInit() {
      this.widthContent = `${this.$refs.input.$el.offsetWidth}px`
    },
    async init() {
      await this.$nextTick()
      this.$refs.input.init()
      this.$emit('init')
    },
  },
}
</script>

<style lang="scss" scoped>
.dropdown__option {
  @apply py-2 px-4 cursor-pointer rounded;

  &:hover {
    background-color: rgba(var(--vichit-blue-marguerite-rgb), 0.2);
  }

  &--active {
    background-color: rgba(var(--vichit-blue-marguerite-rgb), 0.2);
  }
}
</style>
