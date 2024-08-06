<template>
  <div class="my-grid">
    <ag-grid-vue
        class="ag-theme-alpine"
        style="width: 100%; height: 400px;"

        :columnDefs="gridOptions.columnDefs"
        :rowData="gridOptions.rowData"
        :defaultColDef="gridOptions.defaultColDef"
        :autoSizeStrategy="gridOptions.autoSizeStrategy"

    />
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { AgGridVue } from '@ag-grid-community/vue3';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Регистрация модуля
ModuleRegistry.registerModules([ClientSideRowModelModule]);


import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';

export default defineComponent({
  components: {
    AgGridVue,
  },
  setup() {
    const gridOptions = reactive({
      columnDefs: [
        { headerName: "Make", field: "make" },
        { headerName: "Model", field: "model" },
        { headerName: "Price", field: "price" }
      ],
      rowData: [
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxster", price: 72000 }
      ],
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true
      },
      autoSizeStrategy: {
        type: 'fitGridWidth',
        defaultMinWidth: 100,
        columnLimits: [
          {
            colId: 'make',
            minWidth: 150
          },
          {
            colId: 'model',
            minWidth: 150
          },
          {
            colId: 'price',
            minWidth: 150
          }
        ]
      }
    });

    return {
      gridOptions
    };
  }
});
</script>

<style scoped>
.my-grid {
  width: 100%;
  height: 100%;
}
</style>
