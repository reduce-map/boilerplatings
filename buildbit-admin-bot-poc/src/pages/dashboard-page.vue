<template>
  <trading-layout>
    <div class="xl:pl-96">
      <dashboard-detailed-log v-if="widgetStore.isShownWidgetLog" />
      <div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
        <dashboard-grid />
      </div>
    </div>
    <aside
      class="fixed bottom-0 left-20 top-16 hidden w-72 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block"
    >
      <dashboard-settings v-if="widgetStore.isShownWidgetSettings" />
    </aside>
  </trading-layout>
</template>

<script setup>
import DashboardSettings from '@/components/dashboard-settings.vue';
import DashboardGrid from '@/components/dashboard-grid.vue';
import DashboardDetailedLog from '@/components/dashboard-detailed-log.vue';
import { useWidgetStore } from '@/store/widgetStore';

import { ref } from 'vue';
import TradingLayout from '@/layouts/trading-layout.vue';

const showLogs = ref(true); // Реактивное состояние для отображения логов
const widgetStore = useWidgetStore();

const secondaryNavigation = [
  { name: 'CookieAndOrBot 1', href: '#', current: true },
  { name: 'CookieAndOrBot 2', href: '#', current: false },
  { name: 'CookieAndOrBot 3', href: '#', current: false },
];

const stats = [
  { name: 'Orders amount', value: '$405,091.00' },
  { name: 'Balance ', value: '$12,787.00', unit: 'USD' },
  { name: 'Selling', value: '$145,988.00' },
  { name: 'Expenses with the solution', value: '$11111' },
];

const statuses = { Completed: 'text-green-400 bg-green-400/10', Error: 'text-rose-400 bg-rose-400/10' };

const activityItems = [
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: new Date().toUTCString(),
    branch: 'info',
    status: 'Completed',
    duration: '25s',
    date: '45 minutes ago',
    dateTime: '2023-01-23T11:00',
  },
  {
    user: {
      name: 'Not me',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: new Date().toUTCString(),
    branch: 'info',
    status: 'Error',
    duration: '25s',
    date: '23 minutes ago',
    dateTime: '2023-01-23T11:00',
  },
  {
    user: {
      name: 'Not me',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: new Date().toUTCString(),
    branch: 'info',
    status: 'Error',
    duration: '25s',
    date: '23 minutes ago',
    dateTime: '2023-01-23T11:00',
  },
  {
    user: {
      name: 'Not me',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: new Date().toUTCString(),
    branch: 'info',
    status: 'Error',
    duration: '25s',
    date: '23 minutes ago',
    dateTime: '2023-01-23T11:00',
  },
  {
    user: {
      name: 'Not me',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: new Date().toUTCString(),
    branch: 'info',
    status: 'Error',
    duration: '25s',
    date: '23 minutes ago',
    dateTime: '2023-01-23T11:00',
  },
  {
    user: {
      name: 'Not me',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: new Date().toUTCString(),
    branch: 'info',
    status: 'Error',
    duration: '25s',
    date: '23 minutes ago',
    dateTime: '2023-01-23T11:00',
  },
  {
    user: {
      name: 'Not me',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: new Date().toUTCString(),
    branch: 'info',
    status: 'Error',
    duration: '25s',
    date: '23 minutes ago',
    dateTime: '2023-01-23T11:00',
  },

  // More items...
];
</script>
