<template>
  <nuxt-link :to="localePath('index')">
    <component
      :is="logoSVGComponent"
      :class="[logoWidthClass]"
      class="h-auto header-logo transition-all"
    />
  </nuxt-link>
</template>

<script>
import MainHeaderLogoWhite from '~/assets/logo/logo-secondary-large-white.svg?inline'
import MainHeaderLogo from '~/assets/logo/logo-secondary-large.svg?inline'
export default {
  components: {
    MainHeaderLogo,
    MainHeaderLogoWhite,
  },
  props: {
    isWhite: {
      type: Boolean,
      default: false,
    },
    logoWidthClass: {
      type: String,
      default: 'w-36',
      // sm:w-[9.5rem] md:w-40 ld:w-[42rem]
    },
  },
  computed: {
    logoSVGComponent() {
      return this.isWhite ? MainHeaderLogoWhite : MainHeaderLogo
    },
  },
}
</script>
