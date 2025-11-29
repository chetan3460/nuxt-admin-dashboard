<script setup lang="ts">
import { ref } from "vue";
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";
import { useDragModeStore } from "@/stores/dragMode";
import AnalyticsItemCard from "./components/AnalyticsItemCard.vue";
import { initialCardsData } from "./data/cards";

const dragModeStore = useDragModeStore();

// Use drag and drop
const [parent, items] = useDragAndDrop(initialCardsData, {
  dragHandle: ".drag-handle",
});
</script>

<template>
  <div
    ref="parent"
    class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
  >
    <div v-for="item in items" :key="item.id" class="h-full">
      <AnalyticsItemCard :data="item" :isDraggable="dragModeStore.isEnabled" />
    </div>
  </div>
</template>
