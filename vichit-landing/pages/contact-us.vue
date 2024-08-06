<template>
  <div class="contact-us">
    <fade-in>
      <vt-heading v-show="isInit" class-content="p-4" :level="1">
        {{ $t('contact-us-header') }}
      </vt-heading>
    </fade-in>
    <div class="contact-container">
      <contact-us-form :is-init="isInit" class="contact-us-form" />
      <contact-us-info :is-init="isInit" class="contact-us-info" />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ContactUsForm from '@/components/ContactUs/ContactUsForm.vue'
import ContactUsInfo from '@/components/ContactUs/ContactUsInfo.vue'
import FadeIn from '@/components/Transitions/fade-in'
const { mapState } = createNamespacedHelpers('store')

export default {
  name: 'ContactUs',
  components: {
    ContactUsForm,
    ContactUsInfo,
    FadeIn,
  },
  data: () => ({
    isInit: false,
    loaded: false,
    formKey: 'key',
  }),

  head() {
    return this.$setupHead('contact-us')
  },

  computed: {
    ...mapState(['isPageReadyToShow']),
  },

  watch: {
    async isPageReadyToShow() {
      await this.init()
    },
  },

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      if (this.isPageReadyToShow && !this.loaded) {
        await this.$nextTick()
        this.isInit = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.contact-us {
  background: var(--blue-gradient);
  color: var(--white);
  @apply pt-32 w-full min-h-screen overflow-hidden;
}

.contact-container {
  @apply p-4 w-full;
  @apply lg:flex lg:justify-between lg:gap-4 lg:w-full;
}

.contact-us-info {
  @apply mb-6 pt-6 flex-1;
}

.contact-us-form {
  @apply flex-[1.5] overflow-hidden;
}
</style>
