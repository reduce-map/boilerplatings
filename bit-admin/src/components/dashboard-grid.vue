<template>
  <div class="flex flex-wrap mb-4 mt-6 px-16">
    <div
      class="pt-2 order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:pl-6 sm:leading-7"
    >
      <a
        v-for="item in secondaryNavigation"
        :key="item.name"
        :href="item.href"
        :class="item.current ? 'text-indigo-600' : 'text-gray-700'"
        >{{ item.name }}</a
      >
    </div>
    <div class="ml-auto flex items-center gap-x-1">
      <a
        href="#"
        class="flex rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <ArrowsRightLeftIcon class="-ml-1.5 h-5 w-5" aria-hidden="true" />
        <span>Перерасчет</span>
      </a>
      <a
        href="#"
        class="flex gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <ArrowTrendingDownIcon class="-ml-1.5 h-5 w-5" aria-hidden="true" />
        <span>Удалить</span>
      </a>
    </div>
  </div>

  <RichGridExample />
</template>

<script setup>
import { ArrowsRightLeftIcon, ArrowTrendingDownIcon } from '@heroicons/vue/20/solid';
import RichGridExample from './rich-grid-example/RichGridExample.vue';

const secondaryNavigation = [
  { name: 'Cнять Заказы', href: '#', current: true },
  { name: 'Начиная с даты', href: '#', current: false },
  { name: 'Добавить отсутствующие', href: '#', current: false },
];
</script>
