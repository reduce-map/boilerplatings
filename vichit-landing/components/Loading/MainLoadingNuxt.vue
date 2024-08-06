<template>
  <main-loading
    v-if="isLongLoadingEnabled && isLoadingVisible"
    class="main-loading-nuxt"
    animate-appear
    :loading="loadingStart"
    @loading-end="isLoadingVisible = false"
  />
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import MainLoading from './MainLoading.vue'
const { mapState } = createNamespacedHelpers('store')

export default {
  name: 'MainLoadingNuxt',
  components: { MainLoading },
  data: () => ({
    loadingStart: true, // hot fix set to true to not trigger watch
    startLoadingTime: null, // store loading time for debug reasons
    isLoadingVisible: false,
    minDuration: 1000,
  }),
  computed: {
    ...mapState(['isLongLoadingEnabled']),
  },
  methods: {
    start() {
      this.startLoadingTime = new Date().valueOf()
      this.$log.debug('start main loading nuxt')
      if (this.isLongLoadingEnabled) {
        this.loadingStart = true
        this.isLoadingVisible = true
      }
    },
    finish() {
      const endTime = new Date().valueOf()
      const diff = endTime - this.startLoadingTime
      this.$log.debug('finish main loading nuxt, diff: ', diff)

      if (this.isLongLoadingEnabled) {
        if (diff < this.minDuration) {
          setTimeout(() => {
            this.loadingStart = false
          }, this.minDuration - diff)
          return
        }

        this.loadingStart = false
      }
    },
  },
}
</script>
