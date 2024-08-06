<template>
  <div class="app-page-indent bg-white">
    {{ title }}
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'MobileApplicationDevelopment',
  data() {
    return {
      title: _.upperFirst(this.$t('mobile-application-development.title')),
    }
  },
  head() {
    return this.$setupHead('mobile-application-development')
  },
}
</script>
