<template>
  <app-layout>
    <p>Design system</p>

    <grid-test />
    <dashboard-log class="flex-1" />
    <dashboard-settings class="flex-1" />
    <dashboard-stat />
    <chart-component />
    <slide-over-component class="z-20 absolute" />
    <dashboard-grid />
    <recent-activities />
    <large-data-set-example />
    <dashboard-detailed-log />

    <Circle :percent="100" stroke-color="#5cb85c">
      <Icon type="ios-checkmark" size="60" style="color: #5cb85c"></Icon>
    </Circle>
    <Circle :percent="35" stroke-color="#ff5500">
      <span class="demo-Circle-inner">
        <Icon type="ios-close" size="50" style="color: #ff5500"></Icon>
      </span>
    </Circle>
  </app-layout>
</template>

<script setup>
import AppLayout from '@/components/app-layout.vue';
import ChartComponent from '@/components/chart/chart-component.vue';
import DashboardSettings from '@/components/dashboard-settings.vue';
import DashboardLog from '@/components/dashboard-log.vue';
import SlideOverComponent from '@/components/slide-over-component.vue';
import DashboardGrid from '@/components/dashboard-grid.vue';
import RecentActivities from '@/components/recent-activities.vue';
import LargeDataSetExample from '@/components/large-data-set-example/LargeDataSetExample.vue';
import DashboardStat from '@/components/dashboard-stat.vue';
import GridTest from '@/components/ag-grids/grid-test.vue';
import DashboardDetailedLog from '@/components/dashboard-detailed-log.vue';
</script>
