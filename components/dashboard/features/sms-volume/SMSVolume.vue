<script setup lang="ts">
import { ref, computed } from "vue";
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";
import { useDragModeStore } from "@/stores/dragMode";
import OverallSMSVolume from "./components/OverallSMSVolume.vue";
import SMSByProvider from "./components/SMSByProvider.vue";
import SMSByDepartment from "./components/SMSByDepartment.vue";
import { smsData } from "./sms-data";

const props = defineProps<{
  selectedPeriod?: string;
}>();

const emit = defineEmits<{
  (e: "periodChange", period: string): void;
}>();

const dragModeStore = useDragModeStore();

// Initial items configuration
const initialItems = [
  { id: "overall-sms", component: "OverallSMSVolume", className: "h-full" },
  { id: "dept-sms", component: "SMSByDepartment", className: "h-full" },
  {
    id: "provider-sms",
    component: "SMSByProvider",
    className: "lg:col-span-2 h-full",
  },
];

const [parent, items] = useDragAndDrop(initialItems, {
  dragHandle: ".drag-handle",
});

const smsSelectOptions = ["Today", "This week", "This month", "YTD"];
</script>

<template>
  <div ref="parent" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div
      v-for="item in items"
      :key="item.id"
      :class="item.className"
      class="drag-item"
    >
      <OverallSMSVolume
        v-if="item.component === 'OverallSMSVolume'"
        :smsData="smsData"
        :isDraggable="dragModeStore.isEnabled"
        :selectOptions="smsSelectOptions"
        class="h-full"
      />
      <SMSByDepartment
        v-else-if="item.component === 'SMSByDepartment'"
        :smsData="smsData"
        :isDraggable="dragModeStore.isEnabled"
        :selectOptions="smsSelectOptions"
        class="h-full"
      />
      <SMSByProvider
        v-else-if="item.component === 'SMSByProvider'"
        :smsData="smsData"
        :isDraggable="dragModeStore.isEnabled"
        :selectOptions="smsSelectOptions"
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
