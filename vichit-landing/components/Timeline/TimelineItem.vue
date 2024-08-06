<template>
  <div class="timeline-item">
    <timeline-item-rectangle left :svg-color="backgroundContent" />
    <vt-hexagon-icon
      class="!absolute icon-hexagon"
      :svg-color="svgColor"
      :icon-name="iconName"
    />
    <div
      class="content"
      :style="{
        background: backgroundContent,
      }"
    >
      <div class="title">
        <slot name="title" />
      </div>
      <div class="describe">
        <slot name="content" />
      </div>
    </div>
    <timeline-item-rectangle :svg-color="backgroundContent" />
  </div>
</template>

<script>
import TimelineItemRectangle from '@/components/Timeline/TimelineItemRectangle'

export default {
  name: 'TimelineItem',
  components: { TimelineItemRectangle },
  props: {
    size: {
      type: String,
      default: '40px',
    },
    backgroundContent: {
      type: String,
      default: '#643066',
    },
    svgColor: {
      type: String,
      default: '',
    },
    iconName: {
      type: String,
      default: 'react',
    },
  },
}
</script>

<style lang="scss" scoped>
.icon-hexagon {
  width: auto;
  // height: 75%;
  height: 40px;
  top: 50%;
  transform: translateY(-50%);
  left: 8px;
  max-height: 100px;
}
.timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 1fr;
  grid-auto-flow: column;
}
.content {
  font-size: 16px;
  overflow: hidden;
  border-radius: 1px;
  padding-left: 76px;
  padding: 8px 8px 8px 76px;
  .title {
    font-weight: 600;
    text-transform: uppercase;
  }
  .describe {
    font-size: 13px;
  }

  p {
    margin: 0;
  }
}
</style>
