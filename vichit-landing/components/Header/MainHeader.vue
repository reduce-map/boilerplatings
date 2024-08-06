<template>
  <header
    class="main-header"
    :class="{
      'header-white': isHeaderWhite,
    }"
  >
    <div
      class="bg-header-right"
      :class="{
        'bg-header-right--open': isHeaderWhite && isBurgerMenuOpened,
      }"
    />
    <div
      class="bg-header-top"
      :class="{
        'bg-header-top--open': isBgHeaderTopOpen,
      }"
    />
    <div class="header-holder app-page-wrapper">
      <main-header-logo class="self-center" :is-white="!isHeaderWhite" />
      <div v-show="isBurgerNavigationVisible" class="burger-wrapper">
        <div
          v-if="isLanguageSwitchEnabled"
          :class="{
            'locale-holder--white': isHeaderWhite,
          }"
          class="locale-holder"
        >
          <nuxt-link
            :to="switchLocalePath(fallbackLocalCode)"
            class="locale-switch-btn"
          >
            {{ fallbackLocalCode }}
          </nuxt-link>
        </div>

        <vt-burger-btn
          :open="isBurgerMenuOpened"
          :is-white="!isHeaderWhite"
          @click="setBurgerMenuState(!isBurgerMenuOpened)"
        />
      </div>

      <div v-show="!isBurgerNavigationVisible" class="flex flex-nowrap">
        <navigation :is-white="!isHeaderWhite" :navigation="navigationHeader" />
        <div
          v-if="isLanguageSwitchEnabled"
          :class="{
            'locale-holder--white': isHeaderWhite,
          }"
          class="locale-holder"
        >
          <nuxt-link
            tabindex="0"
            :to="switchLocalePath(fallbackLocalCode)"
            class="locale-switch-btn"
            :class="{
              'locale-switch-btn--white': isHeaderWhite,
            }"
          >
            {{ fallbackLocalCode }}
          </nuxt-link>
        </div>
        <!-- <nuxt-link :to="localePath('contact-us')" class="self-center"> -->
        <vt-gradient-button
          class="self-center"
          :class="{
            'contact-us-btn': isHeaderWhite,
          }"
          :type="isHeaderWhite ? 'secondary' : 'primary'"
          @click="openHubSpot"
        >
          {{ $t('Contact Us') }}
          <template #icon>
            <font-awesome-icon
              class="icon"
              :icon="['fas', 'chevron-circle-right']"
            />
          </template>
        </vt-gradient-button>
        <!-- </nuxt-link> -->
      </div>
    </div>
  </header>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('store')
export default {
  name: 'MainHeader',
  components: {
    Navigation: () => import('./Navigation.vue'),
    MainHeaderLogo: () => import('./MainHeaderLogo.vue'),
  },
  props: {
    navigationHeader: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters([
      'isLanguageSwitchEnabled',
      'isBurgerMenuOpened',
      'isBurgerNavigationVisible',
      'isHeaderWhite',
      'wasHeaderScrolled',
      'fallbackLocalCode',
    ]),
    isBgHeaderTopOpen() {
      return (
        this.isHeaderWhite &&
        (!this.isBurgerMenuOpened || this.wasHeaderScrolled)
      )
    },
  },
  methods: {
    ...mapMutations(['setBurgerMenuState']),
    openHubSpot() {
      window.HubSpotConversations.widget.open()
    },
  },
}
</script>

<style lang="scss" scoped>
.header-holder {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  position: relative;
  width: 100%;
}
.main-header {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: transparent;
  overflow: hidden;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  @apply pl-2;

  &--border-bottom {
    border-color: rgba(var(--black-rgb), 0.2);
  }
}

.header-white {
  border-color: var(--vichit-purple-dark);
}

.bg-header-right {
  @apply ease-in-out transition-transform;
  z-index: -1;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 80px;
  background: var(--vichit-snow);
  transform: translateX(150%) translateY(0);

  &--open {
    transform: translateX(0) translateY(0);
  }
}

.bg-header-top {
  @apply ease-in-out transition-transform;

  z-index: -1;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 80px;
  background: var(--vichit-snow);
  transform: translateY(-100%) translateX(0);

  &--open {
    transform: translateX(0) translateY(0);
  }
}

.locale-holder {
  @apply pr-4 pl-2 my-4;
  position: relative;
  display: flex;
  align-items: center;

  &--white {
    border-left: 1px solid rgba(var(--vichit-purple-rgb), 0.5);
    .locale-switch-btn {
      color: var(--vichit-purple-dark);

      &:focus,
      &:hover {
        background: rgba(var(--vichit-purple-rgb), 0.2);
      }
    }
  }
}

.locale-switch-btn {
  display: inline-block;
  height: 36px;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: 500;
  text-transform: uppercase;
  @apply text-white;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  &:focus,
  &:hover {
    background: rgba(var(--vichit-bg-crystal-cut-rgb), 0.2);
  }

  &--white {
    color: var(--vichit-purple-dark);

    &:focus,
    &:hover {
      background: rgba(var(--vichit-purple-rgb), 0.2);
    }
  }
}

.burger-wrapper {
  display: flex;
  height: 100%;
}
</style>
