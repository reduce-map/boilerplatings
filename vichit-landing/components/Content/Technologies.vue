<template>
  <div class="overflow-hidden">
    <vt-heading level="2" class="mb-8 tracking-wide text-white">
      OUR TECHNOLOGIES
    </vt-heading>
    <ul
      class="
        grid
        gap-3
        grid-cols-2
        sm:grid-cols-3 sm:gap-4
        md:grid-cols-4 md:gap-5
        slide-in
      "
    >
      <technology-item
        v-for="(name, index) in items"
        :key="index"
        :name="name"
      />
    </ul>
  </div>
</template>

<script>
import TechnologyItem from '@/components/Content/TechnologyItem.vue'

export default {
  name: 'Technologies',
  components: {
    TechnologyItem,
  },
  data() {
    return {
      items: [
        'JavaScript',
        'NodeJs',
        'TypeScript',
        'Vue',
        'React',
        'Angular',
        'Nuxt',
        'NextJs',
        'Vite',
        'Webpack',
      ],
    }
  },
}
</script>
