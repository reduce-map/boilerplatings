<template>
  <trading-layout>
    <div class="holder m-auto px-4 py-4">
      <h1>Design system</h1>
      <p>dashboard settings</p>
      <dashboard-settings />

      <p>dashboard detailed log</p>
      <dashboard-detailed-log />

      <p>dashboard log</p>
      <dashboard-log />

      <p>chart component</p>
      <chart-component />
    </div>
  </trading-layout>
</template>

<script setup>
import TradingLayout from '@/layouts/trading-layout.vue';
import DashboardSettings from '@/components/dashboard-settings.vue';
import DashboardLog from '@/components/dashboard-log.vue';
import DashboardDetailedLog from '@/components/dashboard-detailed-log.vue';
import ChartComponent from '@/components/chart/chart-component.vue';
</script>

<style scoped>
.holder {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
