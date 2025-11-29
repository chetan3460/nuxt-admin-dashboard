<script setup lang="ts">
import { cn } from "@/utils";

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <div :class="cn('p-5 rounded-20 bg-card', props.class)">
    <slot />
  </div>
</template>
