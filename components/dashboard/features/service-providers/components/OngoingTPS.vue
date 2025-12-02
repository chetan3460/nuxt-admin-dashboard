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
import Badge from "@/components/ui/badge/Badge.vue";
import { ongoingTPSRaw, ongoingTPSData } from "../data";
import { exportCsv } from "@/utils/csv";

const dragModeStore = useDragModeStore();
const colorMode = useColorMode();

const props = defineProps({
  height: {
    type: [Number, String],
    default: 340,
  },
});

const selectedPeriod = ref("Today");
const selectOptions = ["Today", "This week", "This month"];

const handlePeriodChange = (period: string) => {
  selectedPeriod.value = period;
};

const handleAction = (id: string) => {
  if (id === "export") {
    const exportData = ongoingTPSData.map((item) => ({
      provider: item.name,
      tps: item.value,
    }));
    exportCsv("ongoing-tps.csv", exportData);
  }
};

const chartSeries = computed(() => [
  {
    name: "TPS",
    data: ongoingTPSData.map((item) => item.value),
  },
]);

const chartOptions = computed(() => {
  const isDark = colorMode.value === "dark";

  return {
    chart: {
      type: "bar",
      background: "transparent",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        columnWidth: "16px",
      },
    },
    stroke: {
      width: 0,
    },
    colors: ["#3EECAC"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#42A5F5"],
        inverseColors: false,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ongoingTPSData.map((item) => item.name),
      labels: {
        style: {
          colors: isDark ? "#E5E5E5" : "#111827",
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: true,
        color: isDark ? "#9CA3AF" : "#4B5563",
      },
      axisTicks: {
        show: true,
        color: isDark ? "#9CA3AF" : "#4B5563",
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? "#E5E5E5" : "#111827",
        },
        formatter: (value: number) => {
          if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
          return value.toString();
        },
      },
    },
    grid: {
      borderColor: isDark ? "#374151" : "#E5E7EB",
      strokeDashArray: 3,
    },
    markers: {
      size: 5,
      colors: ["#3EECAC"],
      strokeColors: isDark ? "#111827" : "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: {
        formatter: (value: number) => `${value.toLocaleString()} TPS`,
      },
    },
  };
});
</script>

<template>
  <div
    :class="{
      'border-2 border-dashed border-primary p-2 rounded-20':
        dragModeStore.isEnabled,
    }"
  >
    <Card class="h-full flex flex-col">
      <div class="flex items-center justify-between">
        <CardHeader>
          <div class="flex items-center gap-2">
            <CardTitle>Ongoing TPS by Service Provider</CardTitle>
            <Badge variant="live">Live</Badge>
          </div>
          <CardDescription>
            Last updated ({{ ongoingTPSRaw.lastUpdated }})
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
        <div
          :style="{
            height: typeof height === 'number' ? `${height}px` : height,
          }"
        >
          <ClientOnly>
            <apexchart
              type="bar"
              height="100%"
              :options="chartOptions"
              :series="chartSeries"
            />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
