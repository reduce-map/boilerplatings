// stores/widgetStore.js
import { defineStore } from 'pinia';

export const useWidgetStore = defineStore('widget', {
  state: () => ({
    isShownWidgetLog: true,
    isShownWidgetSettings: true,
    // Добавьте другие виджеты по мере необходимости
  }),
  actions: {
    toggleWidget(widgetName) {
      this[`isShownWidget${widgetName}`] = !this[`isShownWidget${widgetName}`];
    },
  },
});
