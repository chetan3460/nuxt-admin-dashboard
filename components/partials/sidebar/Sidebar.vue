<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import ClassicSidebar from "./classic/ClassicSidebar.vue";
import MobileSidebar from "./mobile-sidebar/MobileSidebar.vue";

const isDesktop = useMediaQuery("(min-width: 1280px)");
</script>

<template>
  <div>
    <ClassicSidebar v-if="isDesktop" />
    <MobileSidebar v-else />
  </div>
</template>
