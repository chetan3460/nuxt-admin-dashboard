<script setup lang="ts">
import { Separator, type SeparatorProps } from "radix-vue";
import { cn } from "@/utils";

const props = withDefaults(defineProps<SeparatorProps & { class?: string }>(), {
  orientation: "horizontal",
  decorative: true,
});
</script>

<template>
  <Separator
    :orientation="orientation"
    :decorative="decorative"
    :class="
      cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        props.class
      )
    "
  />
</template>
