<template>
  <div>
    <div ref="uploader" class="uploader w-full">
      <div class="uploader-wrapper" @click="openUploadMenu">
        <input
          ref="upload-input"
          class="hidden"
          type="file"
          @input="onUpload"
        />
        <vt-gradient-button class="uploader-btn" type="primary">
          <template #icon>
            <font-awesome-icon class="icon" :icon="['fas', 'upload']" />
          </template>
        </vt-gradient-button>
        <fade-in
          component="transition-group"
          class="uploader__text-wrapper"
          leave-active="animate__fadeOutUp"
        >
          <span v-if="showAddAttachment" key="default" class="uploader__text">
            Add an attachment
          </span>
          <span
            v-if="fileName"
            ref="file-name"
            :key="fileName"
            class="uploader__text"
          >
            {{ fileName }}
          </span>
        </fade-in>
      </div>
      <fade-in>
        <vt-gradient-button v-if="file" class="uploader__reset" @click="clear">
          <template #icon>
            <font-awesome-icon class="icon" :icon="['fas', 'times']" />
          </template>
        </vt-gradient-button>
      </fade-in>
    </div>
    <div
      class="input-form__error-message input-form-transition pl-14"
      :style="{
        width: errorMessageWidth,
      }"
    >
      {{ localError }}
    </div>
  </div>
</template>

<script>
import FadeIn from '@/components/Transitions/fade-in'

export default {
  name: 'Upload',
  components: { FadeIn },
  props: {
    isInit: {
      type: Boolean,
      default: true,
    },
    limit: {
      type: Number,
      default: 45,
    },
    errorMessage: {
      type: String,
      default: 'File too Big, please select a file less than 45mb',
    },
  },
  data: () => ({
    file: null,
    localError: '',
    hasError: false,
    errorMessageWidth: 0,
  }),
  computed: {
    showAddAttachment() {
      return this.isInit && this.file === null
    },
    fileName() {
      return this.isInit && this.file?.name
    },
  },
  watch: {
    hasError() {
      this.$emit('on-error', this.hasError)
    },
  },
  mounted() {
    this.localError = this.errorMessage
  },
  methods: {
    setErrorMessageWidth() {
      if (this.hasError) {
        this.errorMessageWidth = `${this.$refs.uploader.offsetWidth}px`
      } else {
        this.errorMessageWidth = 0
      }
    },
    clear() {
      this.file = null
      this.$refs['upload-input'].value = ''
      this.$emit('input', null)
      this.hasError = false
      this.setErrorMessageWidth()
    },
    validation(file) {
      const mb = file.size / 1024 / 1024
      return mb < this.limit
    },
    onUpload(event) {
      const file = event.target.files[0]
      this.hasError = !this.validation(file)
      this.file = file
      event.target.value = ''
      this.$emit('input', file)
      this.setErrorMessageWidth()
    },
    openUploadMenu() {
      this.$refs['upload-input'].click()
    },
  },
}
</script>

<style lang="scss" scoped>
.uploader {
  @apply flex justify-between items-center;
}

.uploader__text-wrapper {
  @apply min-h-[2.5rem] w-full relative;
}

.uploader__reset {
  @apply w-10 min-w-[2.5rem] h-10 ml-4 rounded-full overflow-hidden;
  &::v-deep {
    .button-icon {
      @apply flex justify-center;
    }
  }
  &:hover {
    &::v-deep {
      .button-icon {
        color: rgba(var(--white));
        transform: scale(1);
      }

      &:before {
        transform: scaleX(1);
        transform-origin: center left;
      }
    }
  }
}
.icon {
  @apply text-lg;
}
.uploader-wrapper {
  color: inherit;
  @apply flex items-center text-lg cursor-pointer w-full min-h-[2.5rem];

  &::v-deep {
    .button-icon {
      color: rgba(var(--white-rgb), 0.5);
    }
  }
  &:hover {
    &::v-deep {
      .uploader-btn {
        .button-icon {
          color: rgba(var(--white));
          transform: scale(0.9);
        }

        &:before {
          transform: scaleX(1);
          transform-origin: center left;
        }
      }
    }
  }
}
.uploader-btn {
  @apply w-10 min-w-[2.5rem] h-10 mr-4 rounded-full;
}

.uploader__text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 220px;
  @apply absolute left-0 top-1/4 text-sm font-medium;
}

.input-form__error-message {
  color: var(--vichit-orange-harley);
  @apply relative h-6 text-lg overflow-hidden whitespace-nowrap;
}
.input-form-transition {
  @apply transition-all duration-1000;
}
@media (min-width: 500px) {
  .uploader__text {
    max-width: 350px;
  }
}
@media (min-width: 640px) {
  .uploader__text {
    max-width: 500px;
  }
}

@media (min-width: 768px) {
  .uploader__text {
    max-width: 600px;
  }
}

@media (min-width: 1024px) {
  .uploader__text {
    max-width: 450px;
  }
}

@media (min-width: 1280px) {
  .uploader__text {
    max-width: 600px;
  }
}
</style>
