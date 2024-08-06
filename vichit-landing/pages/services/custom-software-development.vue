<template>
  <div class="app-page-indent bg-white">
    <template v-for="value in pageViews">
      <default-start-view
        v-if="value.type === 'DefaultStartView'"
        :key="value.type"
        :page-name="pageName"
        v-bind="value.data"
      />
      <text-list
        v-if="value.type === 'TextList'"
        :key="value.type"
        :page-name="pageName"
        v-bind="value.data"
      />
    </template>
  </div>
</template>

<script>
import TextList from '@/components/GenericPages/TextList.vue'
import DefaultStartView from '@/components/GenericPages/DefaultStartView.vue'

export default {
  name: 'CustomSoftwareDevelopment',
  components: { DefaultStartView, TextList },
  asyncData({ app }) {
    const pageName = 'custom-software-development'
    return {
      pageName,
      pageViews: app.i18n.t(`generic-pages.${pageName}.views`),
    }
  },
  head() {
    return this.$setupHead(this.pageName)
  },
}
</script>
