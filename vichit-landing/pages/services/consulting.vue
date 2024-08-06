<template>
  <div class="app-page-indent bg-white capitalize">
    {{ $t('consulting.title') }}
  </div>
</template>

<script>
export default {
  name: 'Consulting',
  head() {
    return this.$setupHead('consulting')
  },
}
</script>
