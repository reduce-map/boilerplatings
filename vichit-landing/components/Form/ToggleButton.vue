<template>
  <label
    :for="id"
    class="toggle-button"
    :class="{
      'toggle-button--checked': checked,
    }"
  >
    <input
      :id="id"
      :value="value"
      type="checkbox"
      class="sr-only toggle-button__input"
      @input="onChecked"
    />
    <div class="toggle-button__toggle">
      <div v-if="isInit" class="toggle-button__circle"></div>
      <font-awesome-icon
        class="icon toggle__times text-sm"
        :class="{
          '!opacity-100': isInit,
        }"
        :icon="['fas', 'times']"
      />
      <font-awesome-icon
        class="icon toggle__check text-xs"
        :class="{
          '!opacity-100': isInit,
        }"
        :icon="['fas', 'check']"
      />
    </div>
    <fade-in>
      <span v-if="isInit" class="toggle-button__label">
        {{ label }}
      </span>
    </fade-in>
  </label>
</template>

<script>
import FadeIn from '@/components/Transitions/fade-in'
import { getRandomString } from '@/utils/helper'
export default {
  name: 'ToggleButton',
  components: {
    FadeIn,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
    isInit: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    id: '',
    checked: false,
  }),
  mounted() {
    this.id = getRandomString()
    this.checked = this.value
  },

  methods: {
    onChecked({ target }) {
      this.checked = target.checked
      this.$emit('input', this.checked)
    },
  },
}
</script>
<style lang="scss" scoped>
.toggle-button {
  color: var(--white);
  justify-content: flex-start;
  @apply flex cursor-pointer mb-4;
}

.toggle-button__toggle {
  @apply relative w-11 h-6 min-w-[2.75rem];
  @apply border rounded-full bg-transparent transition-all;
}

.toggle-button__circle {
  left: 4px;
  transform: translateY(-50%);
  background: var(--vichit-blue);
  @apply absolute top-1/2 w-4 h-4 z-10 rounded-full transition-all;
}

.toggle__times {
  color: rgba(var(--white-rgb), 0.5);
  right: 0.3rem;
  opacity: 0;
  @apply absolute top-1/2 -translate-y-1/2 transition-all;
}

.toggle__check {
  color: rgba(var(--white-rgb), 0.5);
  left: 0.3rem;
  opacity: 0;
  @apply absolute top-1/2 -translate-y-1/2 transition-all;
}

.toggle-button--checked {
  .toggle-button__circle {
    background: var(--vichit-purple);
    left: calc(100% - calc(1rem + 4px));
  }

  .toggle-button__toggle {
    background: var(--vichit-blue);
  }
}

.toggle-button__label {
  @apply ml-3 text-sm font-medium;
}
</style>
