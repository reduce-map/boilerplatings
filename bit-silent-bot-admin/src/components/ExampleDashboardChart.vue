<script setup lang="ts">
import DashboardBotChart from "./DashboardBotChart.vue";
</script>

<template>
  <DashboardBotChart
    title="Bots Efficiency and Usage 2025"
    subtitle="2024-2025"
    :data="[
      { from: 'Trading Bots', to: 'Crypto Trading Bots', size: 5 },
      { from: 'Trading Bots', to: 'Fiat Trading Bots', size: 4 },
      { from: 'Crypto Trading Bots', to: 'Lazy Trading Bot', size: 8 },
      {
        from: 'Crypto Trading Bots',
        to: 'Data Aggregation Bot',
        size: 12,
      },
      { from: 'Crypto Trading Bots', to: 'Arbitrage Bot', size: 6 },
      { from: 'Digital Trading Bots', to: 'Steam Bot', size: 7 },
      { from: 'Trading Bots', to: 'FTMO Bot', size: 10 },
      { from: 'Fiat Trading Bots', to: 'Stock Trading Bot', size: 1 },
      { from: 'Fiat Trading Bots', to: 'Forex Trading Bot', size: 1 },
      { from: 'Fiat Trading Bots', to: 'Options Trading Bot', size: 1 },
      { from: 'Fiat Trading Bots', to: 'Futures Trading Bot', size: 4 },
    ]"
  />
</template>
