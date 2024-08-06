<template>
  <header class="bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex flex-1">
        <div class="hidden lg:flex lg:gap-x-12">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="{ name: item.to }"
            class="text-sm font-semibold leading-6 text-gray-900"
            >{{ item.name }}</router-link
          >
        </div>
        <div class="flex lg:hidden">
          <button
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = true"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      <a href="#" class="-m-1.5 p-1.5">
        <span>Steam Bot</span>
        <span class="sr-only">Steam Bot</span>
        <!--        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />-->
      </a>
      <div class="flex flex-1 justify-end">
        <button
          v-for="item in widgetList"
          :key="item.name"
          @click="toggleWidget(item.name)"
          class="text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">{{ item.name }}</span>
          <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </nav>
    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel class="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6">
        <div class="flex items-center justify-between">
          <div class="flex flex-1">
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </a>
          <div class="flex flex-1 justify-end"></div>
        </div>
        <div class="mt-6 space-y-2">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="{ name: item.to }"
            @click="mobileMenuOpen = false"
            class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >{{ item.name }}</router-link
          >
        </div>
      </DialogPanel>
    </Dialog>
  </header>
  <router-view />
</template>

<script setup>
import { ref } from 'vue';
import { Dialog, DialogPanel } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import { defineComponent, h } from 'vue';
import { useWidgetStore } from '@/store/widgetStore';

const navigation = [
  { name: 'Dashboard', to: 'dashboard' },
  { name: 'Settings', to: 'settings' },
  { name: 'Design system', to: 'design-system' },
];

const mobileMenuOpen = ref(false);

const widgetStore = useWidgetStore();

const widgetList = [
  {
    name: 'Log',
    icon: defineComponent({
      render: () =>
        h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', {
            d: 'M5 4h14v2H5V4zm0 14h14v2H5v-2zm0-7h14v2H5v-2z',
          }),
        ]),
    }),
  },
  {
    name: 'Settings',
    icon: defineComponent({
      render: () =>
        h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', {
            d: 'M19.14,12.94l1.43-1.43a1,1,0,0,0,0-1.41l-2.12-2.12a1,1,0,0,0-1.41,0L15,8.85A7.07,7.07,0,0,0,12.94,7l1-1a1,1,0,0,0,0-1.41L11.83,2.46a1,1,0,0,0-1.41,0L9.41,3.47A7.07,7.07,0,0,0,7,5.06L5.85,4A1,1,0,0,0,4.44,4L2.32,6.12a1,1,0,0,0,0,1.41L3.34,8.44A7.07,7.07,0,0,0,5.06,10.59l-1,1a1,1,0,0,0,0,1.41l2.12,2.12a1,1,0,0,0,1.41,0L8.85,15A7.07,7.07,0,0,0,10.59,17l-1,1a1,1,0,0,0,0,1.41l2.12,2.12a1,1,0,0,0,1.41,0L12.94,19A7.07,7.07,0,0,0,15,17.06l1,1a1,1,0,0,0,1.41,0l2.12-2.12a1,1,0,0,0,0-1.41Zm-7.44,1.5A4,4,0,1,1,16,10.59,4,4,0,0,1,11.7,14.44Z',
          }),
        ]),
    }),
  },
];

const toggleWidget = (widgetName) => {
  widgetStore.toggleWidget(widgetName);
};
</script>
