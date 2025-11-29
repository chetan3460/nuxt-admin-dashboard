<script setup lang="ts">
import { cn } from "@/utils";

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <header :class="cn('z-50', props.class)">
    <slot />
  </header>
</template>
