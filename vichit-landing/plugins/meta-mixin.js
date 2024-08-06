import Vue from 'vue'
import _ from 'lodash'

// Make sure to pick a unique name for the flag
// so it won't conflict with any other mixin.
if (!Vue.__meta_mixin__) {
  Vue.__meta_mixin__ = true
  Vue.mixin({
    methods: {
      $setupHead(pageName) {
        const metaPage = this.$t(`metaData.${pageName}`)
        if (
          process.env.NUXT_ENV_DEBUG_APP === 'true' &&
          (!metaPage || typeof metaPage !== 'object')
        ) {
          throw new Error(`Meta Data is not defined, page name - ${pageName}`)
        }

        return {
          title: _.get(metaPage, 'title'),
          meta: [
            {
              property: 'description',
              content: _.get(metaPage, 'description'),
            },
            {
              property: 'og:title',
              content: _.get(metaPage, 'title'),
            },
            {
              property: 'og:description',
              content: _.get(metaPage, 'description'),
            },
            {
              property: 'og:site_name',
              content: _.get(metaPage, 'description'),
            },
            {
              property: 'og:image:alt',
              content: _.get(metaPage, 'title'),
            },
          ],
        }
      },
    },
  })
}
