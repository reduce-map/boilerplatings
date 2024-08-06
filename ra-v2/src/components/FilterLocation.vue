<template>
  <div class="filter">
    <el-input
      v-model="formModel.searchByName"
      placeholder="Search by name"
      @input="onInput"
    />
    <el-input
      v-model="formModel.searchByCity"
      placeholder="Search by city"
      @input="onInput"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Component, ModelSync, Emit } from "vue-property-decorator";
import ToggleButton from "@/components/ToggleButton.vue";
type FormModel = {
  postCode: string;
  street: string;
  city: string;
  search: string;
};
@Component({
  components: {
    ToggleButton,
  },
})
export default class FilterLocation extends Vue {
  @ModelSync("value", "input", {
    type: Object,
    default: () => ({
      searchByName: "",
      searchByCity: "",
    }),
  })
  formModel!: FormModel;

  @Emit("input")
  onInput(): FormModel {
    return this.formModel;
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-input {
    margin: 8px 8px 8px 0;
    max-width: 192px;
  }
}
h3 {
  margin: 0;
}

.filter {
  border-bottom: 1px solid #c8c6c4;
  display: flex;
  justify-content: flex-start;
  padding: 0 12px;
}
</style>
