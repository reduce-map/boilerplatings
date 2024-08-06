<template>
  <div class="court-locations">
    <header>
      <h1>Heading</h1>
    </header>
    <div class="location-main">
      <div class="form-inputs">
        <div>
          <el-input
            v-model="formModel.postCode"
            value="postCode"
            class="input-postcode"
            :trigger-on-focus="false"
            :debounce="500"
            placeholder="postCode"
          />

          <el-input
            v-model="formModel.city"
            :trigger-on-focus="false"
            class="input-city"
            :debounce="500"
            placeholder="city"
          />

          <el-input
            v-model="formModel.street"
            :trigger-on-focus="false"
            class="input-street"
            :debounce="500"
            placeholder="street"
          />
        </div>
        <el-button type="primary"> Start </el-button>
      </div>
      <filter-location
        v-model="filter"
        @on-toggle="toggle = $event"
        @input="filterData"
      />

      <div class="list-wrapper">
        <div
          class="list-element"
          v-for="(row, i) in mockData"
          :key="`row-${i}`"
        >
          <div class="list-title">
            {{ row[0] && row[0].title }}
            <div class="line" />
          </div>

          <transition-group name="list" tag="div" class="cards">
            <widget
              class="box-card"
              v-for="value in row"
              :key="value.key"
              :value="value"
            />
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import FilterLocation from "@/components/FilterLocation.vue";
import Widget from "@/components/Widget.vue";
import { getData } from "./mockService";

@Component({
  components: {
    FilterLocation,
    Widget,
  },
})
export default class Location extends Vue {
  filter: Partial<Record<string, string>> = {};
  toggle = true;
  formModel = {
    postCode: "",
    street: "",
    city: "",
  };

  mockData: Record<string, string | boolean>[][] = [];
  originalData: Record<string, string | boolean>[][] = [];

  includeString(first = "", second = ""): boolean {
    return new RegExp(first, "ig").test(second);
  }

  isValidName(first_name = "", last_name = ""): boolean {
    return (
      this.includeString(this.filter.searchByName, first_name) ||
      this.includeString(this.filter.searchByName, last_name)
    );
  }

  isValidData({
    first_name,
    last_name,
    city,
  }: Record<string, string | boolean>): boolean {
    const isCityValid = this.includeString(
      (this.filter.searchByCity as string) ?? "",
      (city as string) ?? ""
    );

    return (
      this.isValidName(
        (first_name as string) ?? "",
        (last_name as string) ?? ""
      ) && isCityValid
    );
  }

  filterData(): void {
    this.mockData = [];
    this.renderLargeData();
  }

  renderLargeData(): void {
    this.originalData.reduce((acc, row, i) => {
      return acc.then(() => {
        const newRow: Record<string, string | boolean>[] = [];
        this.mockData.push(newRow);
        setTimeout(() => {
          row.reduce((acc, el, i2) => {
            return this.isValidData(el)
              ? acc.then(() => {
                  setTimeout(() => {
                    newRow.push(el);
                  }, 45 * (i + 1 + i2));
                })
              : acc;
          }, Promise.resolve());
        }, 50 * (i + 1));
      });
    }, Promise.resolve());
  }

  async mounted(): Promise<void> {
    this.originalData = await getData();
    this.renderLargeData();
  }
}
</script>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.list-element {
  margin: 8px;
}
.box-card {
  max-width: 120px;
  min-width: 120px;
}
.cards {
  display: flex;
  flex-wrap: wrap;

  & > div {
    width: 20%;
  }
}
.list-title {
  display: flex;
  white-space: nowrap;
}
.line {
  position: relative;
  text-align: left;
  height: auto;
  width: 100%;
  overflow: hidden;
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border: 1px dashed #787675;
    width: 100%;
    left: 14px;
  }
}
.open-filter {
  width: calc(100% - 224px);
  transition: 0.5s;
}

.close-filter {
  width: calc(100% - 36px);
  transition: 0.5s;
}
.form-inputs {
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #c8c6c4;
}

.input-postcode {
  width: 120px;
  margin-right: 8px;
}
.input-street,
.input-city {
  width: 220px;
  margin-right: 8px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #c8c6c4;
  padding: 0 12px;
  background-color: #004578;
  h1 {
    color: #fff;
  }
}
.collapse-item::v-deep {
  .collapse-item-title {
    border: none !important;
    box-shadow: none !important;
    padding-left: 16px !important;
  }

  .el-collapse-item__content {
    padding: 8px 0 !important;
  }

  .el-collapse-item__header {
    .collapse-title {
      color: #323130;
      font-weight: 400;
    }

    &:hover {
      background: #f3f2f1;
      .collapse-title {
        color: #201f1e;
      }
    }

    &:focus {
      background: #edebe9;
    }
  }
}

::v-deep {
  .el-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

::v-deep .el-input__inner {
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  border: 1px solid #605e5c;
  border-radius: 2px;
  background: #ffffff;
  &:focus {
    border: 1px solid #0078d4;
  }
}

::v-deep .el-button--primary {
  border: 2px solid #0078d4;
  padding: 0px 16px;
  border-radius: 2px;
  min-width: 80px;
  height: 32px;
  background-color: #0078d4;
  color: #ffffff;
  display: flex;
  justify-content: center;

  &:focus {
    border: 2px solid #0078d4;
    padding: 0px 16px;
    border-radius: 2px;
    min-width: 80px;
    height: 32px;
    background-color: #0078d4;
    color: #ffffff;
  }

  &:hover {
    background-color: #106ebe;
    border: 2px solid #106ebe;
    color: #ffffff;
  }

  &:active {
    background-color: #005a9e;
    border: 2px solid #005a9e;
    color: #ffffff;
  }
  &:disabled {
    border: 2px solid #f3f2f1;
    cursor: default;
    background-color: #f3f2f1;
    color: #a19f9d;
  }
}

.ram-collapse-item::v-deep .el-collapse-item__content > div {
  display: flex;
  flex-wrap: wrap;
  margin: -0.25rem;
}

.court-location-widget::v-deep {
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  flex: 1 1 auto;
  padding: 0.5rem;
  margin: 0.25rem;
}

@media print {
  .ram-window::v-deep {
    .ram-window__header,
    .ram-window__footer {
      display: none !important;
    }
  }
  .ram-window::v-deep .el-collapse-item {
    page-break-inside: avoid;
    &__header {
      border-bottom: none !important;
    }
    &__arrow {
      display: none !important;
    }
    &__wrap {
      display: block !important;
    }
  }
}
</style>
