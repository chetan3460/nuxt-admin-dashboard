<script setup lang="ts">
import { useFullscreen } from "@vueuse/core";
import { Maximize, Minimize } from "lucide-vue-next";

const { isFullscreen, toggle } = useFullscreen();
</script>

<template>
  <button
    @click="toggle"
    class="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
  >
    <Minimize v-if="isFullscreen" class="w-5 h-5" />
    <Maximize v-else class="w-5 h-5" />
  </button>
</template>
