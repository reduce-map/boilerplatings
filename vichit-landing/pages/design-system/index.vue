<template>
  <div class="app-page-indent app-page-wrapper design-system-page">
    <vt-breadcrumbs class="my-4" :items="breadcrumbs" />
    <vt-heading level="1" class-content="heading">
      Design system page
    </vt-heading>
  </div>
</template>

<script>
export default {
  name: 'DesignSystem',
  data() {
    return {
      breadcrumbs: [
        {
          text: this.$t('home'),
          path: 'index',
        },
        {
          text: 'Design System',
        },
      ],
    }
  },
  head() {
    return this.$setupHead('services')
  },
}
</script>

<style lang="scss" scoped>
.design-system-page {
  background: #ddd;
  min-height: 100vh;
  padding-bottom: 60px;
}
</style>
