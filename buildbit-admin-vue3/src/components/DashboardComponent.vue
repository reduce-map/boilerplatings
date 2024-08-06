<template>
  <main>
    <div class="relative isolate overflow-hidden pt-16">
      <!--      <dashboard-log />-->
      <!--      <dashboard-grid />-->
      <!-- Gird action buttons navigation -->
      <!--      <div class="pb-4 pt-6 sm:pb-6">-->
      <!--        <div class="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">-->
      <!--          <h1 class="text-base font-semibold leading-7 text-gray-900">Action buttons</h1>-->
      <!--          <div class="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">-->
      <!--            <a v-for="item in secondaryNavigation" :key="item.name" :href="item.href" :class="item.current ? 'text-indigo-600' : 'text-gray-700'">{{ item.name }}</a>-->
      <!--          </div>-->
      <!--          <a href="#" class="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">-->
      <!--            <PlusSmallIcon class="-ml-1.5 h-5 w-5" aria-hidden="true" />-->
      <!--            New invoice-->
      <!--          </a>-->
      <!--        </div>-->
      <!--      </div>-->

      <!-- Stats -->
      <!--      <dashboard-stat />-->

      <div
        class="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
        aria-hidden="true"
      >
        <div
          class="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
          style="
            clip-path: polygon(
              100% 38.5%,
              82.6% 100%,
              60.2% 37.7%,
              52.4% 32.1%,
              47.5% 41.8%,
              45.2% 65.6%,
              27.5% 23.4%,
              0.1% 35.3%,
              17.9% 0%,
              27.7% 23.4%,
              76.2% 2.5%,
              74.2% 56%,
              100% 38.5%
            );
          "
        />
      </div>
    </div>

    <!--    <div class="space-y-16 py-16 xl:space-y-20">-->
    <!--      &lt;!&ndash; Recent client list&ndash;&gt;-->
    <!--      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">-->
    <!--        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">-->
    <!--          <div class="flex items-center justify-between">-->
    <!--            <h2 class="text-base font-semibold leading-7 text-gray-900">Recent clients</h2>-->
    <!--            <a href="#" class="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">View all<span class="sr-only">, clients</span></a>-->
    <!--          </div>-->
    <!--          <ul role="list" class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">-->
    <!--            <li v-for="client in clients" :key="client.id" class="overflow-hidden rounded-xl border border-gray-200">-->
    <!--              <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">-->
    <!--                <img :src="client.imageUrl" :alt="client.name" class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />-->
    <!--                <div class="text-sm font-medium leading-6 text-gray-900">{{ client.name }}</div>-->
    <!--                <Menu as="div" class="relative ml-auto">-->
    <!--                  <MenuButton class="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">-->
    <!--                    <span class="sr-only">Open options</span>-->
    <!--                    <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />-->
    <!--                  </MenuButton>-->
    <!--                  <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">-->
    <!--                    <MenuItems class="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">-->
    <!--                      <MenuItem v-slot="{ active }">-->
    <!--                        <a href="#" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']"-->
    <!--                        >View<span class="sr-only">, {{ client.name }}</span></a-->
    <!--                        >-->
    <!--                      </MenuItem>-->
    <!--                      <MenuItem v-slot="{ active }">-->
    <!--                        <a href="#" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']"-->
    <!--                        >Edit<span class="sr-only">, {{ client.name }}</span></a-->
    <!--                        >-->
    <!--                      </MenuItem>-->
    <!--                    </MenuItems>-->
    <!--                  </transition>-->
    <!--                </Menu>-->
    <!--              </div>-->
    <!--              <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">-->
    <!--                <div class="flex justify-between gap-x-4 py-3">-->
    <!--                  <dt class="text-gray-500">Last invoice</dt>-->
    <!--                  <dd class="text-gray-700">-->
    <!--                    <time :datetime="client.lastInvoice.dateTime">{{ client.lastInvoice.date }}</time>-->
    <!--                  </dd>-->
    <!--                </div>-->
    <!--                <div class="flex justify-between gap-x-4 py-3">-->
    <!--                  <dt class="text-gray-500">Amount</dt>-->
    <!--                  <dd class="flex items-start gap-x-2">-->
    <!--                    <div class="font-medium text-gray-900">{{ client.lastInvoice.amount }}</div>-->
    <!--                    <div :class="[statuses[client.lastInvoice.status], 'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset']">{{ client.lastInvoice.status }}</div>-->
    <!--                  </dd>-->
    <!--                </div>-->
    <!--              </dl>-->
    <!--            </li>-->
    <!--          </ul>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </main>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { EllipsisHorizontalIcon, PlusSmallIcon } from '@heroicons/vue/20/solid';
import headerComponent2 from '@/components/headerComponent2.vue';
import DashboardStat from '@/components/dashboardStat.vue';
import DashboardGrid from '@/components/dashboard-grid.vue';
import DashboardLog from '@/components/dashboard-log.vue';

const statuses = {
  Paid: 'text-green-700 bg-green-50 ring-green-600/20',
  Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
};

const clients = [
  {
    id: 1,
    name: 'Tuple',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/tuple.svg',
    lastInvoice: { date: 'December 13, 2022', dateTime: '2022-12-13', amount: '$2,000.00', status: 'Overdue' },
  },
  {
    id: 2,
    name: 'SavvyCal',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
    lastInvoice: { date: 'January 22, 2023', dateTime: '2023-01-22', amount: '$14,000.00', status: 'Paid' },
  },
  {
    id: 3,
    name: 'Reform',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
    lastInvoice: { date: 'January 23, 2023', dateTime: '2023-01-23', amount: '$7,600.00', status: 'Paid' },
  },
];
</script>
