<template>
  <div
    class="container"
    :class="{ change: isToggle }"
    @click="isToggle = !isToggle"
  >
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, ModelSync } from "vue-property-decorator";
@Component
export default class ToggleButton extends Vue {
  @ModelSync("value", "input", { type: Boolean })
  isToggle!: boolean;
}
</script>

<style lang="scss" scoped>
.container {
  display: inline-block;
  cursor: pointer;
}

.bar1,
.bar2,
.bar3 {
  width: 35px;
  height: 5px;
  background-color: #fff;
  margin: 6px 0;
  transition: 0.4s;
}

.change .bar1 {
  -webkit-transform: rotate(-45deg) translate(-9px, 6px);
  transform: rotate(-45deg) translate(-9px, 6px);
}

.change .bar2 {
  opacity: 0;
}

.change .bar3 {
  -webkit-transform: rotate(45deg) translate(-8px, -8px);
  transform: rotate(45deg) translate(-8px, -8px);
}
</style>
