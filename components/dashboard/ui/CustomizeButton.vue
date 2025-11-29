<script setup lang="ts">
import { useDragModeStore } from "@/stores/dragMode";
import CustomizeIcon from "./icons/CustomizeIcon.vue";

const dragModeStore = useDragModeStore();
</script>

<template>
  <button
    @click="dragModeStore.toggle()"
    class="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors"
    :class="
      dragModeStore.isEnabled
        ? 'bg-primary text-primary-foreground border-primary'
        : 'bg-background text-foreground border-border hover:bg-accent'
    "
  >
    <CustomizeIcon class="w-4 h-4" />
    <span class="text-sm font-medium">
      {{ dragModeStore.isEnabled ? "Done" : "Customize" }}
    </span>
  </button>
</template>
