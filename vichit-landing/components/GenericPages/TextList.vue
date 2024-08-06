<template>
  <section class="text-list">
    <vt-heading level="2" class="text-list__heading">
      {{ title }}
    </vt-heading>
    <grid-layout class="text-list__content">
      <div>
        <paragraphs :paragraphs="paragraphs" />
      </div>
      <icon-list :list="list" />
    </grid-layout>
  </section>
</template>

<script>
export default {
  name: 'TextList',
  components: {
    GridLayout: () => import('@/components/GenericPages/GridLayout'),
    IconList: () => import('@/components/GenericPages/IconList'),
    Paragraphs: () => import('@/components/GenericPages/Paragraphs'),
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
    paragraphs: {
      type: Array,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.text-list {
  @apply flex flex-col items-center mt-10 w-full px-5;
  @apply sm:px-7 md:px-10;
}

.text-list__heading {
  @apply max-w-3xl mb-5 text-center;
}

.text-list__content {
  @apply max-w-5xl;
}
</style>
