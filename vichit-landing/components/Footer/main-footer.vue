<template>
  <footer
    ref="footer"
    class="app-selection-purple main-footer"
    :class="{
      'main-footer-visible': visible,
    }"
  >
    <div class="app-page-wrapper footer-content">
      <div class="content-holder">
        <div class="logo-contacts">
          <logo-main-description-white class="footer-logo" />
          <ul class="contacts-holder">
            <li>
              <span class="icon-holder">
                <font-awesome-icon :icon="['fas', 'envelope']" />
              </span>

              <a
                href="mailto:hello@vichit.tech"
                target="_blank"
                class="capitalize"
              >
                {{ $t('footer.email-us') }}
              </a>
            </li>
            <li>
              <span class="icon-holder">
                <font-awesome-icon
                  class="icon"
                  :icon="['fas', 'mouse-pointer']"
                />
              </span>
              <a
                href="mailto:sales@vichit.tech"
                target="_blank"
                class="capitalize"
              >
                {{ $t('footer.contact-sales') }}
              </a>
            </li>
            <!--            <li>-->
            <!--              <a href="mailto:recruting@vichit.tech" target="_blank">Careers</a>-->
            <!--            </li>-->
          </ul>
        </div>
        <div class="text-holder">
          <p>
            {{ $t('footer.description') }}
          </p>
        </div>
      </div>
      <nav class="footer-nav">
        <ul>
          <li v-for="nav in navigation" :key="`footer-nav-${nav.name}`">
            <nuxt-link
              class="uppercase p-2 bg-navigation hover:rounded"
              :to="localePath(nav.link)"
              exact
            >
              {{ nav.name }}
            </nuxt-link>
          </li>
          <li>
            <vt-gradient-button
              type="secondary"
              class="btn-lets-talk"
              @click="openHubSpot"
            >
              {{ $t('Lets talk') }}
            </vt-gradient-button>
          </li>
        </ul>
      </nav>
    </div>
    <footer-common-information />
  </footer>
</template>

<script>
// import { createNamespacedHelpers } from 'vuex'
// const { mapState } = createNamespacedHelpers('store')
export default {
  name: 'MainFooter',
  components: {
    // MainHeaderLogo: () => import('@/components/Header/MainHeaderLogo.vue'),
    LogoMainDescriptionWhite: () =>
      import('~/assets/logo/logo-main-description-white-2.svg?inline'),
    FooterCommonInformation: () =>
      import('@/components/Footer/footer-common-information.vue'),
  },
  data() {
    return {
      visible: false,
      navigation: [
        {
          name: this.$t('servicesPage.link'),
          link: 'services',
        },
        {
          name: this.$t('expertise.link'),
          link: 'expertise',
          children: [
            {
              name: this.$t('solutions.link'),
              link: 'solutions',
            },
            {
              name: this.$t('industries'),
              link: 'industries',
            },
            {
              name: this.$t('technologies.link'),
              link: 'technologies',
            },
          ],
        },
      ],
    }
  },
  computed: {
    // ...mapState(['isBurgerMenuOpened']),
  },
  mounted() {
    setTimeout(() => {
      this.visible = true
    }, 10)
  },
  methods: {
    openHubSpot() {
      window.HubSpotConversations.widget.open()
    },
  },
}
</script>

<style lang="scss" scoped>
.main-footer {
  background: var(--vichit-purple-dark);
  opacity: 0;
  width: 100%;
  position: relative;
  @apply flex flex-col justify-between text-white md:fixed md:bottom-0 md:left-1/2 md:z-0 md:-translate-x-1/2 md:h-96;

  &-visible {
    opacity: 1;
  }
}
.footer-nav {
  border: solid var(--vichit-orange-harley);
  border-width: 1px 0;
  @apply py-0.5 sm:py-2 md:py-3;

  ul {
    @apply flex justify-center items-center;
  }

  li {
    @apply pr-4 relative text-sm sm:text-base;

    &:after {
      content: '•';
      position: absolute;
      right: 4px;
      top: 8px;
    }

    &:last-child:after {
      content: none;
    }
  }
}
.bg-navigation {
  display: inline-block;
  //height: 40px;
  @apply transition-colors duration-200 ease-in-out;
  background: transparent;
  &:hover {
    background: rgba(var(--vichit-bg-crystal-cut-rgb), 0.2);
  }
}
.footer-logo {
  @apply transition-all duration-200 ease-in-out;
}
.footer-logo-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: fit-content;
}
.footer-content {
  color: var(--vichit-snow);
  max-height: 24rem;
  @apply pb-4 overflow-hidden flex flex-col;
}
.content-holder {
  @apply grid grid-cols-1 lg:grid-cols-2 lg:gap-10 pt-4 sm:pt-8 md:pt-12 lg:pt-16;
}
.logo-contacts,
.text-holder {
  @apply text-sm md:text-base;
  display: flex;
  color: #eee;
}
.logo-contacts {
  @apply items-center justify-between md:items-start mb-4;
}
.text-holder {
  @apply mb-3 lg:mb-6 text-sm sm:text-base text-justify;
}
.contacts-holder {
  li {
    @apply mb-2;
  }
  a:hover {
    text-decoration: underline;
  }
}
.icon-holder {
  min-width: 16px;
  margin-right: 6px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
}
.btn-lets-talk {
  border: none;
  &::v-deep {
    .button-label {
      color: var(--white);
    }
  }
  @apply uppercase;
}
</style>
