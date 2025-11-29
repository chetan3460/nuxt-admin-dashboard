<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { type Component } from "vue";

interface Props {
  icon: string | Component | object;
  class?: string;
  fallbackIcon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  fallbackIcon: "heroicons:cube",
});

// Helper to determine icon type
const isString = (val: any): val is string => typeof val === "string";
const isComponent = (val: any): val is Component =>
  typeof val === "object" && (val.render || val.setup || val.template);
const isImage = (val: any): val is { src: string } =>
  typeof val === "object" && typeof val.src === "string";
</script>

<template>
  <!-- String: assume iconify icon name -->
  <Icon v-if="isString(icon)" :icon="icon" :class="props.class" />

  <!-- Vue Component -->
  <component :is="icon" v-else-if="isComponent(icon)" :class="props.class" />

  <!-- Next.js/Nuxt SVG/image asset import -->
  <img
    v-else-if="isImage(icon)"
    :src="icon.src"
    alt=""
    aria-hidden="true"
    :class="props.class"
  />

  <!-- Fallback -->
  <Icon v-else :icon="fallbackIcon" :class="props.class" />
</template>
