<template>
  <button
    class="vt-btn ease-in-out transition-all p-4"
    :class="{
      'vt-btn--open': open,
      'vt-btn--purple': !isWhite,
    }"
    type="button"
    @click="$emit('click')"
  >
    <span class="shape-holder">
      <span></span>
      <span></span>
      <span></span>
    </span>

    <span class="sr-only">{{ $t('Open navigation') }}</span>
  </button>
</template>

<script>
export default {
  name: 'VtBurgerBtn',

  props: {
    open: {
      type: Boolean,
      default: false,
    },
    isWhite: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.vt-btn {
  .shape-holder {
    display: block;
    width: 39px;
    height: 30px;
    position: relative;
    transform: rotate(0deg);

    span:nth-child(1) {
      top: 0;
    }
    span:nth-child(2) {
      top: 13px;
    }
    span:nth-child(3) {
      top: 26px;
    }
    span {
      background: var(--vichit-bg-crystal-cut);
      display: block;
      position: absolute;
      height: 4px;
      width: 100%;
      border-radius: 4px;
      opacity: 1;
      left: 0;
      transform: rotate(0deg);
      transition: 0.25s ease-in-out;
    }
  }

  &--purple {
    .shape-holder {
      span {
        background: var(--vichit-purple);
      }
    }
  }

  &--open {
    .shape-holder {
      span {
        background: var(--vichit-purple);
      }
      span:nth-child(1) {
        top: 14px;
        transform: rotate(135deg);
      }
      span:nth-child(2) {
        opacity: 0;
        left: 44px;
      }
      span:nth-child(3) {
        top: 14px;
        transform: rotate(-135deg);
      }
    }
  }
}
</style>
