<template>
  <div class="home">
    <location />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Location from "@/components/Location.vue";
@Component({
  components: {
    Location,
  },
})
export default class Home extends Vue {}
</script>
