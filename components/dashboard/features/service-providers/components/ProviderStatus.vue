<script setup lang="ts">
import { ref, computed } from "vue";
import { useDragModeStore } from "@/stores/dragMode";
import Card from "@/components/ui/card/Card.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import DragHandleDots16 from "@/components/dashboard/ui/icons/DragHandleDots16.vue";
import OptionsDropdown from "@/components/dashboard/ui/OptionsDropdown.vue";
import DashboardSelect from "@/components/dashboard/ui/DashboardSelect.vue";
import { providerStatus, getStatusList } from "../data";
import { exportCsv } from "@/utils/csv";

const dragModeStore = useDragModeStore();

const PROVIDER_STATUS_CONFIG = {
  scrollMaxHeight: 260,
  dot: {
    active: "bg-success-700",
    inactive: "bg-destructive-700",
  },
  badge: {
    active: "bg-success-700/20 text-success-700",
    inactive: "bg-destructive-700/20 text-destructive-700",
  },
  statusLabels: {
    active: "Active",
    inactive: "Inactive",
  },
};

const selectedPeriod = ref("Today");
const selectOptions = ["Today", "This week", "This month"];

const statusList = computed(() => getStatusList(providerStatus));

const handlePeriodChange = (period: string) => {
  selectedPeriod.value = period;
};

const handleAction = (id: string) => {
  if (id === "export") {
    const exportData = statusList.value.map(({ name, status }) => ({
      provider: name,
      status:
        status === 1
          ? PROVIDER_STATUS_CONFIG.statusLabels.active
          : PROVIDER_STATUS_CONFIG.statusLabels.inactive,
      status_code: status,
    }));
    exportCsv("provider-status.csv", exportData);
  }
};
</script>

<template>
  <div
    :class="{
      'border-2 border-dashed border-primary p-2 rounded-20':
        dragModeStore.isEnabled,
    }"
  >
    <Card class="h-full flex flex-col">
      <div class="flex items-center justify-between mb-2">
        <CardHeader>
          <CardTitle>Service provider status</CardTitle>
          <CardDescription>
            Last updated ({{ providerStatus.lastUpdated }})
          </CardDescription>
        </CardHeader>
        <div class="flex items-center gap-2">
          <div
            v-if="dragModeStore.isEnabled"
            class="cursor-grab flex items-center drag-handle"
          >
            <DragHandleDots16 />
          </div>
          <template v-else>
            <DashboardSelect
              :value="selectedPeriod"
              :onChange="handlePeriodChange"
              :options="selectOptions"
            />
            <OptionsDropdown :onAction="handleAction" />
          </template>
        </div>
      </div>

      <!-- Providers with custom scrollbar -->
      <CardContent class="flex-1 flex flex-col">
        <div
          class="overflow-y-auto space-y-3 pr-2"
          :style="{ maxHeight: `${PROVIDER_STATUS_CONFIG.scrollMaxHeight}px` }"
        >
          <div
            v-for="(item, index) in statusList"
            :key="index"
            class="flex items-center justify-between py-3 gap-5 border-b border-b-[#F1F1F1] dark:border-b-[#374151] last:border-0"
          >
            <div class="flex items-center space-x-3">
              <div
                :class="[
                  'w-[6px] h-[6px] rounded-full',
                  item.status === 1
                    ? PROVIDER_STATUS_CONFIG.dot.active
                    : PROVIDER_STATUS_CONFIG.dot.inactive,
                ]"
              ></div>
              <span
                class="font-medium text-sm text-default-900 dark:text-white"
              >
                {{ item.name }}
              </span>
            </div>
            <div class="flex items-center space-x-4">
              <span
                :class="[
                  'px-2 py-1 rounded-[8px] text-xs font-medium',
                  item.status === 1
                    ? PROVIDER_STATUS_CONFIG.badge.active
                    : PROVIDER_STATUS_CONFIG.badge.inactive,
                ]"
              >
                {{
                  item.status === 1
                    ? PROVIDER_STATUS_CONFIG.statusLabels.active
                    : PROVIDER_STATUS_CONFIG.statusLabels.inactive
                }}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
