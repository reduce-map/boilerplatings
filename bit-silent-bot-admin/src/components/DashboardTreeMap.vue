<template>
  <ag-charts :options="options" />
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { AgCharts } from "ag-charts-vue3";
import { type AgChartOptions } from "ag-charts-community";
import "ag-charts-enterprise";

interface TradingData {
  name: string;
  gdp?: number;
  children?: TradingData[];
}

const props = defineProps<{
  title: string;
  data: TradingData[];
}>();

const formatter = new Intl.NumberFormat("en-US", {
  useGrouping: true,
  maximumFractionDigits: 0,
});

const options = ref<AgChartOptions>({
  data: props.data,
  series: [
    {
      type: "treemap",
      labelKey: "name",
      secondaryLabelKey: "gdp",
      sizeKey: "gdp",
      tile: {
        label: {
          minimumFontSize: 9,
        },
        secondaryLabel: {
          minimumFontSize: 6,
          formatter: ({ value }) =>
            value != null ? `$${formatter.format(value)} B` : undefined,
        },
        padding: 6,
      },
    },
  ],
  title: {
    text: props.title,
  },
});

watchEffect(() => {
  options.value.data = props.data;
  options.value.title = { text: props.title };
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 500px;
}
</style>
