<template>
  <div>
    <div>
      <router-link :to="{ name: 'element-ui' }">Element UI</router-link> |
      <router-link :to="{ name: 'fluent-ui' }">Fluent UI</router-link> |
      <router-link :to="{ name: 'Tabs' }">Tabs </router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import elementUI from "./elementUI.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "element-ui": elementUI,
  },
})
export default class App extends Vue {}
</script>
