<template>
  <vt-popover
    :value="openPopover"
    :trigger="trigger"
    @on-mount="$emit('on-mount')"
    @on-hide="$emit('on-hide')"
    @on-click-outside="onClickOutside"
  >
    <div
      ref="list-popover"
      :data-menuanchor="option.link"
      class="navigation-wrapper"
      @click="$emit('set-active')"
    >
      <a
        v-if="renderEmptyAnchor && trigger === 'manual'"
        href="javascript:void(0);"
        class="nav-link"
        @click.stop="changeHolder"
      >
        {{ $t(option.name) }}
      </a>
      <nuxt-link
        v-else
        class="nav-link"
        :to="localePath(option.link)"
        exact
        @click.native.stop="changeHolder"
      >
        {{ $t(option.name) }}
      </nuxt-link>
    </div>
    <template #content>
      <ul class="sub-navigation">
        <li v-for="navChild in option.children" :key="navChild.name">
          <nuxt-link
            :to="localePath(navChild.link)"
            class="nav-sub-link"
            exact
            @click.stop
          >
            <span class="prefix"> / </span>
            {{ $t(navChild.name) }}
          </nuxt-link>
        </li>
      </ul>
    </template>
  </vt-popover>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      required: true,
    },

    trigger: {
      type: String,
      default: 'mouseenter',
    },
  },

  data: () => ({
    renderEmptyAnchor: true,
    openPopover: false,
  }),

  mounted() {
    this.$emit('init', this.$refs['list-popover'])
  },

  methods: {
    changeHolder() {
      const isOpen = this.renderEmptyAnchor
      this.renderEmptyAnchor = !this.renderEmptyAnchor
      if (this.trigger === 'manual') {
        this.openPopover = isOpen
      }
    },

    onClickOutside() {
      this.changeHolder()
    },
  },
}
</script>

<style lang="scss" scoped>
.navigation-wrapper {
  @apply relative inline-flex items-center h-9 rounded z-[2];
}
</style>
