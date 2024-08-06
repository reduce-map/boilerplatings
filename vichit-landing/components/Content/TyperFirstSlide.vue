<template>
  <div class="uppercase mb-12">
    <vt-heading :level="2">
      <span
        class="
          block
          uppercase
          leading-normal
          relative
          text-center
          sm:text-left
          text-3xl
          sm:text-4xl
        "
      >
        {{ $t('firstSlide.landingTyper.prefix') }}
        <span class="hidden sm:inline">:</span>
      </span>
      <div class="typer-wrapper">
        <client-only>
          <vue-typer
            v-if="showTyper"
            class="
              block
              uppercase
              leading-normal
              text-center
              sm:text-left
              text-3xl
              sm:text-4xl
            "
            caret-animation="smooth"
            :text="$t('firstSlide.landingTyper.textList')"
            :pre-erase-delay="1250"
            :erase-delay="400"
          />
        </client-only>
      </div>
    </vt-heading>
  </div>
</template>

<script>
export default {
  name: 'Typer',
  props: {
    showTyper: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.typer-wrapper {
  min-height: 90px;
}
.vue-typer {
  .char.typed {
    color: var(--vichit-coral);
  }
  .char.selected {
    background-color: var(--vichit-coral);
    color: var(--vichit-purple);
  }
  .custom.caret {
    background-color: rgba(var(--vichit-coral-rgb), 0.65);
    margin-left: 5px;
    width: 5px;
  }
}
</style>
