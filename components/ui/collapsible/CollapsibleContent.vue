<script setup lang="ts">
import { CollapsibleContent, type CollapsibleContentProps } from "radix-vue";

defineOptions({
  name: 'CollapsibleContent',
});

const props = defineProps<CollapsibleContentProps>();
</script>

<template>
  <CollapsibleContent v-bind="props">
    <slot />
  </CollapsibleContent>
</template>
