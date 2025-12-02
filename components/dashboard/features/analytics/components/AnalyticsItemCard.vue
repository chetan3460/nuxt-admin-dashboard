<script setup lang="ts">
import GaugeCard from "./GaugeCard.vue";
import MetricCard from "./MetricCard.vue";
import DragHandleDots16 from "@/components/dashboard/ui/icons/DragHandleDots16.vue";

defineProps<{
  data: any;
  isDraggable?: boolean;
}>();
</script>

<template>
  <div
    :class="{
      'border-2 border-dashed border-primary p-2 rounded-20': isDraggable,
    }"
    class="h-full"
  >
    <div
      class="rounded-20 p-4 bg-card shadow transition-all duration-300 group relative h-full"
    >
      <!-- Drag handle -->
      <div
        v-if="isDraggable"
        class="drag-handle absolute top-2 right-2 z-10 opacity-75 hover:opacity-100 transition-opacity cursor-grab"
      >
        <DragHandleDots16 />
      </div>

      <!-- Title -->
      <div class="text-xs font-semibold text-default-600 dark:text-default-400">
        {{ data.title }}
      </div>

      <!-- Main content -->
      <GaugeCard
        v-if="data.type === 'gauge'"
        :title="data.title"
        :value="data.value"
      />
      <MetricCard
        v-else
        :value="data.value"
        :trend="data.trend"
        :change="data.change"
        :color="data.color"
      />
    </div>
  </div>
</template>
