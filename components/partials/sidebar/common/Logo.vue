<script setup lang="ts">
import logoSrc from "@/assets/images/logo.svg?url";

defineProps<{
  className?: string;
  collapsed?: boolean;
  hovered?: boolean;
}>();
</script>

<template>
  <div class="p-4 flex items-center">
    <img
      :src="logoSrc"
      alt="Logo"
      class="h-7 w-auto"
    />
  </div>
</template>
