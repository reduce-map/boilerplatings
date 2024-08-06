<template>
  <ul class="icon-list">
    <li
      v-for="(item, index) in list"
      :key="`${randomString}-${index}`"
      class="icon-list__item"
    >
      <font-awesome-icon class="icon" :icon="['fas', icon]" />
      {{ item.text }}
    </li>
  </ul>
</template>

<script>
import { getRandomString } from '@/utils/helper'
export default {
  name: 'IconList',
  props: {
    list: {
      type: Array,
      required: true,
    },
    icon: {
      type: String,
      default: 'check-circle',
    },
  },
  computed: {
    randomString() {
      return getRandomString('IconList')
    },
  },
}
</script>

<style lang="scss" scoped>
.icon-list__item {
  @apply flex mb-4;
}

.icon {
  @apply mr-4 mt-1;
  color: var(--velvet-violet);
}
</style>
