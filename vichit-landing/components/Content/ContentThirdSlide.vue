<template>
  <div class="expertise-slide">
    <vt-heading :level="2" class="heading">
      {{ $t('thirdSlide.title') }}
    </vt-heading>

    <vt-card-image class="pb-12">
      <template #image>
        <img
          src="~/assets/img/20.jpeg"
          :alt="$t('thirdSlide.solutions.title')"
        />
      </template>
      <template #title>
        <vt-heading :level="3">
          {{ $t('thirdSlide.solutions.title') }}
        </vt-heading>
      </template>
      <p
        v-for="(p, i) in $t('thirdSlide.solutions.descriptionList')"
        :key="`description-${i}`"
        class="mb-2"
      >
        {{ p }}
      </p>
    </vt-card-image>

    <vt-accordion :items="$t('thirdSlide.solutions.list')" class="mb-8">
      <template #default="{ item }">
        <p
          v-for="(p, i) in item.descriptionList"
          :key="`description-2-${i}`"
          class="mb-2"
        >
          {{ p }}
        </p>

        <ul class="app-list">
          <li v-for="(services, i) in item.services" :key="`service-${i}`">
            <strong>{{ services }}</strong>
          </li>
        </ul>
      </template>
    </vt-accordion>

    <div class="expertise-technologies">
      <vt-heading level="3" class="text-center mb-4">
        {{ $t('thirdSlide.technologies.title') }}
      </vt-heading>
      <p class="text-center mb-4">
        {{ $t('thirdSlide.technologies.description') }}
      </p>
      <div class="hexagon-row">
        <vt-hexagon-grid class="hexagon-row-grid" one-line>
          <vt-hexagon-item
            v-for="technology in technologies"
            :key="`${technology}-expertise`"
          >
            <template #background-image>
              <div class="h-full w-full hexagon-tech-bg">
                <div
                  class="img-container-svg"
                  v-html="
                    require(`~/assets/icons/technologies/${technology.toLowerCase()}.svg?raw`)
                  "
                ></div>
              </div>
            </template>
          </vt-hexagon-item>

          <vt-hexagon-item class="hexagon-show-more">
            <template #background-image>
              <div class="h-full w-full hexagon-tech-bg">
                <div class="show-more-wrapper">
                  <nuxt-link class="show-more" :to="localePath('technologies')">
                    <vt-gradient-button class="show-more-button">
                      <span class="text-more">
                        {{ $t('show more') }}
                      </span>
                    </vt-gradient-button>
                  </nuxt-link>
                </div>
              </div>
            </template>
          </vt-hexagon-item>
        </vt-hexagon-grid>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('store')
export default {
  name: 'ExpertiseThirdSlide',
  data: () => ({
    technologies: ['Python', 'JavaScript', 'TypeScript', 'Node.js'],
    items: [
      {
        title: 'Dedicated Teams',
        description: `Hire dedicated software developers to fit your needs at scale.Alleviate the pressure of a backlog without having to hire, train, and maintain long-term salaries. Hire a dedicated software development team of hand-selected engineers in Ukraine.to launch a team. 30,000 developers in our network `,
      },
      {
        title: 'Outsourcing',
        description: 'End-to-End Software Development Outsourcing Solutions',
      },
      {
        title: 'MVP',
        description:
          'MVP development is the best way to validate your idea and reach your goals with fewer risks.',
      },
    ],
  }),
  computed: {
    ...mapGetters(['pageHasSliderAnimation']),
    expertiseList() {
      return this.$t('thirdSlide.expertiseList')
    },
  },
}
</script>

<style lang="scss" scoped>
.expertise-slide {
  @apply pb-8 md:pb-12;
  .heading {
    @apply tracking-wide mb-8 capitalize text-center;
  }

  .expertise-technologies {
    @apply mt-2;

    .hexagon-row {
      @apply flex justify-center;

      .hexagon-row-grid {
        --size-grid: 65px;
        --margin-grid: 2px !important;

        @media (min-width: 440px) {
          --size-grid: 80px;
        }
        @media (min-width: 600px) {
          --size-grid: 100px;
          --padding-bottom: 100px;
          --margin-grid: 4px !important;
        }
        @media (min-width: 940px) {
          --size-grid: 120px;
        }

        @media (min-width: 1200px) {
          --size-grid: 130px;
        }
      }
    }

    .show-more-wrapper {
      @apply flex items-center justify-center w-full h-full uppercase;
    }
    .show-more-button {
      @apply px-0.5;
      @apply sm:px-2;

      &:before {
        @apply rounded-lg;
      }
    }

    .text-more {
      font-size: 10px;
      letter-spacing: -1px;
      @apply uppercase font-medium whitespace-nowrap;

      @apply sm:text-xs;
      @apply md:text-sm;
      @apply lg:text-base;
    }
  }

  ::v-deep {
    .img-container-svg {
      @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;

      height: 52%;
      width: 60%;
      clip-path: none;

      svg {
        height: 100% !important;
        width: 100% !important;
      }
    }
  }

  .hexagon-tech-bg {
    background: rgba(var(--vichit-grey-rgb), 0.15);
  }
}
</style>
