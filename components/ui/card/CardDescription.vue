<script setup lang="ts">
import { cn } from "@/utils";

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <p :class="cn('text-xs font-normal text-default-600', props.class)">
    <slot />
  </p>
</template>
