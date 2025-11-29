<script setup lang="ts">
import ArrowUpTriangle16 from "@/components/dashboard/ui/icons/ArrowUpTriangle16.vue";
import ArrowDownTriangle16 from "@/components/dashboard/ui/icons/ArrowDownTriangle16.vue";

defineProps<{
  value: string | number;
  trend?: "up" | "down";
  change?: string;
  color?: string;
}>();
</script>

<template>
  <div>
    <div class="flex items-center gap-1">
      <div class="text-2xl font-bold text-default-900 dark:text-white">
        {{ value }}
      </div>
      <ArrowUpTriangle16 v-if="trend === 'up'" />
      <ArrowDownTriangle16 v-if="trend === 'down'" />
    </div>
    <div
      v-if="change"
      class="flex items-center gap-1 mt-3 text-[11px]"
      :class="color"
    >
      <span class="font-medium">{{ change }}</span>
    </div>
  </div>
</template>
