<template>
  <div>
    <div class="filter-wrapper">
      <div class="input-wrapper">
        <vnt-input placeholder="PLZ" class="input-plz" v-model="filter.plz" />
        <vnt-input placeholder="Ort" class="input-ort" v-model="filter.ort" />
        <vnt-input
          placeholder="StraBe"
          class="input-stra-be"
          v-model="filter.stra"
        />
      </div>
      <vnt-button primary>Start</vnt-button>
    </div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        v-for="(category, i) in categories"
        :key="i"
        :title="category.name"
        :name="`${i}`"
      >
        <div class="card-wrapper">
          <div class="card-collection">
            <el-card
              class="box-card"
              v-for="(el, i) in category.cards"
              :key="`card-${i}`"
            >
              <div>
                {{ el.name }}:
                <a href="#" class="microsoft-link">{{ el.index }}</a>
              </div>
              <div>
                {{ el.fullName }}
              </div>
              <div>
                {{ el.address }}
                <vnt-button>Location</vnt-button>
              </div>

              <div>Tel: {{ el.tel }}</div>

              <div>Fax: {{ el.fax }}</div>

              <div>
                Korrespondenzanwalt:
                <vnt-input
                  placeholder="Korrespondenzanwalt"
                  v-model="el.correspondenceAddress"
                  class="microsoft-input"
                  @input="
                    onChangeCorrespondenceId(el, el.correspondenceAddress)
                  "
                />
              </div>

              <div v-if="el.correspondence">
                <div>
                  {{ el.correspondence.name }}
                </div>
                <div>
                  {{ el.correspondence.address }}
                </div>
                <div>
                  Tel: {{ el.correspondence.tel }} Fax:
                  {{ el.correspondence.fax }}
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
  filter = {
    plz: "",
    ort: "",
    stra: "",
  };
  activeNames = ["0"];
  correspondences = [
    {
      index: 39307,
      name: "Dr. Steven Hawking",
      address: "Littenstr. 12-17 10179 Berlin",
      tel: "0111111111",
      fax: "0111111111",
    },
  ];
  categories = [
    {
      name: "Ordentliche gerichtsbarkeiten",
      cards: Array.from({ length: 5 }, () => ({
        name: "Landgericht",
        fullName: "LandgerichtBerlin",
        address: "Littenstr. 12-17 10179 Berlin",
        tel: "0111111111",
        fax: "0111111111",
        index: 91026,
        correspondenceAddress: 39307,
        correspondence: null,
      })),
    },
  ];

  handleChange(val) {
    console.log(val);
  }

  onChangeCorrespondenceId(
    el: App["categories"][number]["cards"][number],
    correspondenceAddress: string | number
  ): void {
    el.correspondence = this.correspondences.find(
      ({ index }) => `${index}` === `${correspondenceAddress}`
    );
  }
}
</script>

<style lang="scss" scoped>
.filter-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
}

.input-wrapper {
  display: flex;
  justify-content: space-between;
}

.input-plz {
  width: 150px;
}
.input-stra-be,
.input-ort {
  width: 300px;
  margin-left: 16px;
}
.card-wrapper {
  margin-bottom: 20px;
}

.card-collection {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}

.box-card {
  margin: 0 20px 20px 0;
  width: 22%;
}
</style>
