<template>
  <div ref="tabs" class="tabs">
    <ul class="el-menu-vertical-demo el-menu">
      <li
        v-for="(value, key) in model"
        :key="`parent-${key}`"
        class="el-menu-item"
        :class="{ 'is-active': value.isOpen }"
        @click="mainTabSelect(value, key, model)"
      >
        <i class="el-icon-menu"></i>
        <span>Navigator-main</span>
      </li>
    </ul>
    <ul class="el-menu-vertical-demo el-menu" v-if="mainMenuSelected">
      <li
        v-for="(value, key) in model[mainMenuSelected].children"
        :key="`child-${key}`"
        class="el-menu-item"
        :class="{ 'is-active': value.isOpen }"
        @click="setChild(value, key, model[mainMenuSelected].children)"
      >
        <i class="el-icon-menu"></i>
        <span>{{ mainMenuSelected }} - Navigator-sub</span>
      </li>
    </ul>

    <div class="form" v-if="isShowInput">
      Main - selected {{ mainMenuSelected }} {{ subMenuSelected }}
      <input
        type="text"
        ref="input"
        v-model="model[mainMenuSelected].children[subMenuSelected].value"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";

@Component
export default class Tabs extends Vue {
  @Ref("tabs") tabs;
  @Ref("input") input;
  model: any = {};
  mainMenuSelected = "";
  subMenuSelected = "";
  mainFocus = true;
  subFocus = false;

  get isShowInput() {
    return this.model?.[this.mainMenuSelected]?.children?.[this.subMenuSelected]
      ?.isOpen;
  }

  mainTabSelect(value, key, model: any) {
    value.isOpen = !value.isOpen;
    this.mainMenuSelected = key;
    Object.entries(model).forEach(([modelKey, value]) => {
      if (modelKey !== key) (value as any).isOpen = false;
    });
  }
  createModel() {
    const ids = Array.from({ length: 4 }, (e, i) => i + 1);
    this.model = ids.reduce((acc, cur, i) => {
      acc[`${cur}`] = {
        isOpen: false,
        children: ids.reduce((acc, cur, i) => {
          return {
            ...acc,
            [`${cur}`]: {
              isOpen: false,
              value: "",
            },
          };
        }, {} as Record<string, any>),
      };
      return acc;
    }, {} as Record<string, any>);
  }

  setChild(value, key, children) {
    if (!value) return;
    value.isOpen = !value.isOpen;
    if (value.isOpen) {
      this.subMenuSelected = key;
    }

    Object.entries(children).forEach(([modelKey, value]) => {
      if (modelKey !== key) (value as any).isOpen = false;
    });
  }

  inputHandler(e) {
    const isInput = e.target.localName === "input";
    const isEnter = e.key === "Enter";
    const isBlur = isInput && isEnter;
    const isFocus = this.subFocus && isEnter;

    if (isBlur) return this.input.blur(), true;
    if (isFocus) return this.input?.focus(), true;

    return false;
  }

  closeChildrenByMainMenu() {
    Object.values(this.model[this.mainMenuSelected].children).forEach(
      (value) => ((value as any).isOpen = false)
    );
  }

  subListHandler(e) {
    const child = this.model[this.mainMenuSelected].children[e.key];
    if (child && child.isOpen) {
      this.subMenuSelected = "";
      this.subFocus = false;
      this.closeChildrenByMainMenu();
      return;
    }
    this.setChild(child, e.key, this.model[this.mainMenuSelected].children);

    return;
  }

  mainListHandler(e) {
    const mainOption = this.model[e.key];

    if (!mainOption) return;
    if (mainOption.isOpen) {
      this.subFocus = true;
      const [key, value] = Object.entries(
        this.model[this.mainMenuSelected].children
      )[0];
      const child = value as any;
      this.subMenuSelected = key;
      child.isOpen = true;

      return;
    }
    this.mainTabSelect(mainOption, e.key, this.model);
  }

  handler(e) {
    if (this.inputHandler(e)) return;
    if (this.subFocus) return this.subListHandler(e);
    if (this.mainFocus) return this.mainListHandler(e);
  }
  mounted() {
    this.createModel();
    window.addEventListener("keypress", this.handler, true);
  }
  beforeDestroy() {
    window.removeEventListener("keypress", this.handler);
  }
  handleOpen(key, keyPath) {
    console.log("handleOpen", key, keyPath);
  }

  handleClose(key, keyPath) {
    console.log("close", key, keyPath);
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  height: 100vh;
  display: flex;
}
</style>
