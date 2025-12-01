<script setup lang="ts">
import { ref } from "vue";
import KafkaStatus from "./components/Kafka/KafkaStatus.vue";
import DatabaseStatus from "./components/DatabaseStatus/DatabaseStatus.vue";
import RedisStatus from "./components/RedisStatus/RedisStatus.vue";
import WebserverStatus from "./components/WebserverStatus/WebserverStatus.vue";
import ApplicationsComponent from "./components/Applications/ApplicationsComponent.vue";

// Define sortable items
const items = ref([
  { id: "kafka-status", className: "", component: "KafkaStatus" },
  { id: "database-status", className: "", component: "DatabaseStatus" },
  { id: "redis-status", className: "", component: "RedisStatus" },
  { id: "webserver-status", className: "", component: "WebserverStatus" },
  {
    id: "applications-status",
    className: "",
    component: "ApplicationsComponent",
  },
]);
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <div
      v-for="item in items"
      :key="item.id"
      :class="item.className"
      class="drag-item"
    >
      <KafkaStatus v-if="item.component === 'KafkaStatus'" />
      <DatabaseStatus v-else-if="item.component === 'DatabaseStatus'" />
      <RedisStatus v-else-if="item.component === 'RedisStatus'" />
      <WebserverStatus v-else-if="item.component === 'WebserverStatus'" />
      <ApplicationsComponent
        v-else-if="item.component === 'ApplicationsComponent'"
      />
    </div>
  </div>
</template>
