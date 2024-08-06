<template>
  <div class="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
    <dl class="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
      <div
        v-for="(stat, statIdx) in stats"
        :key="stat.name"
        :class="[
          statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
          'flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8',
        ]"
      >
        <dt class="text-sm font-medium leading-6 text-gray-500">{{ stat.name }}</dt>
        <dd :class="[stat.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700', 'text-xs font-medium']">
          {{ stat.change }}
        </dd>
        <dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">{{ stat.value }}</dd>
      </div>
    </dl>
  </div>
</template>

<script setup>
const stats = [
  { name: 'Сумма заказов', value: '$405,091.00', change: '+4.75%', changeType: 'positive' },
  { name: 'Балано', value: '$12,787.00', change: '+54.02%', changeType: 'positive' },
  { name: 'На продаже', value: '$145,988.00', change: '+10.39%', changeType: 'positive' },
  { name: 'Затраты (will be сумма)', value: '11,111.11', change: '-91.11%', changeType: 'negative' },
];
</script>
