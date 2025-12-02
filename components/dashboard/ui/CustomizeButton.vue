<script setup lang="ts">
import { useDragModeStore } from "@/stores/dragMode";
import CustomizeIcon from "./icons/CustomizeIcon.vue";

const dragModeStore = useDragModeStore();
</script>

<template>
  <button
    @click="dragModeStore.toggle()"
    class="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
    :class="{ 'text-primary bg-accent': dragModeStore.isEnabled }"
  >
    <CustomizeIcon class="w-5 h-5" />
  </button>
</template>
