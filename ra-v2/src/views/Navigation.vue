<template>
  <nav
    class="main-navigation"
    :class="{
      close: !toggle,
    }"
  >
    <div class="title-nav">
      <toggle-button v-model="toggle" />
      <div class="logo" v-show="toggle">Navigation</div>
    </div>
    <ul>
      <router-link v-show="toggle" :to="{ name: 'Home' }" tag="li" exact
        >Form</router-link
      >
    </ul>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ToggleButton from "@/components/ToggleButton.vue";
@Component({
  components: {
    ToggleButton,
  },
})
export default class Navifation extends Vue {
  toggle = true;
}
</script>

<style lang="scss" scoped>
.title-nav {
  display: flex;
  align-items: center;
  padding: 8px;
}
.main-navigation {
  width: 240px;
  overflow: hidden;
  transition: 0.2s;
  background-color: #005a9e;
  color: #fff;
  &.close {
    width: 58px;
  }
  li {
    padding: 8px;
  }
  &::v-deep {
    .router-link-active {
      list-style: none;
      background: #053d67;
    }
  }

  .logo {
    height: 60px;
    padding: 0 10px;
    font-size: 24px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
  }
}
</style>
