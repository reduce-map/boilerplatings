<template>
  <div class="tabs">
    <div class="tabs__header-wrapper">
      <button
        v-for="(item, i) in items"
        :key="item.title"
        type="button"
        tabindex="0"
        class="tabs__header"
        :class="{
          'tabs__header--active': active === i,
        }"
        @click="changeTab(i)"
      >
        {{ item.title }}
      </button>
    </div>
    <div
      class="tabs__content-wrapper"
      :style="{
        height: height,
      }"
    >
      <transition-group
        tag="div"
        enter-active-class="animate__animated animate__fadeInDown"
        leave-active-class="animate__animated animate__fadeOutDown"
        mode="out-in"
        appear
      >
        <div
          v-for="(item, i) in items"
          v-show="active === i"
          ref="contents"
          :key="`tab-content-${item.title}`"
          class="tabs__content"
          :class="{
            'tabs__content--hidden': active !== i,
          }"
        >
          <slot :item="item" />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('store')
export default {
  name: 'VtTabsTechnologyStack',
  props: {
    activeTab: {
      type: Number,
      default: 0,
    },

    // [{ title: 'Title' }]
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      active: this.activeTab,
      height: 0,
      loaded: false,
    }
  },

  computed: {
    ...mapState(['isPageReadyToShow']),
  },

  watch: {
    async isPageReadyToShow() {
      await this.init()
    },
  },

  async mounted() {
    await this.init()
  },

  methods: {
    async init() {
      if (this.isPageReadyToShow && !this.loaded) {
        await this.$nextTick()
        this.changeTab(this.active)
        this.loaded = true
      }
    },
    async changeTab(index) {
      this.active = index
      await this.$nextTick()
      this.height = `${this.$refs.contents[index].offsetHeight}px`
    },
  },
}
</script>

<style lang="scss" scoped>
.tabs {
  .tabs__header-wrapper {
    @apply flex w-full justify-between;
  }
  .tabs__header {
    outline: none !important;
    @apply border-gray-300;
    @apply flex-1 flex justify-center pb-4 border-b cursor-pointer text-center font-semibold uppercase;

    &--active {
      color: var(--vichit-purple);
      border-bottom-color: var(--vichit-purple);
    }
  }

  .tabs__content-wrapper {
    border-bottom-color: var(--vichit-purple);
    @apply relative overflow-hidden transition-all duration-700 border-b;
  }

  .tabs__content {
    @apply w-full pb-8 pt-16;

    &--hidden {
      @apply absolute top-0 left-0;
    }
  }

  // prettier-ignore
  @supports not selector(.tabs__header:focus-visible) {
  .tabs__header {
     color: var(--vichit-purple);
  }
}

  @supports selector(.tabs__header:focus-visible) {
    .tabs__header:focus-visible {
      color: var(--vichit-purple);
    }
  }
}
</style>
