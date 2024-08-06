<template>
  <div class="app-page-indent bg-white">
    <div class="p-4 app-page-wrapper flex flex-col justify-between">
      <div class="mb-12">
        <vt-breadcrumbs class="my-4" :items="breadcrumbs" />
        <vt-heading
          level="1"
          class-content="lg:!text-5xl text-center capitalize privacy-policy__header"
        >
          {{ $t('technologies.title') }}
        </vt-heading>
      </div>
      <vt-hexagon-grid>
        <vt-hexagon-item v-for="technology in technologies" :key="technology">
          <template #background-image>
            <div class="h-full w-full hexagon-tech-bg">
              <vt-tooltip>
                <div
                  class="img-container-svg"
                  v-html="
                    require(`~/assets/icons/technologies/${technology.toLowerCase()}.svg?raw`)
                  "
                />
                <template #content>
                  <span>
                    {{ technology }}
                  </span>
                </template>
              </vt-tooltip>
            </div>
          </template>
        </vt-hexagon-item>
      </vt-hexagon-grid>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Technologies',
  data() {
    return {
      breadcrumbs: [
        {
          text: this.$t('home'),
          path: 'index',
        },
        {
          text: this.$t('technologies.link'),
        },
      ],

      technologies: [
        'Python',
        'JavaScript',
        'TypeScript',
        'Node.js',
        'Django',
        'Flask',
        'Express.js',
        'PostgreSQL',
        'MongoDB',
        'Flutter',
        'Vue',
        'React',
        'Angular',
        'Nuxt',
        'Next.Js',
        'Laravel',
        'Symfony',
        'Jamstack',
        'PWA',
        'HTML5',
        'CSS3',
        'Vite',
        'Webpack',
      ],
    }
  },
  head() {
    return this.$setupHead('technologies')
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
}
</style>
