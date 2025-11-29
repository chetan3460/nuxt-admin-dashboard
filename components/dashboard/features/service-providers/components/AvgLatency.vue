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
import { avgLatencyRaw, avgLatencyData } from "../data";

const dragModeStore = useDragModeStore();
const colorMode = useColorMode();

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
      type: "area",
      background: "transparent",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: 2,
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
        formatter: (value: number) => `${value}ms`,
      },
    },
    grid: {
      borderColor: isDark ? "#374151" : "#DADADA",
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
  <Card class="h-full flex flex-col">
    <div class="flex items-center justify-between">
      <CardHeader>
        <CardTitle>Average Latency</CardTitle>
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
      </div>
    </div>

    <CardContent class="flex-1 flex flex-col">
      <div class="h-full">
        <ClientOnly>
          <apexchart
            type="area"
            height="100%"
            :options="chartOptions"
            :series="chartSeries"
          />
        </ClientOnly>
      </div>
    </CardContent>
  </Card>
</template>
