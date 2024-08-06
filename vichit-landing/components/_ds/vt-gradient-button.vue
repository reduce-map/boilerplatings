<template>
  <button
    type="button"
    class="vt-gradient-button"
    :class="[
      type,
      {
        loading: loading,
      },
    ]"
    :style="{
      '--transition-duration': transitionDuration,
    }"
    @click="onClick"
  >
    <span
      v-if="$slots.default"
      class="button-label relative"
      :class="{
        'mr-3': $slots.icon,
      }"
    >
      <slot />
    </span>
    <span v-if="$slots.icon" class="button-icon">
      <slot name="icon" />
    </span>
  </button>
</template>
<script>
export default {
  name: 'VtGradientButton',
  props: {
    transitionDuration: {
      type: String,
      default: '.7s',
    },
    // purple, primary
    type: {
      type: String,
      default: 'none',
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onClick() {
      if (this.loading) return
      this.$emit('click')
    },
  },
}
</script>

<style lang="scss" scoped>
.vt-gradient-button {
  @apply relative inline-block h-10 px-2 rounded-lg;

  .button-icon {
    transition-property: transform;
    @apply relative inline-block;

    //svg {
    //  width: 1.86667em;
    //  height: 1.6em;
    //}
  }

  &:before {
    content: '';
    transform: scaleX(0);
    transition: transform var(--transition-duration)
      cubic-bezier(0.075, 0.82, 0.165, 1);
    transform-origin: center right;
    background: var(--vichit-orange-harley);
    @apply absolute inset-0;
  }
}

.vt-gradient-button,
.btn,
.button-label,
.button-icon,
.button-icon svg {
  transition: all var(--transition-duration) cubic-bezier(0.075, 0.82, 0.165, 1);
}
.vt-gradient-button {
  @apply overflow-hidden;
  .button-label {
    color: var(--vichit-orange-harley);
  }

  &:hover {
    //background-color: var(--vichit-blue);
    .button-label {
      color: var(--white);
    }

    .button-icon {
      transform: scale(0.9);
    }

    &:before {
      transform: scaleX(1);
      transform-origin: center left;
    }
  }
}
.secondary {
  border-color: var(--vichit-purple);
  @apply border border-solid;
  .button-label {
    color: var(--vichit-purple);
  }
  .button-icon {
    color: var(--vichit-purple);
  }
  &:before {
    background: var(--vichit-purple);
  }
  &:hover {
    .button-label {
      color: var(--white);
    }

    .button-icon {
      color: var(--white);
    }
  }
}

.primary {
  border-color: var(--white);
  @apply border border-solid;
  .button-label {
    color: rgba(var(--white-rgb), 0.5);
  }
  .button-icon {
    color: rgba(var(--white-rgb), 0.5);
  }

  &:hover {
    .button-label {
      color: var(--white);
    }

    .button-icon {
      color: var(--white);
    }
  }
}

.loading {
  &:before {
    animation: loading-button 1s linear infinite;
  }
}

@keyframes loading-button {
  0% {
    transform-origin: center left;
    transform: scaleX(0);
  }
  50% {
    transform-origin: center left;
    transform: scaleX(1);
  }

  75% {
    transform-origin: center right;
    transform: scaleX(1);
  }

  100% {
    transform-origin: center right;
    transform: scaleX(0);
  }
}
</style>
