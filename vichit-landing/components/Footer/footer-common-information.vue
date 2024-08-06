<template>
  <div class="footer-common-info">
    <div class="app-page-wrapper">
      <ul class="footer-nav-list">
        <li>© 2022 {{ $t('Vichit') }}. {{ $t('All rights reserved') }}</li>
        <li>
          <nuxt-link :to="localePath('privacy-policy')">
            {{ privacyPolicyLink }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localePath('cookie-policy')">
            {{ cookiePolicyLink }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localePath('sitemap')" class="capitalize">
            {{ $t('sitemap.link') }}
          </nuxt-link>
        </li>
        <li v-if="isLanguageSwitchEnabled">
          <font-awesome-icon
            class="lang-icon"
            :icon="['fas', 'globe-europe']"
          />
          <nuxt-link :to="switchLocalePath(localeCode)" class="locale-switch">
            {{ localeName }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import _ from 'lodash'
const { mapGetters } = createNamespacedHelpers('store')
export default {
  name: 'FooterCommonInformation',
  data() {
    return {
      cookiePolicyLink: _.upperFirst(this.$t('cookie-policy.link')),
      privacyPolicyLink: _.upperFirst(this.$t('privacy-policy.link')),
    }
  },
  computed: {
    ...mapGetters(['isLanguageSwitchEnabled']),
    currentLocalCode() {
      return this.$i18n.localeProperties.code
    },
    anotherLocal() {
      return this.$i18n.locales.filter(
        ({ code }) => this.currentLocalCode !== code
      )[0]
    },
    localeName() {
      return this.anotherLocal?.name
    },
    localeCode() {
      return this.anotherLocal?.code
    },
  },
}
</script>

<style lang="scss" scoped>
.footer-nav-list {
  white-space: nowrap;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @apply text-xs lg:text-base py-1;

  li {
    position: relative;
    @apply pr-4;

    &:after {
      content: '•';
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
      margin-bottom: -2px;
    }

    &:last-child:after {
      content: none;
    }
  }
}
.footer-common-info {
  width: 100%;
  background: var(--vichit-snow);
  color: var(--vichit-purple-dark);
}
a:hover {
  text-decoration: underline;
}
.lang-icon {
  @apply text-base;
  color: var(--vichit-purple-dark);
}
</style>
