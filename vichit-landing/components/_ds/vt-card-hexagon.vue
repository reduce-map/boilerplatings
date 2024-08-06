<template>
  <div
    class="vt-hexagon-card"
    :class="{
      'vt-hexagon-card--right': iconRight,
    }"
  >
    <vt-hexagon-item class="vt-hexagon-card-icon">
      <template #background-image>
        <div
          class="vt-hexagon-card-svg"
          :class="{
            'vt-hexagon-card-svg--small': smallHexagonIcon,
          }"
        >
          <slot name="hexagon-icon" />
        </div>
      </template>
    </vt-hexagon-item>
    <div>
      <vt-heading :level="3" class="vt-hexagon-card-heading">
        <slot name="heading" />
      </vt-heading>
      <p class="vt-hexagon-card-text">
        <slot name="content" />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    iconRight: {
      type: Boolean,
      default: false,
    },

    smallHexagonIcon: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.vt-hexagon-card {
  --size-hexagon: 150px;
  --margin-hexagon: 0;

  @apply relative flex flex-col items-center w-full;
  @apply md:flex-row md:gap-4;

  .vt-hexagon-card-text {
    @apply p-4;
    @apply md:text-left;
  }

  .vt-hexagon-card-heading {
    @apply p-2 pb-0;
    @apply md:px-4;
  }

  .vt-hexagon-card-icon {
    --size: var(--size-hexagon);
    --margin: var(--margin-hexagon);
    min-width: var(--size);
  }

  &--right {
    .vt-hexagon-card-icon {
      @apply md:order-2;
    }

    .vt-hexagon-card-text {
      @apply md:text-right;
    }

    .vt-hexagon-card-heading {
      @apply md:text-right;
    }
  }
}

.vt-hexagon-card-svg {
  @apply h-full w-full;
  background: rgba(var(--vichit-grey-rgb), 0.15);

  &--small {
    ::v-deep {
      svg {
        @apply absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2;
        height: 52%;
        width: 60%;
        clip-path: none;
      }
    }
  }
}
</style>
