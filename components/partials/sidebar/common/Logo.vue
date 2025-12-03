<script setup lang="ts">
import NexusLogo from "./NexusLogo.vue";

defineProps<{
  className?: string;
  collapsed?: boolean;
  hovered?: boolean;
}>();
</script>

<template>
  <div class="p-4 flex items-center justify-start text-primary">
    <NexusLogo :collapsed="collapsed && !hovered" />
  </div>
</template>
