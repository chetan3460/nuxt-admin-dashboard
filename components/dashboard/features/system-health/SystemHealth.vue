<script setup lang="ts">
import { ref } from "vue";
import ServerStatistics from "./components/ServerStatistics/ServerStatistics.vue";
import NetworkStatistics from "./components/NetworkStatistics/NetworkStatistics.vue";

// Define sortable items
const items = ref([
  { id: "server-stats", className: "", component: "ServerStatistics" },
  {
    id: "system-network-stats",
    className: "",
    component: "NetworkStatistics",
  },
]);
</script>

<template>
  <div class="grid grid-cols-1 gap-6">
    <div
      v-for="item in items"
      :key="item.id"
      :class="item.className"
      class="drag-item"
    >
      <ServerStatistics v-if="item.component === 'ServerStatistics'" />
      <NetworkStatistics v-else-if="item.component === 'NetworkStatistics'" />
    </div>
  </div>
</template>
