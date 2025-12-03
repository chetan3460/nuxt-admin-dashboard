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
      class="text-xl font-bold bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent tracking-tight"
    >
      NEXUS
    </span>
  </div>
</template>
