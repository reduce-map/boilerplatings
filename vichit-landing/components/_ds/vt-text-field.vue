<template>
  <div
    ref="input-form"
    class="input-form pt-6"
    :class="{
      'input-form--error': hasError,
      'input-form--has-focus': hasFocus,
      'input-form--up': value,
    }"
  >
    <label
      :for="inputID"
      class="input-form__label input-form-transition-label"
      :style="{
        width: progressDefault,
      }"
    >
      <span>
        {{ labelText }}
        <span v-if="required">*</span>
      </span>
    </label>

    <input
      v-if="tag === 'input'"
      :id="inputID"
      :value="value"
      :type="type"
      class="input-form__input"
      @focus="onFocus"
      @blur="onBlur"
      @input="$emit('input', $event.target.value)"
    />
    <textarea
      v-if="tag === 'textarea'"
      :id="inputID"
      :value="value"
      :type="type"
      class="input-form__input"
      @focus="onFocus"
      @blur="onBlur"
      @input="$emit('input', $event.target.value)"
    />

    <div
      class="input-form__border-wrapper input-form-transition"
      :style="{
        width: progressDefault,
      }"
    >
      <div
        ref="progress"
        class="input-form__border-progress input-form-transition"
        :style="{
          width: progressWidth,
        }"
      ></div>
    </div>
    <div
      class="input-form__error-message input-form-transition"
      :style="{
        width: showErrorMessage ? errorMessageWidth : '0px',
      }"
    >
      {{ localError }}
    </div>
  </div>
</template>

<script>
import { getRandomString } from '@/utils/helper'

export default {
  name: 'TextField',
  props: {
    type: {
      type: String,
      default: 'text',
    },

    labelText: {
      type: String,
      default: '',
    },

    value: {
      type: String,
      default: '',
    },

    errorMessage: {
      type: String,
      default: '',
    },

    required: {
      type: Boolean,
      default: false,
    },

    tag: {
      type: String,
      default: 'input',
    },

    hasInit: {
      type: Boolean,
      default: false,
    },

    showErrorMessage: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    inputID: '',
    progressDefault: 0,
    // states
    hasFocus: false,
    // local error
    localError: '',
  }),

  computed: {
    hasError() {
      return !!this.errorMessage
    },
    errorMessageWidth() {
      if (this.hasFocus) {
        return 0
      }
      if (this.hasError) {
        return this.progressDefault
      }
      return 0
    },
    progressWidth() {
      if (this.hasFocus || this.hasError || this.value) {
        return this.progressDefault
      }
      return 0
    },
  },

  watch: {
    windowWidth() {
      this.progressDefault = `${this.$refs['input-form'].clientWidth}px`
    },
    errorMessage: {
      immediate: true,
      handler() {
        if (this.errorMessage) {
          this.localError = this.errorMessage
        }
      },
    },
  },

  mounted() {
    this.inputID = getRandomString('Input')
    if (this.hasInit) {
      this.init()
    }
  },
  methods: {
    init() {
      this.progressDefault = `${this.$refs['input-form'].clientWidth}px`
      this.$emit('init')
    },
    onBlur() {
      this.hasFocus = false
      this.$emit('blur')
    },
    onFocus() {
      this.hasFocus = true
      this.$emit('focus')
    },
  },
}
</script>

<style lang="scss" scoped>
.input-form {
  color: var(--white);

  @apply relative text-base;

  &--up,
  &--has-focus {
    .input-form__label {
      color: var(--vichit-blue);
      @apply top-0 text-sm;
    }

    .input-form__border-progress {
      background-color: var(--vichit-blue);
    }
  }

  &--error {
    .input-form__label {
      color: var(--vichit-orange-harley) !important;
    }
    .input-form__border-progress {
      background-color: var(--vichit-orange-harley) !important;
    }
  }
}

.input-form__label {
  @apply absolute top-6 flex h-6 w-0 whitespace-nowrap overflow-hidden cursor-pointer;
}

.input-form__input {
  @apply bg-neutral-400/10;
  @apply block w-full outline-none;
}

.input-form__border-wrapper {
  background-color: var(--white);
  @apply relative h-px;
}

.input-form__border-progress {
  @apply absolute h-px;
}

.input-form__error-message {
  color: var(--vichit-orange-harley);
  @apply relative h-6 text-lg overflow-hidden whitespace-nowrap;
}

.input-form-transition {
  @apply transition-all duration-500;
}

.input-form-transition-label {
  transition: all 0.5s, width 2s;
}
</style>
