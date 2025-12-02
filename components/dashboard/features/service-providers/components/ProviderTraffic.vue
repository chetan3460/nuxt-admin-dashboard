<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useDragModeStore } from "@/stores/dragMode";
import { useColorMode } from "@vueuse/core";
import Card from "@/components/ui/card/Card.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import DragHandleDots16 from "@/components/dashboard/ui/icons/DragHandleDots16.vue";
import OptionsDropdown from "@/components/dashboard/ui/OptionsDropdown.vue";
import DashboardSelect from "@/components/dashboard/ui/DashboardSelect.vue";
import { providerTrafficRaw, providerTrafficData } from "../data";
import { exportCsv } from "@/utils/csv";

const dragModeStore = useDragModeStore();
const colorMode = useColorMode();

const selectedPeriod = ref("Today");
const selectOptions = ["Today", "This week", "This month"];

const handlePeriodChange = (period: string) => {
  selectedPeriod.value = period;
};

const handleAction = (id: string) => {
  if (id === "export") {
    const exportData = providerTrafficData.map((item) => ({
      provider: item.name,
      traffic: item.value,
    }));
    exportCsv("provider-traffic.csv", exportData);
  }
};

const chartData = computed(() => providerTrafficData.map((item) => item.value));
const chartLabels = computed(() =>
  providerTrafficData.map((item) => item.name)
);

const chartOptions = computed(() => {
  const isDark = colorMode.value === "dark";

  return {
    chart: {
      type: "donut",
      background: "transparent",
      toolbar: { show: false },
    },
    labels: chartLabels.value,
    colors: [
      "#FF6A88",
      "#3EECAC",
      "#FDBB2D",
      "#42A5F5",
      "#A259FF",
      "#FFE159",
      "#60C345",
      "#303CE1",
    ],
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "right",
      offsetY: 0,
      height: 230,
      labels: {
        colors: isDark ? "#E5E5E5" : "#111827",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
        },
      },
    },
    stroke: {
      show: false,
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: {
        formatter: (value: number) => value.toLocaleString(),
      },
    },
  };
});
</script>

<template>
  <div
    :class="{
      'border-2 border-dashed border-primary p-2 rounded-20': dragModeStore.isEnabled,
    }"
  >
    <Card class="h-full flex flex-col">
    <div
      class="flex lg:items-center justify-between lg:flex-row flex-col gap-2"
    >
      <CardHeader>
        <CardTitle>Service Provider Traffic</CardTitle>
        <CardDescription>
          Last updated ({{ providerTrafficRaw.lastUpdated }})
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

    <CardContent>
      <div class="h-80">
        <ClientOnly>
          <apexchart
            type="donut"
            height="100%"
            :options="chartOptions"
            :series="chartData"
          />
        </ClientOnly>
      </div>
    </CardContent>
  </Card>
  </div>
</template>
