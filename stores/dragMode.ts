import { defineStore } from "pinia";

export const useDragModeStore = defineStore("dragMode", {
  state: () => ({
    isEnabled: false,
  }),
  actions: {
    toggle() {
      this.isEnabled = !this.isEnabled;
    },
    enable() {
      this.isEnabled = true;
    },
    disable() {
      this.isEnabled = false;
    },
  },
});
