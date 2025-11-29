<script setup lang="ts">
import { cn } from "@/utils";

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <div :class="cn('pt-5', props.class)">
    <slot />
  </div>
</template>
