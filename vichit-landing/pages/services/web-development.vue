<template>
  <div class="app-page-indent bg-white">
    {{ title }}
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'WebDevelopment',
  data() {
    return {
      title: _.upperFirst(this.$t('web-development.title')),
    }
  },

  head() {
    return this.$setupHead('web-development')
  },
}
</script>

<style></style>
