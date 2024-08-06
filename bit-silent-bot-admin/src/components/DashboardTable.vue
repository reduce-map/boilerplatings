<template>
  <div class="dashboard-table">
    <div class="example-wrapper">
      <div style="margin-bottom: 5px">
        <button style="font-size: 12px" @click="onBtStopEditing">
          Stop Editing
        </button>
        <button style="font-size: 12px" @click="addCurrencyPair">
          Add Currency Pair
        </button>
        <button
          style="font-size: 12px"
          :disabled="!isChanged"
          @click="saveChanges"
        >
          Save Changes
        </button>
        <button style="font-size: 12px" @click="exportData">Export Data</button>
      </div>
      <ag-grid-vue
        style="width: 100%; height: 480px"
        class="ag-theme-balham"
        :columnDefs="columnDefs"
        @grid-ready="onGridReady"
        :defaultColDef="defaultColDef"
        editType="fullRow"
        :rowData="rowData"
        :animateRows="true"
        :rowDragManaged="true"
        @cell-value-changed="onCellValueChanged"
        @row-value-changed="onRowValueChanged"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import {
  GridApi,
  CellValueChangedEvent,
  RowValueChangedEvent,
  AgGridEvent,
} from "ag-grid-community";
import { Message } from "view-ui-plus";

function formatDateTime(date = new Date(), includeTime = true) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  if (includeTime) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}(${hours}:${minutes})`;
  }

  return `${year}-${month}-${day}`;
}

// Props to receive data from parent
const props = defineProps({
  initialData: {
    type: Array,
    default: () => [
      {
        symbol: "ETHBTC",
        status: "TRADING",
        baseAsset: "ETH",
        quoteAsset: "BTC",
        filters: [
          {
            filterType: "PRICE_FILTER",
            minPrice: "0.00001000",
            maxPrice: "922327.00000000",
            tickSize: "0.00001000",
          },
          {
            filterType: "LOT_SIZE",
            minQty: "0.00010000",
            maxQty: "100000.00000000",
            stepSize: "0.00010000",
          },
          { filterType: "ICEBERG_PARTS", limit: 10 },
          {
            filterType: "MARKET_LOT_SIZE",
            minQty: "0.00000000",
            maxQty: "3300.71078125",
            stepSize: "0.00000000",
          },
          {
            filterType: "TRAILING_DELTA",
            minTrailingAboveDelta: 10,
            maxTrailingAboveDelta: 2000,
            minTrailingBelowDelta: 10,
            maxTrailingBelowDelta: 2000,
          },
          {
            filterType: "PERCENT_PRICE_BY_SIDE",
            bidMultiplierUp: "5",
            bidMultiplierDown: "0.2",
            askMultiplierUp: "5",
            askMultiplierDown: "0.2",
            avgPriceMins: 5,
          },
          {
            filterType: "NOTIONAL",
            minNotional: "0.00010000",
            applyMinToMarket: true,
            maxNotional: "9000000.00000000",
            applyMaxToMarket: false,
            avgPriceMins: 5,
          },
          { filterType: "MAX_NUM_ORDERS", maxNumOrders: 200 },
          { filterType: "MAX_NUM_ALGO_ORDERS", maxNumAlgoOrders: 5 },
        ],
      },
      // Добавьте дополнительные символы по аналогии
    ],
  },
  exportFileName: {
    type: String,
    default: "currency-pairs",
  },
});

const isChanged = ref(false);

const columnDefs = ref([
  {
    rowDrag: true,
    headerName: "Symbol",
    field: "symbol",
    width: 150,
    pinned: true,
    sortable: true,
  },
  {
    headerName: "Base",
    field: "baseAsset",
    width: 100,
    pinned: true,
    sortable: true,
  },
  {
    headerName: "Quote",
    field: "quoteAsset",
    width: 100,
    pinned: true,
    sortable: true,
  },
  {
    headerName: "Buy",
    field: "buy",
    width: 100,
    editable: true,
    sortable: true,
    cellEditor: "agTextCellEditor",
  },
  {
    headerName: "Sell",
    field: "sell",
    width: 100,
    editable: true,
    sortable: true,
    cellEditor: "agTextCellEditor",
  },
  {
    headerName: "Enabled",
    field: "enabled",
    width: 100,
    editable: true,
    sortable: true,
    cellRenderer: "agCheckboxCellRenderer",
  },
]);

const gridApi = ref<GridApi | null>(null);
const defaultColDef = ref({
  flex: 1,
  editable: true,
  sortable: true,
  filter: true,
});
const rowData = ref<any[]>([]);

const onCellValueChanged = (event: CellValueChangedEvent) => {
  const field = event.colDef.field + "Changed";
  event.data[field] = true;
  gridApi.value?.refreshCells({
    rowNodes: [event.node],
    columns: [event.colDef.field || ""],
  });
  isChanged.value = true;
};

const onRowValueChanged = (event: RowValueChangedEvent) => {
  const data = event.data;
  console.log(
    "onRowValueChanged - pinia time: (" +
      data.symbol +
      ", " +
      data.baseAsset +
      ", " +
      data.quoteAsset +
      ", " +
      data.buy +
      ", " +
      data.sell +
      ")",
  );
  isChanged.value = true;
};

const onBtStopEditing = () => {
  gridApi.value?.stopEditing();
};

const onGridReady = (params: AgGridEvent) => {
  gridApi.value = params.api;
  gridApi.value?.sizeColumnsToFit(); // Автоматически подгоняем размеры колонок
};

const addCurrencyPair = () => {
  const newPair = {
    symbol: "NewSymbol",
    baseAsset: "USD",
    quoteAsset: "EUR",
    buy: 1,
    sell: 1,
    enabled: true,
  };

  rowData.value = [...rowData.value, newPair];
  isChanged.value = true;
};

const saveChanges = () => {
  isChanged.value = false;
  Message.info("Pinia -> API call");
};

const exportData = () => {
  gridApi.value?.exportDataAsCsv({
    skipColumnGroupHeaders: true,
    fileName: `${props.exportFileName}-${formatDateTime()}`,
  });
};

onBeforeMount(() => {
  rowData.value = [...props.initialData];
});
</script>

<style>
.example-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

button {
  margin: 5px;
}

.cell-changed {
  background-color: #ffeb3b; /* Желтый цвет для подсветки */
}
</style>
