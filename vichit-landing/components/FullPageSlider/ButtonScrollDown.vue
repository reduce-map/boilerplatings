<template>
  <button
    :class="{
      'button-scroll-down--white': isWhite,
    }"
    class="button-scroll-down"
    @click="$emit('next-page')"
  >
    <span class="icon-holder">
      <!--      <span class="absolute shape"></span>-->
      <font-awesome-icon
        :icon="['fas', 'chevron-down']"
        :style="{ color: 'white' }"
      />

      <span class="sr-only">Scroll</span>
    </span>
  </button>
</template>

<script>
export default {
  name: 'ButtonScrollDown',
  props: {
    isWhite: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.button-scroll-down {
  opacity: 0.9;
  width: 72px;
  height: 72px;
  border-radius: 100%;
  border: 0;
  background-color: rgba(var(--vichit-purple), 0.3);
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  outline: 0;
  position: fixed;
  bottom: 7px;
  left: 50%;
  transform: translateX(-50%);
  @apply transition-opacity ease-in duration-100;

  &--white {
    opacity: 0.65;
  }

  &:hover {
    opacity: 0.95;

    &:before {
      width: 58px;
      height: 58px;
    }
  }

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 100%;
    transform: translate(-50%, -50%);
    background-color: var(--vichit-purple);
    transition: width 0.25s ease-out, height 0.25s ease-out;
    width: 54px;
    height: 54px; // make almost width and height like hubspot button
  }

  &:after {
    display: block;
    z-index: 10;
    content: '';
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: sdb 2.5s ease-in-out infinite;
  }
}

.icon-holder {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 28px; // icon size
  color: #580e9a;
}

@keyframes sdb {
  0% {
    opacity: 0.2;
    transform: scale(0.4);
  }
  40% {
    opacity: 0;
    transform: scale(1.3);
  }
  100% {
    opacity: 0;
    transform: scale(1.3);
  }
}
</style>
