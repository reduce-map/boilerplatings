<template>
  <ag-charts :options="options" style="height: 500px" />
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { type AgChartOptions } from "ag-charts-community";
import { AgCharts } from "ag-charts-vue3";
import "ag-charts-enterprise";

interface TradeData {
  month: string;
  strategy1: number;
  strategy2: number;
  strategy1Loss: number;
  strategy2Loss: number;
}

const props = defineProps<{
  title: string;
  subtitle: string;
  data: TradeData[];
  strategy1Name: string;
  strategy2Name: string;
}>();

const options = ref<AgChartOptions>({
  theme: {
    overrides: {
      bar: {
        series: {
          stroke: "transparent",
          strokeWidth: 2,
          cornerRadius: 6,
          label: {
            enabled: true,
            formatter: ({ value }) => `${Math.abs(value)}`,
          },
          itemStyler: ({ datum, yKey }) => ({
            fillOpacity: getOpacity(Math.abs(datum[yKey]), yKey, 0.4, 1),
          }),
          tooltip: {
            renderer: ({ datum, xKey, yKey }) => ({
              content: `${datum[xKey]}: ${Math.abs(datum[yKey])}`,
            }),
          },
        },
      },
    },
  },
  title: {
    text: props.title,
    spacing: 30,
  },
  subtitle: {
    text: props.subtitle,
  },
  data: props.data,
  series: [
    {
      type: "bar",
      direction: "horizontal",
      xKey: "month",
      yKey: "strategy1",
      yName: `${props.strategy1Name} - Wins`,
      stacked: true,
    },
    {
      type: "bar",
      direction: "horizontal",
      xKey: "month",
      yKey: "strategy2",
      yName: `${props.strategy2Name} - Wins`,
      stacked: true,
    },
    {
      type: "bar",
      direction: "horizontal",
      xKey: "month",
      yKey: "strategy1Loss",
      yName: `${props.strategy1Name} - Losses`,
      stacked: true,
    },
    {
      type: "bar",
      direction: "horizontal",
      xKey: "month",
      yKey: "strategy2Loss",
      yName: `${props.strategy2Name} - Losses`,
      stacked: true,
    },
  ],
  axes: [
    {
      type: "category",
      position: "left",
      interval: { values: ["Jan", "Dec"] },
      line: {
        enabled: false,
      },
      gridLine: {
        enabled: true,
      },
    },
    {
      type: "number",
      position: "bottom",
      nice: false,
      min: -40,
      max: 60,
      interval: { values: [0] },
      label: {
        enabled: false,
      },
      tick: {
        size: 0,
      },
      gridLine: {
        width: 2,
      },
      crossLines: [
        {
          type: "range",
          range: [0, -30],
          strokeWidth: 0,
          fillOpacity: 0,
          label: {
            text: "L O S S E S",
            position: "top",
          },
        },
        {
          type: "range",
          range: [0, 50],
          strokeWidth: 0,
          fillOpacity: 0,
          label: {
            text: "W I N S",
            position: "top",
          },
        },
      ],
    },
  ],
  legend: {
    enabled: true,
    position: "bottom",
  },
});

function getOpacity(
  value: number,
  key: string,
  minOpacity: number,
  maxOpacity: number,
): number {
  const [min, max] = getDomain(key);
  let alpha = Math.round(((value - min) / (max - min)) * 10) / 10;
  return map(alpha, 0, 1, minOpacity, maxOpacity);
}

function getDomain(key: string): [number, number] {
  const values = props.data.map((d) => {
    const value = d[key as keyof TradeData];
    return typeof value === "number" ? Math.abs(value) : 0;
  });

  const min = Math.min(...values);
  const max = Math.max(...values);

  return [min, max];
}

const map = (
  value: number,
  start1: number,
  end1: number,
  start2: number,
  end2: number,
): number => {
  return ((value - start1) / (end1 - start1)) * (end2 - start2) + start2;
};

watchEffect(() => {
  options.value.data = props.data;
});
</script>
