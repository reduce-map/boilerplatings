<template>
  <div>
    <div class="outer-div">
      <ButtonGroup class="mb-4">
        <Button @click="onChart2">Bronze Medals by Country (click 👈)</Button>
      </ButtonGroup>
      <div class="grid-wrapper">
        <ag-grid-vue
          style="width: 100%; height: 500px"
          class="ag-theme-balham"
          :columnDefs="columnDefs"
          @grid-ready="onGridReady"
          :defaultColDef="defaultColDef"
          :enableRangeSelection="true"
          :enableCharts="true"
          :rowData="rowData"
          :popupParent="popupParent"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, VNodeRef } from "vue";
import { AgGridVue } from "ag-grid-vue3";

import "ag-grid-enterprise";
import { ColDef, GridApi } from "ag-grid-enterprise";

const columnDefs = ref<ColDef[]>([
  { field: "country", width: 150, chartDataType: "category" },
  { field: "gold", chartDataType: "series", sort: "desc" },
  { field: "silver", chartDataType: "series", sort: "desc" },
  { field: "bronze", chartDataType: "series" },
]);

const gridApi = ref<GridApi | null>(null);
const defaultColDef = ref({
  editable: true,
  flex: 1,
  minWidth: 100,
  filter: true,
});

const popupParent = ref<VNodeRef | null>(null);
const rowData = ref<any[]>([]);

onMounted(async () => {
  const data: any = await getData();
  rowData.value = data;
});

const createCharts = () => {
  if (gridApi.value) {
    gridApi.value.createRangeChart({
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 4,
        columns: ["country", "gold", "silver"],
      },
      chartType: "groupedColumn",
      chartThemeOverrides: {
        common: {
          title: {
            enabled: true,
            text: "Top 5 Medal Winners",
          },
        },
      },
    });
  }
};

const onChart2 = () => {
  createCharts();
};

const onGridReady = (params: any) => {
  gridApi.value = params.api;
  // gridApi.value.setRowData(rowData.value);
};

async function getData(delay = 100) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(generateData()), delay),
  );
}

function generateData() {
  const countries = [
    "Ireland",
    "Spain",
    "United Kingdom",
    "France",
    "Germany",
    "Luxembourg",
    "Sweden",
    "Norway",
    "Italy",
    "Greece",
    "Iceland",
    "Portugal",
    "Malta",
    "Brazil",
    "Argentina",
    "Colombia",
    "Peru",
    "Venezuela",
    "Uruguay",
    "Belgium",
  ];

  return countries.map((country, index) => ({
    country,
    gold: Math.floor(((index + 1 / 7) * 333) % 100),
    silver: Math.floor(((index + 1 / 3) * 555) % 100),
    bronze: Math.floor(((index + 1 / 7.3) * 777) % 100),
  }));
}
</script>

<style scoped>
.outer-div {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.button-bar {
  margin-bottom: 10px;
}

.grid-wrapper {
  flex: 1;
  height: 100%;
}
</style>
