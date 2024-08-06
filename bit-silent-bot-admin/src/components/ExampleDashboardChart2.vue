<script setup lang="ts">
import DashboardBotChart from "./DashboardBotChart.vue";
</script>

<template>
  <DashboardBotChart
    title="Bot Efficiency and Usage 2023"
    subtitle="2022-2023"
    :data="[
      {
        from: 'AI Personalized Bots',
        to: 'Discount Tracking Bot',
        size: 1,
      },
      {
        from: 'AI Personalized Bots',
        to: 'Sentiment Analysis Bot',
        size: 1,
      },
      {
        from: 'AI Personalized Bots',
        to: 'Customer Service Bot',
        size: 1,
      },
      { from: 'Other Bots', to: 'Weather Forecast Bot', size: 1 },
      { from: 'Other Bots', to: 'Traffic Analysis Bot', size: 1 },
      { from: 'Other Bots', to: 'Sports Stats Bot', size: 1 },
      { from: 'Other Bots', to: 'Health Monitoring Bot', size: 1 },
      { from: 'All Bots', to: 'Trading Bots', size: 9 },
      { from: 'All Bots', to: 'Data Collection Bots', size: 8 },
      { from: 'All Bots', to: 'AI Personalized Bots', size: 4 },
      { from: 'All Bots', to: 'Other Bots', size: 4 },
    ]"
  />
</template>
