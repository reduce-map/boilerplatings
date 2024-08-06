<template>
  <ul class="vt-breadcrumbs-list pt-8 pb-12 px-2">
    <li v-for="(item, i) in items" :key="`${i}-${randomString}`">
      <span v-if="i !== items.length - 1">
        <nuxt-link :to="localePath(item.path)">{{ item.text }}</nuxt-link>
      </span>
      <span v-else aria-current="page" class="current-page">{{
        item.text
      }}</span>
    </li>
  </ul>
</template>

<script>
import { getRandomString } from '@/utils/helper'

export default {
  name: 'VtBreadcrumbs',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    randomString: getRandomString('breadcrumb'),
  }),
}
</script>

<style lang="scss" scoped>
.vt-breadcrumbs-list {
  @apply text-sm uppercase font-semibold tracking-[.4rem] flex;

  li {
    position: relative;
    @apply mr-4;

    &:after {
      top: 0;
      right: -14px;
      position: absolute;
      content: '/';
      font-size: 10px;
      color: var(--vichit-purple-dark);
    }

    &:last-child:after {
      content: none;
    }
  }
}

.nuxt-link,
a {
  text-decoration: none;
  position: relative;
  display: inline-block;

  // fix hover underline width due to font specific
  &:before {
    content: '';
    height: 1px;
    width: calc(100% - 5px);
    background: var(--vichit-purple-dark);
    opacity: 0;
    bottom: 0;
    position: absolute;
    left: 0;
    @apply transition-opacity ease-in-out duration-200;
  }

  &:hover:before {
    opacity: 1;
  }
}

.current-page {
  color: var(--vichit-purple);
}
</style>
