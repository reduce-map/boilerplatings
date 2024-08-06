import { defineStore } from 'pinia';

export const useWidgetStore = defineStore('widget', {
  state: () => ({
    isShownWidgetLog: true,
    isShownWidgetSettings: true,
  }),
  actions: {
    toggleWidget(widgetName) {
      this[`isShownWidget${widgetName}`] = !this[`isShownWidget${widgetName}`];
    },
  },
});
