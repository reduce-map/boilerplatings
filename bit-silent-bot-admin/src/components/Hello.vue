<script setup lang="ts">
import { ref } from "vue";
import { Progress, Card, CellGroup, Cell, Badge, Switch } from "view-ui-plus";

const switchValue = ref(true);
</script>

<template>
  <div>
    <!-- Progress Bars Section -->
    <div style="height: 100px">
      <Progress vertical :percent="25" />
      <Progress vertical :percent="45" status="active" />
      <Progress vertical :percent="65" status="wrong" />
      <Progress vertical :percent="100" />
      <Progress vertical :percent="25" hide-info />
    </div>

    <!-- Card with Cells Section -->
    <div style="padding: 10px; background: #f8f8f9">
      <Card
        title="Options"
        icon="ios-options"
        :padding="0"
        shadow
        style="width: 300px"
      >
        <CellGroup>
          <!--          <Cell title="Only show titles" />-->
          <!--          <Cell title="Display label content" label="label content" />-->
          <!--          <Cell title="Display right content" extra="details" />-->
          <!--          <Cell title="Link" extra="details" to="/view-ui-plus/component/base/button" />-->
          <!--          <Cell title="Open link in new window" to="/view-ui-plus/component/base/button" target="_blank" />-->
          <!--          <Cell title="Disabled" disabled />-->
          <!--          <Cell title="Selected" selected />-->
          <Cell
            title="With Badge"
            to="/view-ui-plus/component/navigation/badge"
          >
            <template #extra>
              <Badge :count="10" />
            </template>
          </Cell>
          <Cell title="With Switch">
            <template #extra>
              <Switch v-model="switchValue" />
            </template>
          </Cell>
        </CellGroup>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.stop-button {
  margin-right: 20px;
}
</style>
