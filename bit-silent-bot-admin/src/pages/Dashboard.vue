<script setup lang="ts">
import SideLayout from "../layout/SideLayout.vue";

import DashboardBotList from "../components/DashboardBotList.vue";
import DashboardFinancialChart from "../components/DashboardFinancialChart.vue";
import DashboardApplicationChart from "../components/DashboardApplicationChart.vue";
import ExampleBarChartWinsLose from "../components/ExampleBarChartWinsLose.vue";
import ExampleDashboardChart from "../components/ExampleDashboardChart.vue";
import ExampleDashboardChart2 from "../components/ExampleDashboardChart2.vue";
import ExampleTreemap from "../components/ExampleTreemap.vue";
import ExampleTreemap2 from "../components/ExampleTreemap2.vue";
import { onMounted, onUnmounted, ref } from 'vue';

// Q: <Col :span="12" :xs="{ span: 24 }" :sm="{ span: 12 }"> ?
// A: leave as it is for example, [must] mvp = legacy is removed

const columns = ref(3);

const updateColumns = () => {
  if (window.innerWidth < 1024) { // don't be serious reading that
    columns.value = 1;
  } else {
    columns.value = 3;
  }
};

onMounted(() => {
  window.addEventListener('resize', updateColumns);
  updateColumns();
});

onUnmounted(() => {
  window.removeEventListener('resize', updateColumns);
});
</script>

<template>
  <SideLayout>
    <h1>Dashboard ♟️ Example Page</h1>

    <Divider />

    <h2 class="mb-4">
      <strong> 🏃🏻 👉‍️ : </strong>

      <router-link to="/bot/25">FTMO Trading Bot</router-link>

      : 👈 Example Page 💰🚣
    </h2>

    <Divider />

    <h2 class="mb-4">Treemap Ag-Charts 📈 example</h2>

    <Grid class="mb-4" :col="columns" border hover>
      <GridItem>
        <ExampleTreemap />
      </GridItem>
      <GridItem>
        <ExampleTreemap2 />
      </GridItem>
      <GridItem>
        <ExampleTreemap />
      </GridItem>
    </Grid>

    <h2 class="mb-4">
      [🪬backtest purpose]
      <a href="https://charts.ag-grid.com/gallery/" target="_blank"
        >AgFinancialCharts
      </a>
      🧮 👍🏻 Example
    </h2>

    <DashboardFinancialChart />

    <Divider />

    <h2 class="mb-4">
      [🪬backtest purpose]
      <a
        href="https://www.ag-grid.com/javascript-data-grid/integrated-charts-api-cross-filter-chart/"
        target="_blank"
        >AgFinancialCharts 🧪</a
      >
      Backtest purposes 🧮 Example +
      <a
        href="https://www.ag-grid.com/javascript-data-grid/integrated-charts/"
        target="_blank"
        >link</a
      >
    </h2>

    <DashboardApplicationChart class="mb-4" />

    <h2 class="mb-4">
      Dashboard stats 📊 example
    </h2>

    <Grid :col="columns" border hover>
      <GridItem>
        <ExampleBarChartWinsLose />
      </GridItem>
      <GridItem>
        <DashboardBotList />
      </GridItem>
      <GridItem>
        <ExampleDashboardChart />
      </GridItem>
      <GridItem>
        <ExampleDashboardChart2 />
      </GridItem>
    </Grid>
  </SideLayout>
</template>
