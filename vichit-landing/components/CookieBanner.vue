<template>
  <div v-if="isCookieBannerVisible" class="app-shadow-purple cookie-banner">
    <div>
      <p class="font-bold pb-2">
        {{ $t('cookieBanner.title') }}
      </p>
      <p class="pb-2 text-sm text-justify">
        {{ $t('cookieBanner.content') }}
      </p>
    </div>
    <div class="w-full text-left sm:text-right">
      <vt-gradient-button class="cookie-button" @click="hideCookieBanner">
        <span class="font-medium text-base cookie-button__color">
          {{ $t('cookieBanner.agreeButton') }}
        </span>
      </vt-gradient-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CookieModal',

  data() {
    return {
      isCookieBannerVisible: true,
    }
  },

  mounted() {
    this.setCookieBannerVisibility()
  },

  methods: {
    setCookieBannerVisibility() {
      if (localStorage.getItem('isCookieBannerVisible') === 'false') {
        this.isCookieBannerVisible = false
      }
    },

    hideCookieBanner() {
      this.isCookieBannerVisible = false
      localStorage.setItem('isCookieBannerVisible', 'false')
    },
  },
}
</script>

<style lang="scss" scoped>
.cookie-banner {
  @apply fixed p-3 pb-1 bottom-4 rounded-lg;
}

.cookie-banner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--vichit-purple-dark);
  background-color: var(--vichit-snow);
  z-index: 40;
  border-radius: 4px;
  left: 0.5rem;
  width: calc(100% - 1rem);
  height: auto;

  @media (min-width: 460px) {
    width: 450px;
    left: 1rem;
  }

  .cookie-button {
    //border: 1px solid var(--vichit-orange-harley);
    text-transform: uppercase;
    font-weight: bold;
    .cookie-button__color {
      color: var(var(--vichit-orange-harley));
    }
  }
}
</style>
