<template>
  <!--  <div class="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">-->
  <!--  <div class="mx-auto max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">-->
  <div class="">
    <div class="w-100 flex-grow-1 flex-shrink-1">
      <div style="padding: 4px">
        <div style="float: right" class="d-flex">
          <input
            class="mr-2 form-control d-inline-block"
            @keyup="onQuickFilterChanged"
            type="text"
            id="quickFilterInput"
            placeholder="Type text to filter..."
          />
          <button
            class="btn btn-primary mr-2"
            :disabled="!showGrid"
            @click="showGrid = false"
            style="white-space: nowrap"
          >
            Destroy Grid
          </button>
          <button class="btn btn-primary" :disabled="showGrid" @click="showGrid = true" style="white-space: nowrap">
            Create Grid
          </button>
        </div>
        <div>
          <b>Invoices Details</b>
          {{ rowCount }}
        </div>
      </div>
      <div style="clear: both"></div>
      <div v-if="showGrid" class="d-flex flex-column flex-grow-1 flex-shrink-1">
        <div style="padding: 4px" class="btn-toolbar">
          <span>
            Grid API:
            <button class="btn btn-primary mx-1" @click="api.selectAll()">Select All</button>
            <button class="btn btn-primary mx-1" @click="api.deselectAll()">Clear Selection</button>
          </span>
          <!--        <span style="margin-left: 20px">-->
          <!--          Column API:-->
          <!--          <button class="btn btn-primary mx-1" @click="api.setColumnsVisible(['country'], false)">-->
          <!--            Hide Country Column-->
          <!--          </button>-->
          <!--          <button class="btn btn-primary mx-1" @click="api.setColumnsVisible(['country'], true)">-->
          <!--            Show Country Column-->
          <!--          </button>-->
          <!--        </span>-->
        </div>
        <div class="btn-toolbar d-flex align-items-center py-2">
          <label class="m-0">
            <input type="checkbox" v-model="sideBar" />
            Show Side Bar
          </label>
          <button class="btn btn-primary mx-1" @click="createRowData()">Refresh Data</button>
        </div>
        <!--          class="flex-grow-1 flex-shrink-1 ag-theme-quartz-dark"-->
        <ag-grid-vue
          style="width: 100%; height: 500px"
          class="flex-grow-1 flex-shrink-1 ag-theme-alpine"
          :columnDefs="columnDefs"
          :rowData="rowData"
          :sideBar="sideBar"
          :defaultColDef="defaultColDef"
          :groupHeaders="true"
          :enableRangeSelection="true"
          :suppressRowClickSelection="true"
          rowSelection="multiple"
          :tooltipShowDelay="0"
          :tooltipInteraction="true"
          :undoRedoCellEditing="undoRedoCellEditing"
          :undoRedoCellEditingLimit="undoRedoCellEditingLimit"
          :autoGroupColumnDef="autoGroupColumnDef"
          @grid-ready="onReady"
          @cell-clicked="onCellClicked"
          @cell-double-clicked="onCellDoubleClicked"
          @cell-context-menu="onCellContextMenu"
          @cell-value-changed="onCellValueChanged"
          @cell-focused="onCellFocused"
          @row-selected="onRowSelected"
          @selection-changed="onSelectionChanged"
          @filter-modified="onFilterModified"
          @virtual-row-removed="onVirtualRowRemoved"
          @row-clicked="onRowClicked"
          @column-everything-changed="onColumnEvent"
          @column-row-group-changed="onColumnEvent"
          @column-value-Changed="onColumnEvent"
          @column-moved="onColumnEvent"
          @column-visible="onColumnEvent"
          @column-group-Opened="onColumnEvent"
          @column-resized="onColumnEvent"
          @column-pinned-count-changed="onColumnEvent"
        >
        </ag-grid-vue>
      </div>
    </div>
  </div>
  <!--  </div>-->
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-enterprise';

