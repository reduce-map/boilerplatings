<template>
  <div class="md:p-8 working-model">
    <div class="flex flex-col justify-between">
      <vt-heading :level="2" class="mb-4 text-center">
        OUR TECHNOLOGIES
      </vt-heading>
      <vt-hexagon-grid one-line>
        <vt-hexagon-item v-for="technology in technologies" :key="technology">
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
            <div
              class="
                h-full
                w-full
                hexagon-tech-bg
                flex
                item-center
                justify-center
              "
            >
              <nuxt-link :to="localePath('technologies')" class="self-center">
                <vt-gradient-button>
                  <strong class="uppercase font-medium text-xs lg:text-base">
                    SHOW MORE
                  </strong>
                </vt-gradient-button>
              </nuxt-link>
            </div>
          </template>
        </vt-hexagon-item>
      </vt-hexagon-grid>
    </div>
    <vt-accordion :items="items" class="pb-12 mb-12 accordion-working-model">
      <template #default="{ item }">
        <p>{{ item.description }}</p>
      </template>
    </vt-accordion>

    <vt-card-image class="pb-12">
      <template #image>
        <img src="~/assets/img/20.jpeg" alt="SOLUTIONS" />
      </template>
      <template #title>
        <vt-heading :level="2"> SOLUTIONS </vt-heading>
      </template>
      <p>
        We offer our clients only the most ingenious and efficient software
        solutions that help them achieve their business goals. We transform
        businesses with powerful and adaptable digital solutions that satisfy
        the needs of today and unlock the opportunities of tomorrow VICHIT is a
        Custom Software Development Company We provide custom software
        development and IT outsourcing services. Our developers build custom We
        provide custom software development and IT outsourcing services. Our
        developers build custom
      </p>
    </vt-card-image>
  </div>
</template>

<script>
export default {
  name: 'WorkingModel',

  data() {
    return {
      technologies: [
        'python',
        'Node.js',
        'JavaScript',
        'TypeScript',
        // 'laravel',
        // 'symfony',
        // 'postgresql',
        // 'mongodb',
        // 'Vue',
        // 'React',
        // 'Angular',
        // 'flutter',
        // 'Nuxt',
        // 'NextJs',
        // 'Vite',
        // 'Webpack',
        // 'pwa',
        // 'html',
        // 'jamstack',
        // 'css',
      ],
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
    }
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
    transform: translate(-50%, calc(-50% + 4px));
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
.working-model {
  .hexagon-show-more {
    margin-left: 43%;
    display: block;
    white-space: initial;

    @media (min-width: 370px) {
      margin: 0 auto;
    }
  }

  .accordion-working-model::v-deep {
    .accordion__body {
      background-color: var(--white);
      color: var(--black);
    }
  }
}
</style>
