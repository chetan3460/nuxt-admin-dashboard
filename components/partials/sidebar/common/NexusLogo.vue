<script setup lang="ts">
const props = defineProps<{
  collapsed?: boolean;
}>();
</script>

<template>
  <div class="flex items-center gap-2 justify-start">
    <!-- Text -->
    <span
      v-if="!collapsed"
      class="text-xl font-bold text-default-900 dark:text-white tracking-tight"
    >
      NEXUS
    </span>
  </div>
</template>