// import { ProficiencyFilter } from './proficiencyFilter';
// import { SkillFilter } from './skillFilter';
import DateComponent from './DateComponent.vue';
import HeaderGroupComponent from './HeaderGroupComponent.vue';
import RefData from './refData';
import CustomTooltip from './CustomTooltip.vue';
import ClientService from '@/services/exchanger-service';

export default {
  data() {
    return {
      gridOptions: null,
      api: null,
      columnDefs: null,
      rowData: null,
      showGrid: false,
      sideBar: false,
      rowCount: null,
      autoGroupColumnDef: null,
      defaultColDef: {
        // sortable: true,
        // resizable: true,
        // filter: true,
        flex: 1,
        cellClass: 'align-right',
        enableCellChangeFlash: true,

        // flex: 1,
        // minWidth: 150,
        // cellRenderer: "agAnimateShowChangeCellRenderer",
      },
      undoRedoCellEditing: true, // enable undo/redo
      undoRedoCellEditingLimit: 2, // undo/redo stack size
    };
  },
  components: {
    AgGridVue,
    // eslint-disable-next-line
    agDateInput: DateComponent,
    CustomTooltip: CustomTooltip,
  },
  methods: {
    async createRowData() {
      const { data } = await ClientService.getExchangesList();
      // console.log(data);
      this.rowData = data;
    },
    createColumnDefs() {
      this.columnDefs = [
        // {
        //   headerName: 'Somethign',
        //   minWidth: 60,
        //   width: 60,
        //   checkboxSelection: false,
        //   sortable: true,
        //   suppressMenu: true,
        //   pinned: true,
        // },
        {
          headerName: 'Info',
          headerGroupComponent: HeaderGroupComponent,
          children: [
            {
              headerName: 'Base',
              field: 'baseCurrency',
              width: 160,
              pinned: true,
              headerTooltip: 'Base Currency',
              tooltipShowDelay: 0,
            },
            {
              headerName: 'Quote',
              field: 'quoteCurrency',
              width: 160,
              pinned: true,
              headerTooltip: 'Quote Currency',
            },
          ],
        },
        {
          headerName: 'Retail | Розница',
          headerGroupComponent: HeaderGroupComponent,
          children: [
            {
              headerName: 'Buy | Покупка',
              field: 'retailBuyRate',
              tooltipComponent: 'CustomTooltip',
              tooltipValueGetter: (params) => {
                return {
                  value: params.value,
                  valueUpdatedAt: params.data?.retailBuyRateUpdatedAt,
                  prevValue: params.data?.retailBuyPrevValue,
                  prevValueUpdatedAt: params.data?.retailBuyPrevUpdatedAt,
                };
              },
              editable: true,
              filter: 'agNumberColumnFilter',
            },
            {
              headerName: 'Sell | Продажа',
              field: 'retailSellRate',
              editable: true,
              filter: 'agNumberColumnFilter',
            },
          ],
        },
        {
          headerName: 'Wholesale',
          headerGroupComponent: HeaderGroupComponent,
          children: [
            {
              headerName: 'Buy | Покупка',
              field: 'wholesaleBuyRate',
              editable: true,
              filter: 'agNumberColumnFilter',
            },
            {
              headerName: 'Sell | Продажа',
              field: 'wholesaleSellRate',
              editable: true,
              filter: 'agNumberColumnFilter',
            },
            {
              headerName: 'Min Amount | Минимальная сумма',
              field: 'wholesaleMinAmount',
              editable: true,
              enableCellChangeFlash: true,
              filter: 'agTextColumnFilter',
            },
          ],
        },
      ];
    },
    dateCellRenderer: (params) => {
      const date = new Date(params.value);

      const pad = (num, totalStringSize) => {
        let asString = num + '';
        while (asString.length < totalStringSize) asString = '0' + asString;
        return asString;
      };

      if (!date) return '';
      return pad(date?.getDate(), 2) + '/' + pad(date?.getMonth() + 1, 2) + '/' + date?.getFullYear();
    },

    onReady(params) {
      console.log('onReady');

      this.api = params.api;
      this.api.sizeColumnsToFit();
    },

    onCellClicked(event) {
      console.log('onCellClicked: ' + event.rowIndex + ' ' + event.colDef.field);
    },

    onCellValueChanged(event) {
      console.log('onCellValueChanged: ' + event.oldValue + ' to ' + event.newValue);
    },

    onCellDoubleClicked(event) {
      console.log('onCellDoubleClicked: ' + event.rowIndex + ' ' + event.colDef.field);
    },

    onCellContextMenu(event) {
      console.log('onCellContextMenu: ' + event.rowIndex + ' ' + event.colDef.field);
    },

    onCellFocused(event) {
      console.log('onCellFocused: (' + event.rowIndex + ',' + event.colIndex + ')');
    },

    // taking out, as when we 'select all', it prints to much to the console!!
    // eslint-disable-next-line
    onRowSelected(event) {
      // console.log('onRowSelected: ' + event.node.data.name);
    },

    onSelectionChanged() {
      console.log('selectionChanged');
    },

    onFilterModified() {
      console.log('onFilterModified');
    },

    // eslint-disable-next-line
    onVirtualRowRemoved(event) {
      // because this event gets fired LOTS of times, we don't print it to the
      // console. if you want to see it, just uncomment out this line
      // console.log('onVirtualRowRemoved: ' + event.rowIndex);
    },

    onRowClicked(event) {
      console.log('onRowClicked: ' + event.node.data.name);
    },

    onQuickFilterChanged(event) {
      this.api.setQuickFilter(event.target.value);
    },

    // here we use one generic event to handle all the column type events.
    // the method just prints the event name
    onColumnEvent(event) {
      console.log('onColumnEvent: ' + event);
    },
  },
  async beforeMount() {
    await this.createRowData();
    this.createColumnDefs();
    this.showGrid = true;
  },
  created() {
    // this.autoGroupColumnDef = {
    // headerName: 'Base',
    // headerName: 'Info',
    // minWidth: 190,
    // tooltipValueGetter: (params) => {
    //   console.log(1)
    //   const count = params.node && params.node.allChildrenCount;
    //   if (count != null) {
    //     return "Tooltip text - " + params.value + " (" + count + ")";
    //   }
    //   return params.value;
    // },
    // };
  },
};

