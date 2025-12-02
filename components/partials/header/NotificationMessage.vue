<script setup lang="ts">
import { Bell } from "lucide-vue-next";
</script>

<template>
  <button
    class="relative p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
  >
    <Bell class="w-5 h-5" />
    <span
      class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background"
    ></span>
  </button>
</template>
