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
import { successfulTransactionsRaw, successfulTransactionsData } from "../data";

const dragModeStore = useDragModeStore();
const colorMode = useColorMode();

const chartSeries = computed(() => [
  {
    name: "Successful Transactions",
    data: successfulTransactionsData.map((item) => item.value),
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
      width: 3,
    },
    colors: ["#60C345"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#5CDA3A"],
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: successfulTransactionsData.map((item) => item.name),
      labels: {
        style: {
          colors: isDark ? "#E5E5E5" : "#111827",
          fontSize: "12px",
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
          if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
          return value.toString();
        },
      },
    },
    grid: {
      borderColor: isDark ? "#374151" : "#DADADA",
      strokeDashArray: 3,
    },
    markers: {
      size: 5,
      colors: ["#60C345"],
      strokeColors: isDark ? "#111827" : "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
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
        <CardTitle>Successful Transactions</CardTitle>
        <CardDescription>
          Last updated ({{ successfulTransactionsRaw.lastUpdated }})
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
