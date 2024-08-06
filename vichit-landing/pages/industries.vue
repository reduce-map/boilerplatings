<template>
  <div class="app-page-indent bg-white">
    <div class="p-4 app-page-wrapper flex flex-col justify-between capitalize">
      <h1>{{ $t('industries') }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Industries',
  data() {
    return {
      breadcrumbs: [
        {
          text: this.$t('home'),
          path: 'index',
        },
        {
          text: this.$t('industries'),
        },
      ],
    }
  },
  head() {
    return this.$setupHead('industries')
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .img-container-svg {
    height: 52%;
    width: 60%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    clip-path: none;

    svg {
      height: 100% !important;
      width: 100% !important;
    }
  }
}

.hexagon-tech-bg {
  background: rgba(var(--vichit-grey-rgb), 0.15);
}
</style>
