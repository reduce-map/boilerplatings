<template>
  <div class="vt-card">
    <div v-if="$slots.title" class="title">
      <slot name="title" />
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VtCard',
}
</script>

<style lang="scss">
// bg got this card is need to be #ddd
.vt-card {
  transition: 0.6s ease;
  transition-delay: 0.15s;
  padding: 16px 26px 12px;
  border-radius: 1rem;

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
    box-shadow: 20px 20px 60px #bbb, -20px -20px 60px #fff;
    background: #ddd;
  }
}
</style>
