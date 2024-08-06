<template>
  <ag-charts :options="options" />
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { AgCharts } from "ag-charts-vue3";
import { type AgChartOptions } from "ag-charts-community";
import "ag-charts-enterprise";

interface SankeyData {
  from: string;
  to: string;
  size: number;
}

const props = defineProps<{
  title: string;
  subtitle?: string;
  data: SankeyData[];
}>();

const options = ref<AgChartOptions>({
  title: {
    text: props.title,
  },
  subtitle: {
    text: props.subtitle,
  },
  data: props.data,
  series: [
    {
      type: "sankey",
      fromKey: "from",
      toKey: "to",
      sizeKey: "size",
      sizeName: "Number of Bots",
    },
  ],
});

watchEffect(() => {
  options.value.data = props.data;
});
</script>
