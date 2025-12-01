<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  wrapperClassName?: string;
}>();
</script>

<template>
  <div :class="wrapperClassName">
    <table class="w-full caption-bottom text-sm">
      <slot />
    </table>
  </div>
</template>
