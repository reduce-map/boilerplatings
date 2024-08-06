<template>
  <div class="court-location-widget is-flex flex-col">
    <div class="title">
      name: {{ value.first_name }} <br />
      <a href="#"> {{ value.id }} </a>
    </div>
    <div>
      <div class="is-flex flex-col">
        <div class="flex-1 is-flex-centered">{{ value.last_name }}</div>
        <div class="flex-1">City: {{ value.city }}</div>
      </div>
      <div class="is-flex-centered">
        <div class="m-r-md">
          <div>{{ value.street }}</div>
          <div>{{ value.postCode }}</div>
        </div>
      </div>
      <div>Tel: {{ value.phone }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Widget extends Vue {
  @Prop({
    type: Object,
    default: () => ({}),
  })
  value!: Partial<Record<string, string>>;
}
</script>

<style lang="scss" scoped>
.title {
  white-space: normal;
}
.address-link {
  margin-left: 0.5rem;
  cursor: pointer;
}
.ram-address-search {
  max-width: 165px;
}

.court-location-widget {
  background-color: #fff;
  border: 2px solid #c8c6c4 !important;

  &:hover {
    border: 2px solid #b4b2b0 !important;
  }
}

.address-link {
  color: #0078d4;
  &:hover {
    color: #004578;
  }
}
</style>