function countryCellRenderer(params) {
  let flag =
    "<img border='0' width='15' height='10' style='margin-bottom: 2px' src='https://www.ag-grid.com/example-assets/flags/" +
    RefData.COUNTRY_CODES[params.value] +
    ".png'>";
  return flag + ' ' + params.value;
}

function percentCellRenderer(params) {
  let value = params.value;

  let eDivPercentBar = document.createElement('div');
  eDivPercentBar.className = 'div-percent-bar';
  eDivPercentBar.style.width = value + '%';
  if (value < 20) {
    eDivPercentBar.style.backgroundColor = 'red';
  } else if (value < 60) {
    eDivPercentBar.style.backgroundColor = '#ff9900';
  } else {
    eDivPercentBar.style.backgroundColor = '#00A000';
  }

  let eValue = document.createElement('div');
  eValue.className = 'div-percent-value';
  eValue.innerHTML = value + '%';

  let eOuterDiv = document.createElement('div');
  eOuterDiv.className = 'div-outer-div';
  eOuterDiv.appendChild(eValue);
  eOuterDiv.appendChild(eDivPercentBar);

  return eOuterDiv;
}
</script>

<style>
.ag-cell {
  padding-top: 2px !important;
  padding-bottom: 2px !important;
}

label {
  font-weight: normal !important;
}

.div-percent-bar {
  display: inline-block;
  height: 100%;
  position: relative;
  z-index: 0;
}

.div-percent-value {
  position: absolute;
  padding-left: 4px;
  font-weight: bold;
  font-size: 13px;
  z-index: 100;
}

.div-outer-div {
  display: inline-block;
  height: 100%;
  width: 100%;
}

.ag-menu {
  z-index: 200;
}

.toolbar button {
  margin-left: 5px;
  margin-right: 5px;
  padding: 2px;
}
</style>
