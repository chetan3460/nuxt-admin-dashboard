<script setup lang="ts">
import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
  type ScrollAreaRootProps,
} from "radix-vue";
import { cn } from "@/utils";

const props = defineProps<ScrollAreaRootProps & { class?: string }>();
</script>

<template>
  <ScrollAreaRoot
    :class="cn('relative overflow-hidden', props.class)"
    v-bind="props"
  >
    <ScrollAreaViewport class="h-full w-full rounded-[inherit]">
      <slot />
    </ScrollAreaViewport>
    <ScrollAreaScrollbar
      orientation="vertical"
      class="flex touch-none select-none transition-colors h-full w-2.5 border-l border-l-transparent p-[1px]"
    >
      <ScrollAreaThumb class="relative flex-1 rounded-full bg-border" />
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar
      orientation="horizontal"
      class="flex touch-none select-none transition-colors h-2.5 border-t border-t-transparent p-[1px]"
    >
      <ScrollAreaThumb class="relative flex-1 rounded-full bg-border" />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
