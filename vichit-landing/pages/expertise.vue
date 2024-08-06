<template>
  <div class="app-page-indent page-expertise bg-white">
    <div class="p-4 app-page-wrapper flex flex-col justify-between">
      <div class="mb-12">
        <vt-breadcrumbs class="my-4" :items="breadcrumbs" />
        <vt-heading level="1" class-content="heading capitalize">
          {{ $t('expertise.title') }}
        </vt-heading>
      </div>
      <ul class="expertise-list-holder">
        <li
          v-for="expertise in expertises"
          :key="expertise.title"
          class="expertise-row"
        >
          <vt-hexagon-item>
            <template #background-image>
              <div class="hexagon-tech-bg">
                <div
                  class="img-container-svg"
                  v-html="
                    require(`~/assets/icons/abstract/${expertise.icon.toLowerCase()}.svg?raw`)
                  "
                />
              </div>
            </template>
          </vt-hexagon-item>
          <div class="text-holder">
            <vt-heading level="2" class-content="heading">
              {{ expertise.title }}
            </vt-heading>
            <p>{{ expertise.text }}</p>
            <nuxt-link
              v-if="expertise.isShowMoreVisible"
              class="show-more"
              :to="localePath(expertise.link)"
            >
              <vt-gradient-button class="show-more-button">
                <span class="text-more">
                  {{ $t('show more') }}
                </span>
              </vt-gradient-button>
            </nuxt-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Expertise',
  data() {
    return {
      breadcrumbs: [
        {
          text: this.$t('home'),
          path: 'index',
        },
        {
          text: this.$t('expertise.link'),
        },
      ],

      expertises: [
        {
          title: this.$t('expertise.list.solutions.title'),
          link: 'solutions',
          icon: 'solution',
          text: this.$t('expertise.list.solutions.text'),
        },
        {
          isShowMoreVisible: true,
          title: this.$t('expertise.list.technologies.title'),
          link: 'technologies',
          icon: 'technologies',
          text: this.$t('expertise.list.technologies.text'),
        },
        {
          title: this.$t('expertise.list.industries.title'),
          link: 'industries',
          icon: 'industries',
          text: this.$t('expertise.list.industries.text'),
        },
      ],
    }
  },
  head() {
    return this.$setupHead('expertise')
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .img-container-svg {
    height: 52%;
    width: 60%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    clip-path: none;

    svg {
      height: 100% !important;
      width: 100% !important;
    }
  }
}

.hexagon-tech-bg {
  background: rgba(var(--vichit-grey-rgb), 0.15);
  @apply w-full h-full;
}

h1.heading {
  @apply mb-12 lg:text-5xl capitalize text-center;
}
h2.heading {
  @apply text-2xl capitalize text-center w-full;
  @apply sm:text-2xl lg:text-2xl;
}

.page-expertise {
  background: var(--vichit-snow);
  min-height: 100vh;
  padding-bottom: 160px;
}

.expertise-list-holder {
  li {
    @apply flex justify-between;
  }
}

.show-more-button {
  @apply uppercase;
}

.expertise-row {
  @apply flex flex-col items-center;

  &::v-deep {
    .hexagon-card {
      --size-card: 280px;
    }
  }

  .text-holder {
    @apply w-full text-center;

    h2.heading {
      @apply mb-12;
    }
  }
}

@media (min-width: 768px) {
  .expertise-row {
    @apply flex justify-between flex-row;

    &::v-deep {
      .hexagon-card {
        --size-card: 300px;
      }
    }

    .text-holder {
      width: calc(100% - 400px);
      @apply text-left;
      h2.heading {
        @apply mb-8;
      }
    }
  }
}
</style>
