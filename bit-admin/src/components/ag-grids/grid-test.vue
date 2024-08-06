<template>
  <ag-grid-vue
    class="flex-grow-1 flex-shrink-1 ag-theme-alpine"
    style="width: 100%; height: 600px"
    :columnDefs="columnDefs"
    :defaultColDef="defaultColDef"
    :rowData="rowData"
    @grid-ready="onGridReady"
  />
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-enterprise';

export default {
  components: {
    AgGridVue,
  },
  data: function () {
    const formatNumber = function formatNumber(number) {
      return Math.floor(number).toLocaleString();
    };

    return {
      columnDefs: [
        { field: 'a', enableCellChangeFlash: true },
        { field: 'b', enableCellChangeFlash: true },
        { field: 'c', cellRenderer: 'agAnimateShowChangeCellRenderer' },
        { field: 'd', cellRenderer: 'agAnimateShowChangeCellRenderer' },
        { field: 'e', cellRenderer: 'agAnimateSlideCellRenderer' },
        { field: 'f', cellRenderer: 'agAnimateSlideCellRenderer' },
      ],
      gridApi: null,
      defaultColDef: {
        flex: 1,
        cellClass: 'align-right',
        valueFormatter: (params) => {
          return formatNumber(params.value);
        },
      },
      rowData: null,
    };
  },
  created() {
    const createRowData = function createRowData() {
      var rowData = [];
      for (var i = 0; i < 20; i++) {
        rowData.push({
          a: Math.floor(((i + 323) * 145045) % 10000),
          b: Math.floor(((i + 323) * 543020) % 10000),
          c: Math.floor(((i + 323) * 305920) % 10000),
          d: Math.floor(((i + 323) * 204950) % 10000),
          e: Math.floor(((i + 323) * 103059) % 10000),
          f: Math.floor(((i + 323) * 468276) % 10000),
        });
      }
      return rowData;
    };

    this.rowData = createRowData();
    console.log(this.rowData, 123);
  },
  methods: {
    onGridReady(params) {
      // console.log(params.api);
      this.gridApi = params.api;

      const updateValues = () => {
        var rowCount = params.api.getDisplayedRowCount();
        // pick 2 cells at random to update
        for (var i = 0; i < 2; i++) {
          var row = Math.floor(Math.random() * rowCount);
          var rowNode = params.api.getDisplayedRowAtIndex(row);
          var col = ['a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 6)];
          rowNode?.setDataValue(col, Math.floor(Math.random() * 10000));
        }
      };
      setInterval(updateValues, 250);
    },
  },
};
</script>
