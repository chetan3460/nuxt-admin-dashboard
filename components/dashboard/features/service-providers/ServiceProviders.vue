<script setup lang="ts">
import { ref, computed } from "vue";
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";
import { useDragModeStore } from "@/stores/dragMode";
import ProviderStatus from "./components/ProviderStatus.vue";
import ProviderTraffic from "./components/ProviderTraffic.vue";
import APICallsToday from "./components/APICallsToday.vue";
import APICallsByProvider from "./components/APICallsByProvider.vue";
import OngoingTPS from "./components/OngoingTPS.vue";
import AvgLatency from "./components/AvgLatency.vue";
import DeliveryReports from "./components/DeliveryReports.vue";
import SuccessfulTransactions from "./components/SuccessfulTransactions.vue";
import { apiCallsByProviderData } from "./service-providers-data";

const dragModeStore = useDragModeStore();

// Initial items configuration
const initialItems = [
  { id: "provider-status", component: "ProviderStatus", className: "" },
  { id: "provider-traffic", component: "ProviderTraffic", className: "" },
  { id: "api-calls-today", component: "APICallsToday", className: "" },
  { id: "delivery-reports", component: "DeliveryReports", className: "" },
  {
    id: "ongoing-tps",
    component: "OngoingTPS",
    className: apiCallsByProviderData.length > 6 ? "lg:col-span-2 h-full" : "",
  },
  {
    id: "avg-latency",
    component: "AvgLatency",
    className: "lg:col-span-2 h-full",
  },
  {
    id: "successful-transactions",
    component: "SuccessfulTransactions",
    className: "lg:col-span-2 h-full",
  },
  {
    id: "api-calls-by-provider",
    component: "APICallsByProvider",
    className: apiCallsByProviderData.length > 6 ? "lg:col-span-2 h-full" : "",
  },
];

const [parent, items] = useDragAndDrop(initialItems, {
  dragHandle: ".drag-handle",
});
</script>

<template>
  <div ref="parent" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div
      v-for="item in items"
      :key="item.id"
      :class="item.className"
      class="drag-item"
    >
      <ProviderStatus
        v-if="item.component === 'ProviderStatus'"
        class="h-full"
      />
      <ProviderTraffic
        v-else-if="item.component === 'ProviderTraffic'"
        class="h-full"
      />
      <APICallsToday
        v-else-if="item.component === 'APICallsToday'"
        class="h-full"
      />
      <APICallsByProvider
        v-else-if="item.component === 'APICallsByProvider'"
        class="h-full"
      />
      <OngoingTPS v-else-if="item.component === 'OngoingTPS'" class="h-full" />
      <AvgLatency v-else-if="item.component === 'AvgLatency'" class="h-full" />
      <DeliveryReports
        v-else-if="item.component === 'DeliveryReports'"
        class="h-full"
      />
      <SuccessfulTransactions
        v-else-if="item.component === 'SuccessfulTransactions'"
        class="h-full"
      />
    </div>
  </div>
</template>

<style scoped>
/* Ensure drag handle is visible */
:deep(.drag-handle) {
  cursor: grab;
}
</style>
