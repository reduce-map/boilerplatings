<template>
  <div style="height: 100%">
    <div class="example-wrapper">
      <div style="margin-bottom: 5px">
        <button style="font-size: 12px" @click="onBtStopEditing">Stop Editing</button>
        <button style="font-size: 12px" @click="addCurrencyPair">Add Currency Pair</button>
        <button style="font-size: 12px" :disabled="!isChanged" @click="saveChanges">Save Changes</button>
        <button style="font-size: 12px" @click="exportData">Export Data</button>
      </div>
      <ag-grid-vue
        style="width: 100%; height: 350px"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        @grid-ready="onGridReady"
        :defaultColDef="defaultColDef"
        :editType="editType"
        :rowData="rowData"
        :animateRows="true"
        :rowDragManaged="true"
        @cell-value-changed="onCellValueChanged"
        @row-value-changed="onRowValueChanged"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onBeforeUnmount, defineProps } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-charts-enterprise';
import { formatDateTime, getAllCurrenciesFromPrioritizedCountries, getFlagByCurrency } from '@/utils';

// Props to receive data from parent
const props = defineProps({
  initialData: {
    type: Array,
    default: () => [],
  },
  exportFileName: {
    type: String,
    default: 'currency-pairs',
  },
});

const isChanged = ref(false);

const columnDefs = ref([
  {
    rowDrag: true,
    field: 'base',
    sortable: true, // добавлено
    cellEditor: 'agSelectCellEditor',
    cellRenderer: currencyCellRenderer,
    cellEditorParams: {
      values: getAllCurrenciesFromPrioritizedCountries(),
    },
    cellClassRules: {
      'cell-changed': (params) => params.data?.baseChanged,
    },
  },
  {
    headerName: '',
    valueGetter: () => '/',
    editable: false,
    suppressNavigable: true,
    width: 20,
  },
  {
    field: 'quote',
    sortable: true, // добавлено
    cellEditor: 'agSelectCellEditor',
    cellRenderer: currencyCellRenderer,
    cellEditorParams: {
      values: getAllCurrenciesFromPrioritizedCountries(),
    },
    cellClassRules: {
      'cell-changed': (params) => params.data?.quoteChanged,
    },
  },
  {
    field: 'buy',
    sortable: true, // добавлено
    cellEditor: 'NumericCellEditor',
    cellClassRules: {
      'cell-changed': (params) => params.data?.buyChanged,
    },
  },
  {
    field: 'sell',
    sortable: true, // добавлено
    cellEditor: 'NumericCellEditor',
    cellClassRules: {
      'cell-changed': (params) => params.data?.sellChanged,
    },
  },
  {
    headerName: 'Enabled',
    field: 'enabled',
    sortable: true, // добавлено
    cellRenderer: checkboxCellRenderer,
    cellEditor: 'agCheckboxCellEditor',
    cellClassRules: {
      'cell-changed': (params) => params.data?.enabledChanged,
    },
  },
]);

const gridApi = ref(null);
const defaultColDef = ref({
  flex: 1,
  editable: true,
  sortable: true, // добавлено
  filter: true,
});
const editType = ref('fullRow');
const rowData = ref([]);

const onCellValueChanged = (event) => {
  const field = event.colDef.field + 'Changed';
  event.data[field] = true;
  gridApi.value.refreshCells({ rowNodes: [event.node], columns: [event.colDef.field] });
  isChanged.value = true;
};

const onRowValueChanged = (event) => {
  const data = event.data;
  console.log('onRowValueChanged: (' + data.base + ', ' + data.quote + ', ' + data.buy + ', ' + data.sell + ')');
  isChanged.value = true;
};

const onBtStopEditing = () => {
  gridApi.value.stopEditing();
};

const onBtStartEditing = () => {
  gridApi.value.setFocusedCell(1, 'base');
  gridApi.value.startEditingCell({
    rowIndex: 1,
    colKey: 'base',
  });
};

const onGridReady = (params) => {
  gridApi.value = params.api;
  gridApi.value.sizeColumnsToFit(); // Автоматически подгоняем размеры колонок
};

const addCurrencyPair = () => {
  const newPair = {
    enabled: true,
    base: 'USD',
    quote: 'EUR',
    buy: 1,
    sell: 1,
    updatedAt: new Date().toISOString(),
  };

  // Используйте метод Vue для добавления элемента в реактивный массив
  rowData.value = [...rowData.value, newPair];
  isChanged.value = true;
};

const saveChanges = () => {
  isChanged.value = false;
  const event = new CustomEvent('onSubmit', { detail: rowData.value });
  window.dispatchEvent(event);
};

const exportData = () => {
  gridApi.value.exportDataAsCsv({
    skipColumnGroupHeaders: true,
    // skipColumnHeaders: true,
    fileName: `${props.exportFileName}-${formatDateTime()}`,
    // suppressQuotes: true,
  });
};

onBeforeMount(() => {
  editType.value = 'fullRow';
  rowData.value = [...props.initialData];
});

onBeforeUnmount(() => {
  if (gridApi.value) {
    gridApi.value.destroy();
  }
});

function checkboxCellRenderer(params) {
  return params.value ? '✅' : '❌';
}

function currencyCellRenderer(params) {
  return `${getFlagByCurrency(params.value)} ${params.value}`;
}
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
