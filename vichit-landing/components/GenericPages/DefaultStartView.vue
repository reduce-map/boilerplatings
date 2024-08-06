<template>
  <section class="start-view">
    <nuxt-link :to="switchLocalePath(localeCode)" class="locale-switch">
      {{ localeName }}
    </nuxt-link>
    <vt-heading level="1" class="start-view__heading">
      {{ title }}
    </vt-heading>
    <p class="start-view__subheading">
      {{ subtitle }}
    </p>
    <nuxt-link :to="localePath(button.path)" class="start-view__button">
      <vt-gradient-button :type="button.type">
        {{ button.text }}
      </vt-gradient-button>
    </nuxt-link>
    <div v-if="img" class="start-view__img-container">
      <div class="start-view__img-fake"></div>
      <img
        class="start-view__img"
        sizes="(max-width: 1197px) 100vw, 1197px"
        :srcset="img.srcset"
        :src="img.src"
        :alt="pageName"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'DefaultStartView',
  props: {
    pageName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    button: {
      type: Object,
      required: true,
    },
    imgName: {
      type: String,
      default: null,
    },
  },
  computed: {
    currentLocalCode() {
      return this.$i18n.localeProperties.code
    },
    anotherLocal() {
      return this.$i18n.locales.filter(
        ({ code }) => this.currentLocalCode !== code
      )[0]
    },
    localeName() {
      return this.anotherLocal?.name
    },
    localeCode() {
      return this.anotherLocal?.code
    },

    img() {
      try {
        const img = require(`@/assets/img/${this.imgName}`)

        return {
          // srcset: `${img} 299w,${img}  599w,${img} 1197w,${img} 1796w,${img} 2394w`,
          src: img,
        }
      } catch (error) {
        return null
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.start-view {
  @apply mt-10;
  @apply flex items-center flex-col w-full text-center;
}
.start-view__heading {
  @apply max-w-3xl mb-5;
}

.start-view__subheading {
  @apply max-w-2xl mb-8;
}
.start-view__button {
  @apply mb-10;
}
.start-view__img-container {
  @apply relative max-w-4xl w-full;
  @apply lg:max-w-5xl xl:max-w-6xl;
}
.start-view__img {
  @apply absolute w-full h-full top-0 left-0 object-cover object-center;
}

.start-view__img-fake {
  @apply w-full pb-[50%];
}

// gradient of title
@supports (
  (background-image: linear-gradient(100deg, #000, #000)) and
    (-webkit-text-fill-color: transparent) and
    ((background-clip: text) or (-webkit-background-clip: text))
) {
  .start-view__heading {
    background-image: linear-gradient(
      100deg,
      var(--black),
      var(--vichit-purple)
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
