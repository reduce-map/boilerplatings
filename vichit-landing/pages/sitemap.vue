<template>
  <div
    class="
      app-page-indent
      min-h-screen
      w-full
      app-text-white app-bg-vichit-purple
    "
  >
    <div class="p-4 app-page-wrapper">
      <div class="mb-12 lg:mb-24">
        <vt-breadcrumbs class="sitemap__breadcrumbs" :items="breadcrumbs" />
        <vt-heading
          level="1"
          class-content="lg:!text-5xl text-center privacy-policy__header mb-16"
        >
          {{ sitemapTitle }}
        </vt-heading>
      </div>
      <div>
        <vt-heading class="mb-8 lg:mb-16" :level="2">
          {{ pageTitle }}
        </vt-heading>
        <vt-link-tree class="mb-8" :list="pages" />
        <vt-link-tree class="mb-8" :list="additionalPages" />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
const pages = [
  {
    path: 'services',
    text: 'servicesPage.link',
  },
  {
    path: 'solutions',
    text: 'solutions.link',
  },
  {
    path: 'technologies',
    text: 'technologies.link',
  },
]

const additionalPages = [
  {
    path: 'cookie-policy',
    text: 'cookie-policy.link',
  },
  {
    path: 'privacy-policy',
    text: 'privacy-policy.link',
  },
  {
    path: 'sitemap',
    text: 'sitemap.link',
  },
]

export default {
  name: 'Sitemap',
  components: {
    VtLinkTree: () => import('@/components/SiteMap/vt-link-tree.vue'),
  },

  data() {
    return {
      pages,
      additionalPages,
      pageTitle: _.upperFirst(this.$t('pages')),
      sitemapTitle: _.upperFirst(this.$t('sitemap.title')),
      breadcrumbs: [
        {
          text: this.$t('home'),
          path: 'index',
        },
        {
          text: this.$t('sitemap.link'),
        },
      ],
    }
  },
  head() {
    return this.$setupHead('sitemap')
  },
}
</script>
<style lang="scss" scoped>
.sitemap__breadcrumbs {
  @apply my-4;

  &::v-deep {
    .current-page {
      color: var(--vichit-coral);
    }
  }
}
</style>
