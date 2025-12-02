<script setup lang="ts">
import { ref, computed } from "vue";
import { useColorMode } from "@vueuse/core";
import { useDragModeStore } from "@/stores/dragMode";
import Card from "@/components/ui/card/Card.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import Button from "@/components/ui/button/Button.vue";
import DragHandleDots16 from "@/components/dashboard/ui/icons/DragHandleDots16.vue";
import OptionsDropdown from "@/components/dashboard/ui/OptionsDropdown.vue";
import { exportCsv } from "@/utils/csv";
import { networkRaw, networkData } from "./data";

const dragModeStore = useDragModeStore();
const colorMode = useColorMode();

const selectedServer = ref("Server 1");
const selectedDisplay = ref("Percentage");

const props = defineProps<{
  height?: number;
}>();

const chartHeight = props.height || 384;

// Format milliseconds
const formatMs = (n: number): string => {
  if (n == null || Number.isNaN(n)) return "-";
  if (n < 1) return `${n.toFixed(3)} ms`;
  if (n < 10) return `${n.toFixed(1)} ms`;
  return `${Math.round(n)} ms`;
};

// Chart series
const series = computed(() => [
  {
    name: "Latency",
    data: networkData.map((d) => d.value),
  },
]);

// Chart options
const chartOptions = computed(() => ({
  chart: {
    type: "area",
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  colors: ["#f59e0b"], // orange-500
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth" as const,
    width: 2,
  },
  fill: {
    type: "solid",
    opacity: colorMode.value === "dark" ? 0.2 : 0.25,
    colors: ["#fbbf24"], // amber-400
  },
  xaxis: {
    categories: networkData.map((d) => d.time),
    axisBorder: {
      show: true,
      color: "#666",
    },
    axisTicks: {
      show: true,
      color: "#666",
    },
    labels: {
      style: {
        colors: colorMode.value === "dark" ? "#E5E5E5" : "#111827",
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    labels: {
      formatter: (value: number) => formatMs(value),
      style: {
        colors: colorMode.value === "dark" ? "#E5E5E5" : "#111827",
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: true,
      color: "#666",
    },
    axisTicks: {
      show: true,
      color: "#666",
    },
  },
  grid: {
    borderColor: colorMode.value === "dark" ? "#666" : "#DADADA",
    strokeDashArray: 3,
  },
  tooltip: {
    theme: colorMode.value === "dark" ? "dark" : "light",
    y: {
      formatter: (value: number) => formatMs(value),
    },
  },
}));

// Handle actions
const handleAction = (id: string) => {
  if (id === "export") {
    exportCsv("system-health-network-stats.csv", networkData);
  }
};
</script>

<template>
  <div
    :class="{
      'border-2 border-dashed border-primary p-2 rounded-20': dragModeStore.isEnabled,
    }"
  >
    <Card class="h-full flex flex-col">
    <div class="w-full">
      <div class="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Network statistics</CardTitle>
          <CardDescription>
            Last updated ({{ networkRaw.lastUpdated }})
          </CardDescription>
        </CardHeader>
        <div class="flex items-center gap-2">
          <div
            v-if="dragModeStore.isGlobalDragMode"
            class="opacity-75 hover:opacity-100 transition-opacity cursor-grab flex items-center"
          >
            <DragHandleDots16 />
          </div>
          <template v-else>
            <select
              v-model="selectedServer"
              class="text-sm border rounded px-3 py-2 bg-background dark:bg-[#323E4E]"
            >
              <option value="Server 1">Server 1</option>
              <option value="Server 2">Server 2</option>
              <option value="Server 3">Server 3</option>
            </select>
            <select
              v-model="selectedDisplay"
              class="text-sm border rounded px-3 py-2 bg-background dark:bg-[#323E4E]"
            >
              <option value="Percentage">Percentage</option>
              <option value="Count">Count</option>
            </select>
            <OptionsDropdown :onAction="handleAction" />
          </template>
        </div>
      </div>

      <CardContent class="flex-1 flex flex-col">
        <div :style="{ height: `${chartHeight}px` }">
          <ClientOnly>
            <apexchart
              type="area"
              height="100%"
              :options="chartOptions"
              :series="series"
            />
          </ClientOnly>
        </div>
      </CardContent>
    </div>
  </Card>
  </div>
</template>
