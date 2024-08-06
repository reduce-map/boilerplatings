<template>
  <div class="timeline-wrapper">
    <div class="hexagon-list">
      <div
        v-for="(item, i) in items"
        :key="`${item.iconName}-${i}-time-line`"
        :class="[
          'hexagon-list-container',
          {
            'first-element': i === 0,
            'last-element': i === items.length - 1,
          },
        ]"
        :style="{
          '--vertical-line': item.backgroundContent,
          '--horizontal-line': item.backgroundContent,
        }"
      >
        <div class="icon-wrapper">
          <vt-hexagon-icon
            class="!absolute icon-hexagon"
            :svg-color="item.backgroundContent"
            :icon-name="item.iconName"
            rotate
          />
        </div>
        <timeline-item
          :background-content="item.backgroundContent"
          :icon-name="item.iconName"
          class="flex-1"
        >
          <template #title> {{ item.title }} </template>
          <template #content>
            {{ item.content }}
          </template>
        </timeline-item>
      </div>
    </div>
  </div>
</template>

<script>
import TimelineItem from '@/components/Timeline/TimelineItem.vue'
export default {
  name: 'VtTimeline',
  components: { TimelineItem },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.timeline-wrapper {
  @apply flex justify-between;
}
.icon-wrapper {
  @apply relative z-[1] h-10 min-w-[100px] max-w-[100px];

  &:after {
    content: '';
    position: absolute;
    width: calc(100% - 38px);
    background: var(--horizontal-line);

    @apply absolute h-px top-1/2 -right-px z-[-1] -translate-y-1/2;
  }
}
.icon-hexagon {
  @apply w-auto h-10 max-h-[100px] top-1/2 left-0 -translate-y-1/2;
}

.hexagon-list-container {
  @apply relative flex justify-between items-center pb-5;

  &.first-element {
    &:after {
      @apply top-1/2;
    }
  }

  &.last-element {
    &:after {
      @apply bottom-1/2;
    }
  }

  &:after {
    content: '';
    background: var(--vertical-line);
    @apply absolute h-full w-px left-[21px];
  }
}
</style>
