<script setup lang="ts">
import { cn } from "@/utils";

defineProps<{
  item: { title: string };
  class?: string;
}>();
</script>

<template>
  <div
    :class="
      cn(
        'text-default-900 font-semibold uppercase mb-3 text-xs mt-4',
        $props.class
      )
    "
  >
    {{ item.title }}
  </div>
</template>
