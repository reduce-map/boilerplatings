<template>
  <div class="custom-tooltip bg-neutral-200 p-3">
    <!--    <div :class="'panel panel-' + type">-->
    <div class="panel">
      <!--      <div class="panel-heading">-->
      <!--        <h3 class="panel-title">{{ country }}</h3>-->
      <!--      </div>-->
      <!--      <form class="panel-body" @submit="onFormSubmit($event)">-->
      <!--        <div class="form-group">-->
      <!--          <input type="text" class="form-control" id="name" placeholder="Name" autocomplete="off" :value="athlete" @focus="$event.target.select()" />-->
      <!--          <button type="submit" class="btn btn-primary">Submit</button>-->
      <!--        </div>-->
      <!--        <p>Total: {{total}}</p>-->
      <!--      </form>-->

      <div class="custom-tooltip">
        <span>
          <span v-if="isPositive" class="text-green-400">▲</span>
          <span v-if="isNegative" class="text-red-400">▼</span>
        </span>

        {{ diffPercentage }} % (equal to {{ diff }})
        <!--        {{ value }}-->
        <!--        {{ valueUpdatedAt }}-->
        <!--        {{ prevValue }}-->
        <!--        {{ prevValueUpdatedAt}}-->
      </div>
    </div>
  </div>
  `
</template>

<script>
export default {
  function() {
    return {
      value: null,
      valueUpdatedAt: null,
      prevValue: null,
      prevValueUpdatedAt: null,
      diff: null,
    };
  },
  computed: {
    isPositive() {
      return this.diff > 0;
    },
    isNegative() {
      return this.diff < 0;
    },
    isSame() {
      return this.diff === 0;
    },
    diff() {
      // to 2 decimal places
      return Number(Math.abs(this.value - this.prevValue).toFixed(3));
    },
    diffPercentage() {
      return Math.abs(((this.value - this.prevValue) * 100) / this.prevValue).toFixed(3);
    },
  },
  beforeMount() {
    const data = this.params.api.getDisplayedRowAtIndex(this.params.rowIndex)?.data;
    console.log(data, this.params);

    const { value } = this.params;

    this.value = value.value || 'N/A';
    this.valueUpdatedAt = value.valueUpdatedAt || 'N/A';
    this.prevValue = value.prevValue || 'N/A';
    this.prevValueUpdatedAt = value.prevValueUpdatedAt || 'N/A';

    // this.type = this.params?.type || 'primary';
    // this.athlete = data?.athlete || 'N/A';
    // this.country = data?.country || 'N/A'
    // this.total = data?.total || 'N/A';
  },
  methods: {
    onFormSubmit(e) {
      e.preventDefault();
      const { params } = this;
      const { node } = params;

      const target = e.target.querySelector('input');

      if (target.value) {
        node.setDataValue('athlete', target.value);
        if (this.params.hideTooltipCallback) {
          this.params.hideTooltipCallback();
        }
      }
    },
  },
};
</script>
