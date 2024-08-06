<script setup lang="ts">
import BarChartWinsLose from "./DashboardBarChartWinsLose.vue";
</script>

<template>
  <BarChartWinsLose
    title="EUR/USD Performance"
    subtitle="2024 Monthly Performance"
    strategy1Name="Dilling Range"
    strategy2Name="Swing Trading"
    :data="[
      {
        month: 'Jan',
        strategy1: 12,
        strategy1Loss: -5,
        strategy2: 10,
        strategy2Loss: -5,
      },
      {
        month: 'Feb',
        strategy1: 13,
        strategy1Loss: -8,
        strategy2: 15,
        strategy2Loss: -6,
      },
      {
        month: 'Mar',
        strategy1: 10,
        strategy1Loss: -10,
        strategy2: 18,
        strategy2Loss: -6,
      },
      {
        month: 'Apr',
        strategy1: 19,
        strategy1Loss: -8,
        strategy2: 12,
        strategy2Loss: -6,
      },
      {
        month: 'May',
        strategy1: 13,
        strategy1Loss: -7,
        strategy2: 17,
        strategy2Loss: -6,
      },
      {
        month: 'Jun',
        strategy1: 11,
        strategy1Loss: -11,
        strategy2: 12,
        strategy2Loss: -5,
      },
      {
        month: 'Jul',
        strategy1: 19,
        strategy1Loss: -10,
        strategy2: 11,
        strategy2Loss: -4,
      },
      {
        month: 'Aug',
        strategy1: 12,
        strategy1Loss: -7,
        strategy2: 16,
        strategy2Loss: -6,
      },
      {
        month: 'Sep',
        strategy1: 11,
        strategy1Loss: -10,
        strategy2: 18,
        strategy2Loss: -6,
      },
      {
        month: 'Oct',
        strategy1: 19,
        strategy1Loss: -11,
        strategy2: 19,
        strategy2Loss: -7,
      },
      {
        month: 'Nov',
        strategy1: 11,
        strategy1Loss: -9,
        strategy2: 10,
        strategy2Loss: -6,
      },
      {
        month: 'Dec',
        strategy1: 13,
        strategy1Loss: -7,
        strategy2: 10,
        strategy2Loss: -6,
      },
    ]"
  />
</template>
