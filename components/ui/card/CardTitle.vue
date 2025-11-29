<script setup lang="ts">
import { cn } from "@/utils";

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <h3 :class="cn('text-base font-semibold text-default-900', props.class)">
    <slot />
  </h3>
</template>
