<script setup lang="ts">
import { ref, computed } from "vue";
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
import { apiCallsTodayRaw, apiCallsTodayData } from "../data";
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
    const exportData = apiCallsTodayData.map((item) => ({
      time: item.time,
      calls: item.value,
    }));
    exportCsv("api-calls-today.csv", exportData);
  }
};

const chartSeries = computed(() => [
  {
    name: "API Calls",
    data: apiCallsTodayData.map((item) => item.value),
  },
]);

const chartOptions = computed(() => {
  const isDark = colorMode.value === "dark";

  return {
    chart: {
      type: "line",
      background: "transparent",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: [isDark ? "#E879F9" : "#B100AE"],
    xaxis: {
      categories: apiCallsTodayData.map((item) => item.time),
      labels: {
        style: {
          colors: isDark ? "#E5E5E5" : "#111827",
        },
      },
      axisBorder: {
        color: "#666",
      },
      axisTicks: {
        color: "#666",
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? "#E5E5E5" : "#111827",
        },
        formatter: (value: number) => {
          if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
          if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
          return value.toString();
        },
      },
    },
    grid: {
      borderColor: isDark ? "#374151" : "#DADADA",
      strokeDashArray: 3,
    },
    markers: {
      size: 4,
      colors: [isDark ? "#111827" : "#fff"],
      strokeColors: [isDark ? "#E879F9" : "#B100AE"],
      strokeWidth: 1,
      hover: {
        size: 6,
      },
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
  <Card class="h-full flex flex-col">
    <div class="flex items-center justify-between">
      <CardHeader>
        <CardTitle>Total API calls today</CardTitle>
        <CardDescription>
          Last updated ({{ apiCallsTodayRaw.lastUpdated }})
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

    <CardContent class="flex-1 flex flex-col">
      <div class="h-full">
        <ClientOnly>
          <apexchart
            type="line"
            height="100%"
            :options="chartOptions"
            :series="chartSeries"
          />
        </ClientOnly>
      </div>
    </CardContent>
  </Card>
</template>
