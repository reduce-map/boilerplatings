<template>
  <div class="app-page-indent page-services">
    <div class="app-page-wrapper">
      <vt-breadcrumbs :items="breadcrumbs" />
      <NuxtChild />

      <vt-heading level="1" class-content="heading">
        {{ $t('servicesPage.title') }}
      </vt-heading>

      <p class="mb-8">{{ $t('servicesPage.description') }}</p>

      <vt-heading level="2" class-content="heading">
        {{ $t('servicesPage.engineering') }}
      </vt-heading>

      <div class="services-grid">
        <vt-card-bordered
          v-for="service in $t('servicesPage.engineeringServices')"
          :key="service.title"
          class="service-item"
        >
          <div class="header-holder">
            <vt-heading class-content="heading" level="3">
              {{ service.title }}
            </vt-heading>
            <div v-if="service.icon" class="icon-holder">
              <img
                :alt="service.title"
                :src="
                  require(`~/assets/icons/${service.icon.toLowerCase()}?raw`)
                "
              />
            </div>
          </div>

          <div class="content-holder">
            <p>
              <span>
                {{ service.text }}
              </span>
              <!--              <vt-gradient-button>-->
              <!--                <strong class="uppercase font-medium text-xs lg:text-base">-->
              <!--                  {{ $t('show more') }}-->
              <!--                </strong>-->
              <!--              </vt-gradient-button>-->
            </p>
          </div>
        </vt-card-bordered>
      </div>

      <div class="special-services">
        <vt-heading level="3" class-content="!font-semibold mb-10">
          {{ $t('servicesPage.servicesAdditionalTitle') }}
        </vt-heading>

        <vt-accordion :items="$t('servicesPage.engineeringServicesSpecial')">
          <template #default="{ item }">
            <p v-html="item.text" />
          </template>
        </vt-accordion>
      </div>

      <vt-heading level="2" class-content="heading">
        {{ $t('servicesPage.advisory') }}
      </vt-heading>

      <div class="services-grid-advisory">
        <vt-card-bordered
          v-for="service in $t('servicesPage.advisoryServices')"
          :key="service.title"
          class="service-item"
        >
          <div class="header-holder">
            <vt-heading class-content="heading" level="3">
              {{ service.title }}
            </vt-heading>
            <div v-if="service.icon" class="icon-holder">
              <img
                :alt="service.title"
                :src="
                  require(`~/assets/icons/${service.icon.toLowerCase()}?raw`)
                "
              />
            </div>
          </div>

          <div class="content-holder">
            <p>
              <span>
                {{ service.text }}
              </span>
              <!--              <vt-gradient-button>-->
              <!--                <strong class="uppercase font-medium text-xs lg:text-base">-->
              <!--                  {{ $t('show more') }}-->
              <!--                </strong>-->
              <!--              </vt-gradient-button>-->
            </p>
          </div>
        </vt-card-bordered>
      </div>

      <vt-heading level="2" class-content="heading">
        {{ $t('servicesPage.optimisation') }}
      </vt-heading>

      <div class="services-grid-advisory">
        <vt-card-bordered
          v-for="service in $t('servicesPage.optimisationServices')"
          :key="service.title"
          class="service-item"
        >
          <div class="header-holder">
            <vt-heading class-content="heading" level="3">
              {{ service.title }}
            </vt-heading>
            <div v-if="service.icon" class="icon-holder">
              <img
                :alt="service.title"
                :src="
                  require(`~/assets/icons/${service.icon.toLowerCase()}?raw`)
                "
              />
            </div>
          </div>

          <div class="content-holder">
            <p>
              <span>
                {{ service.text }}
              </span>
              <!--              <vt-gradient-button>-->
              <!--                <strong class="uppercase font-medium text-xs lg:text-base">-->
              <!--                  {{ $t('show more') }}-->
              <!--                </strong>-->
              <!--              </vt-gradient-button>-->
            </p>
          </div>
        </vt-card-bordered>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServicesPage',
  data() {
    return {
      breadcrumbs: [
        {
          text: this.$t('home'),
          path: 'index',
        },
        {
          text: this.$t('servicesPage.link'),
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
.page-services {
  background: var(--vichit-snow);
  min-height: 100vh;
  padding-bottom: 60px;
}
h1.heading {
  text-transform: capitalize;
  text-align: center;
  @apply text-5xl sm:text-5xl lg:text-5xl mb-12;
}
h2.heading {
  text-transform: capitalize;
  @apply text-4xl sm:text-4xl lg:text-4xl mb-10;
}
h3.heading {
  text-transform: capitalize;
  @apply text-3xl sm:text-3xl lg:text-3xl mb-8;
}
.services-grid {
  @apply mb-12 pl-4 relative;
  @apply grid gap-4 lg:grid-rows-4 lg:grid-flow-col;

  .service-item {
    &:first-child,
    &:last-child {
      @apply lg:row-span-2;
    }
  }
}

.services-grid-advisory {
  @apply mb-12 pl-4 relative;
  @apply grid gap-4 lg:grid-rows-2 lg:grid-flow-col;
}

.services-grid-optimisation {
  @apply mb-8 pl-4 flex gap-4;
}

.header-holder {
  @apply flex items-center mb-4 justify-between;

  h3 {
    margin: 0;
  }
}

.icon-holder {
  vertical-align: top;
  max-width: 100px;
  height: auto;
}

.content-holder {
  @apply text-justify;
}

.special-services {
  @apply pl-5 mb-7;

  ul {
    @apply flex flex-wrap;

    li {
      @apply relative p-2 text-center mb-2 lg:mb-0;

      &:after {
        content: '';
        right: 0;
        height: 33%;
        top: 50%;
        width: 1px;
        background: #000;
        transform: translateY(-50%);
        @apply absolute;
      }

      &:last-child:after {
        content: none;
      }
    }
  }

  .vt-tooltip {
    display: inline-block;
  }
}

.cards {
  max-width: 1250px;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  padding: 20px;
}
</style>
