<template>
  <div class="vt-card-bordered">
    <div class="line line-top"></div>
    <div class="line line-bottom"></div>
    <div class="line line-right"></div>
    <div class="line line-left"></div>
    <div class="card-wrapper">
      <div v-if="$slots.title" class="title">
        <slot name="title" />
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VtCardBordered',
}
</script>

<style lang="scss" scoped>
.vt-card-bordered {
  @apply relative overflow-hidden;
  padding: 2px;

  .line {
    @apply absolute;

    &:after,
    &:before {
      background: #eee;
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    &:after {
      @apply transition-transform duration-200 ease-in-out;
      background: #000;
      transform: translateX(-110%);
    }
  }

  .line-top {
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }

  .line-bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }

  .line-right {
    left: auto;
    top: auto;
    bottom: 0;
    right: 0;
    width: 2px;
    height: 100%;

    &:after {
      background: #000;
      transform: translateX(0) translateY(110%);
    }
  }

  .line-left {
    bottom: 0;
    left: 0;
    width: 2px;
    height: 100%;

    &:after {
      background: #000;
      transform: translateX(0) translateY(110%);
    }
  }

  .card-wrapper {
    position: relative;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    padding: 24px 26px;
    border-bottom: 1px solid #8f8f8f;
    letter-spacing: 0.4px;
    min-height: 170px;
    display: flex;
    align-items: center;
    align-content: center;
    text-align: center;
    width: 100%;
  }

  .content {
    padding: 24px 26px;
    letter-spacing: 0.2px;
  }

  &:hover {
    .line-left,
    .line-right {
      &:after {
        transform: translateX(0) translateY(0);
      }
    }

    .line-bottom,
    .line-top {
      &:after {
        transform: translateX(0) translateY(0);
      }
    }
  }
}
</style>
