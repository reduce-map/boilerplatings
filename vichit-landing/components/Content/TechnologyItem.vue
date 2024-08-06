<template>
  <li
    class="
      border-2 border-gray-600
      rounded-lg
      transform
      transition
      duration-500
      hover:scale-110
      flex
      justify-items-center
      items-center
      content-center
      px-1
      h-10
      flex
      justify-center
    "
  >
    <p
      class="app-svg-holder"
      v-html="
        require(`~/assets/icons/technologies/${name.toLowerCase()}.svg?raw`)
      "
    />
    <p class="ml-2 text-white">{{ name }}</p>
  </li>
</template>

<script>
export default {
  name: 'TechnologyItem',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
}
</script>
