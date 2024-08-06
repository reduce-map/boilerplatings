<template>
  <div class="nuxt-error">
    <component :is="errorPage" />
  </div>
</template>
<script>
import error404 from '~/components/ErrorPages/404.vue'
export default {
  name: 'NuxtError',
  components: { error404 },
  layout: 'default', // optional
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },

  head() {
    return {
      title: this.statusCode,
    }
  },

  computed: {
    errorPage() {
      if (this.is404) {
        return error404
      }

      return error404
    },
    is404() {
      return this.statusCode === 404
    },
    statusCode() {
      return this.error.statusCode
    },
  },
}
</script>
