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
import { avgLatencyRaw, avgLatencyData } from "../data";
import { exportCsv } from "@/utils/csv";

const dragModeStore = useDragModeStore();
const colorMode = useColorMode();

const props = defineProps({
  height: {
    type: [Number, String],
    default: 440,
  },
});

const selectedPeriod = ref("Today");
const selectOptions = ["Today", "This week", "This month"];

const handlePeriodChange = (period: string) => {
  selectedPeriod.value = period;
};

const handleAction = (id: string) => {
  if (id === "export") {
    const exportData = avgLatencyData.map((item) => ({
      provider: item.name,
      latency: item.value,
    }));
    exportCsv("avg-latency.csv", exportData);
  }
};

const chartSeries = computed(() => [
  {
    name: "Latency (ms)",
    data: avgLatencyData.map((item) => item.value),
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
    colors: ["#A259FF"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#C084FC"],
        inverseColors: false,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: avgLatencyData.map((item) => item.name),
      labels: {
        rotate: -45,
        rotateAlways: true,
        style: {
          colors: isDark ? "#E5E5E5" : "#111827",
          fontSize: "11px",
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
        formatter: (value: number) => `${value}ms`,
      },
    },
    grid: {
      borderColor: isDark ? "#374151" : "#E5E7EB",
      strokeDashArray: 3,
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: {
        formatter: (value: number) => `${value}ms`,
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
            <CardTitle>Avg latency by service provider</CardTitle>
            <Badge variant="live">Live</Badge>
          </div>
          <CardDescription>
            Last updated ({{ avgLatencyRaw.lastUpdated }})
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
