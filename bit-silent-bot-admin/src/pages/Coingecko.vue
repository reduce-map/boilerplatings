<script setup lang="ts">
import SideLayout from "../layout/SideLayout.vue";

import coinGeckoService from '../services/coin-gecko-service';
import type { Cryptocurrency } from '../services/coin-gecko-service';
import { onMounted, ref } from 'vue';

import { AgGridVue } from 'ag-grid-vue3';
import { GridApi, ColDef } from 'ag-grid-enterprise';
import 'ag-grid-enterprise';

const cryptocurrencies = ref<Cryptocurrency[]>([]);

const fetchCryptocurrencies = async () => {
  try {
    const data = await coinGeckoService.getCryptocurrencies();
    rowData.value = data
    cryptocurrencies.value = data
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
  }
};

onMounted(() => {
  fetchCryptocurrencies();
});

const rowData = ref<Cryptocurrency[]>([]);
const gridApi = ref<GridApi | null>(null);

const columnDefs = ref<ColDef[]>([
  {
    field: 'name',
    headerName: 'Name',
    rowDrag: true
  },
  {
    field: 'symbol',
    headerName: 'Symbol',
  },
  {
    field: 'current_price',
    headerName: 'Current Price',
  },
  {
    field: 'market_cap',
    headerName: 'Market Cap',
  },
  {
    field: 'total_volume',
    headerName: 'Total Volume',
  },
  {
    field: 'high_24h',
    headerName: '24h High',
  },
  {
    field: 'low_24h',
    headerName: '24h Low',
  },
  {
    field: 'price_change_24h',
    headerName: '24h Change',
  },
  {
    field: 'price_change_percentage_24h',
    headerName: '24h Change %',
  },
  {
    field: 'market_cap_rank',
    headerName: 'Market Cap Rank',
  },
  {
    field: 'circulating_supply',
    headerName: 'Circulating Supply',
  },
  {
    field: 'total_supply',
    headerName: 'Total Supply',
  },
  {
    field: 'max_supply',
    headerName: 'Max Supply',
  },
]);

const defaultColDef = ref<ColDef>({
  flex: 1,
  sortable: true,
  filter: true,
  enableRowGroup: true,
  // editable: true
});

const onGridReady = (params: any) => {
  gridApi.value = params.api;
  params.api.sizeColumnsToFit();
};
</script>

<template>
  <SideLayout>
    <h1>Coingecko</h1>

    <ag-grid-vue
      style="height: calc(100vh - 100px)"
      class="ag-theme-balham"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      :animateRows="true"
      :rowDragManaged="true"
      :enableRangeSelection="true"
      :suppressRowClickSelection="true"
      rowSelection="multiple"
      @grid-ready="onGridReady"
    />
  </SideLayout>
</template>
