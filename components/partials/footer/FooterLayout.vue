<script setup lang="ts">
import { cn } from "@/utils";

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <footer :class="cn('bg-card relative py-4 px-6', props.class)">
    <slot />
  </footer>
</template>
