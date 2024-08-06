<template>
  <div class="services-holder slide-in">
    <vt-heading :level="2" class="heading" v-html="$t('secondSlide.title')" />
    <div v-show="windowHeight > 900" class="text-holder">
      <p v-html="$t('secondSlide.description')" />
    </div>
    <div
      class="services-cards-holder"
      :class="{
        'services-cards-holder--slider': pageHasSliderAnimation,
      }"
    >
      <vt-card-image-iti
        v-for="(item, delay) in $t('secondSlide.servicesList')"
        :key="delay"
        class="services-card"
        @click.native="onCardClick(item.link)"
      >
        <template #title>
          <vt-heading class="px-8" :level="3"> {{ item.name }} </vt-heading>
        </template>
        <template #overflow-link-content>
          {{ item.name }}
        </template>
        {{ item.description }}
        <template #footer-content>
          {{ $t('Learn more') }}
        </template>
      </vt-card-image-iti>
    </div>
    <div class="services-bottom">
      <span class="services-bottom-text">
        {{ $t('secondSlide.bottomText') }}
      </span>
      <nuxt-link class="ml-2" :to="localePath('services')">
        <vt-gradient-button class="service-button">
          {{ $t('show more') }}
        </vt-gradient-button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('store')
export default {
  name: 'Services',
  computed: {
    ...mapGetters(['pageHasSliderAnimation', 'windowHeight']),
  },
  methods: {
    onCardClick(name) {
      // return name
      this.$router.push(
        this.localePath({
          name,
        })
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.services-holder {
  @apply p-8 md:p-12 bg-white rounded-lg shadow-2xl shadow-slate-500;
}

.heading {
  @apply tracking-wide mb-8;
  text-transform: capitalize;
  text-align: center;
}
.service-button {
  @apply h-14 px-4 font-bold uppercase text-base;
  width: auto;

  &:before {
    border-radius: 0.5rem;
  }
}

.services-cards-holder {
  @apply grid grid-cols-1 gap-8 mb-8;
}

.services-cards-holder--slider {
  @apply grid-cols-3;
}

.text-holder {
  text-align: justify;
  @apply text-base sm:text-xl;

  p {
    @apply mb-8;
  }
}

.services-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.services-bottom {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  @apply md:justify-between;

  &-text {
    @apply text-base sm:text-xl md:text-2xl font-medium;
  }
}
</style>
