<template>
  <nav
    class="burger__menu"
    :class="{
      'burger__menu--open': isBurgerMenuOpened,
    }"
  >
    <div class="burger-holder app-page-wrapper">
      <ul>
        <li
          v-for="nav in navigationHeader"
          :key="`mobile-${nav.name}`"
          class="burger__item"
        >
          <div>
            <nuxt-link
              class="burger__link"
              :to="localePath(nav.link)"
              exact
              @click.native="setBurgerMenuState(false)"
            >
              <span class="prefix"> / </span>
              {{ $t(nav.name) }}
            </nuxt-link>
          </div>
          <!--          <ul class="flex flex-wrap gap-2 flex-row-reverse">-->
          <!--            <nuxt-link-->
          <!--              v-for="(item, i) in getInfoForNavItem(nav)"-->
          <!--              :key="`${nav}-${item.link}-${item.text}-${i}`"-->
          <!--              class="-->
          <!--                burger__link-->
          <!--                uppercase-->
          <!--                transition-all-->
          <!--                duration-300-->
          <!--                ease-in-out-->
          <!--                text-xs text-gray-400-->
          <!--              "-->
          <!--              :to="localePath(item.link)"-->
          <!--              exact-->
          <!--              @click.native="setBurgerMenuState(false)"-->
          <!--            >-->
          <!--              {{ item.text }}-->
          <!--            </nuxt-link>-->
          <!--          </ul>-->
        </li>
      </ul>
      <vt-gradient-button class="my-4 lets-talk-btn" @click="openHubSpot">
        <span class="uppercase font-medium text-base">
          {{ $t(`Lets talk`) }}
        </span>
        <template #icon>
          <font-awesome-icon class="icon" :icon="['fas', 'comment-alt']" />
        </template>
      </vt-gradient-button>

      <!-- <div class="p-4">
        <contact-us class="my-8 w-full" />
      </div> -->
    </div>
  </nav>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('store')

export default {
  name: 'BurgerNavigation',
  components: {
    // BackgroundSvg: () => import('~/assets/svg/bg-burger-animation.svg?inline'),
    // ContactUs: () => import('./ContactUs.vue'),
  },
  props: {
    navigationHeader: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState(['isBurgerMenuOpened']),
  },
  methods: {
    ...mapMutations(['setBurgerMenuState']),
    openHubSpot() {
      this.setBurgerMenuState(false)
      window.HubSpotConversations?.widget?.open()
    },
    // getInfoForNavItem() {
    // if (nav === 'services') {
    //   return [
    //     {
    //       link: '/',
    //       text: 'Web development Services',
    //     },
    //     {
    //       link: '/',
    //       text: 'Web development Services',
    //     },
    //   ]
    // }

    // return []
    // },
  },
}
</script>

<style lang="scss" scoped>
.burger__menu {
  @apply transition-transform ease-in-out;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  position: fixed;
  transform: translateX(150%);
  background: linear-gradient(-45deg, var(--velvet-pink), var(--vichit-snow));
  background-size: 200% 200%;
  animation: gradient 6s ease infinite;
  height: calc(100% - 80px);

  &--open {
    transform: translateX(0);
  }
}

.burger__item {
  @apply text-2xl mb-4;
}

.burger-holder {
  @apply px-4 pt-12;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.burger__link {
  display: flex;
  text-transform: uppercase;
  @apply transition-all duration-300 ease-in-out;

  .prefix {
    @apply transition-all duration-300 ease-in-out font-semibold;
    visibility: hidden;
    opacity: 0;
    color: var(--vichit-purple);
  }

  &:hover {
    .prefix {
      visibility: visible;
      opacity: 1;
      padding: 0 12px 0 20px;
    }
  }
}

.lets-talk-btn {
  &::v-deep {
    .button-icon {
      vertical-align: text-top;
      svg {
        color: var(--vichit-orange-harley);
      }
    }
  }

  &:hover::v-deep {
    .button-icon svg {
      color: var(--white);
    }
  }
}
</style>
