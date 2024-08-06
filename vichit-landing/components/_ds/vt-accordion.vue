<template>
  <div class="p-1">
    <div class="vt-accordion app-shadow-black">
      <div
        v-for="(item, i) in localItems"
        :key="item.title"
        class="vt-accordion-item"
      >
        <button
          type="button"
          tabindex="0"
          class="vt-accordion__button"
          :class="{
            'is-active': item.isOpen && loaded,
          }"
          @click="changeTab(i)"
        >
          <span>
            {{ item.title }}
          </span>
          <span class="vt-accordion__icon-wrapper">
            <font-awesome-icon
              class="icon"
              :icon="['fas', 'long-arrow-alt-right']"
            />
          </span>
        </button>
        <div
          class="vt-accordion__content-wrapper"
          :style="{
            height: item.isOpen ? height : 0,
          }"
        >
          <transition
            tag="div"
            enter-active-class="animate__animated animate__fadeInUp"
            leave-active-class="animate__animated animate__fadeOutDown"
            mode="out-in"
          >
            <div v-show="active === i" ref="contents" class="p-4">
              <slot :item="item" />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('store')

export default {
  name: 'VtAccordion',
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
    const localItems = this.items.map((v) => ({
      ...v,
      isOpen: false,
    }))
    return {
      active: this.activeTab,
      height: 0,
      loaded: false,
      localItems,
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
        this.loaded = true
        await this.changeTab(this.active)
      }
    },
    async changeTab(index) {
      this.active = index
      this.localItems = this.localItems.map((item, i) => {
        item.isOpen = index === i ? !item.isOpen : false
        return item
      })

      await this.$nextTick()
      this.height = `${this.$refs.contents[index].offsetHeight}px`
    },
  },
}
</script>

<style lang="scss" scoped>
.vt-accordion {
  border: 1px solid rgba(var(--black-rgb), 0.2);
  @apply rounded-lg overflow-hidden;
}

.vt-accordion__button {
  color: var(--black);
  outline: none !important;

  @apply relative flex items-center justify-between w-full m-0 py-4 px-5;
  @apply font-medium text-left border-0 rounded-none cursor-pointer;

  .vt-accordion__icon-wrapper {
    transform-origin: center;
    transition: transform 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);
    color: inherit;
    @apply relative w-4 h-4 shrink-0;
  }

  &:hover {
    color: var(--light-blue);
  }

  &.is-active {
    color: var(--light-blue);

    .vt-accordion__icon-wrapper {
      transform: rotate(-90deg);
    }
  }
}

.vt-accordion__content-wrapper {
  background: var(--white);
  @apply relative overflow-hidden transition-all duration-700;
}

// prettier-ignore
@supports not selector(.vt-accordion__button:focus-visible) {
  .vt-accordion__button:focus {
    color: var(--light-blue);
  }
}

@supports selector(.vt-accordion__button:focus-visible) {
  .vt-accordion__button:focus-visible {
    color: var(--light-blue);
  }
}
</style>
