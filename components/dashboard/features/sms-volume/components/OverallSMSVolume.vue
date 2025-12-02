<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useColorMode } from "@vueuse/core";
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import DragHandleDots16 from "@/components/dashboard/ui/icons/DragHandleDots16.vue";
import OptionsDropdown from "@/components/dashboard/ui/OptionsDropdown.vue";
import DashboardSelect from "@/components/dashboard/ui/DashboardSelect.vue";
import { getChartData } from "../sms-data";
import { exportCsv } from "@/utils/csv";

const props = defineProps<{
  smsData: any;
  height?: number;
  selectedPeriod?: string;
  selectOptions?: string[];
  optionsMenuItems?: any[];
  isDraggable?: boolean;
}>();

const emit = defineEmits<{
  (e: "periodChange", period: string): void;
}>();

const colorMode = useColorMode();

const handleAction = (id: string) => {
  if (id === "export") {
    exportCsv("overall-sms-volume.csv", chartData.value);
  }
};

const chartData = computed(() =>
  getChartData(props.selectedPeriod || "Today", props.smsData)
);

const series = computed(() => [
  {
    name: "Total",
    data: chartData.value.map((d) => d.total),
  },
  {
    name: "Delivered",
    data: chartData.value.map((d) => d.delivered),
  },
  {
    name: "Failed",
    data: chartData.value.map((d) => d.failed),
  },
  {
    name: "Retry",
    data: chartData.value.map((d) => d.retry),
  },
]);

const chartOptions = computed(() => {
  const isDark = colorMode.value === "dark";

  return {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#2563eb", "#16a34a", "#dc2626", "#ca8a04"], // Blue, Green, Red, Yellow
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: chartData.value.map((d) => d.time),
      labels: {
        style: {
          colors: isDark ? "#E5E5E5" : "#111827",
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
          if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
          return value;
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
    grid: {
      borderColor: isDark ? "#374151" : "#E5E7EB",
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: {
        colors: isDark ? "#E5E5E5" : "#111827",
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
    },
  };
});
</script>

<template>
  <div
    :class="{
      'border-2 border-dashed border-primary p-2 rounded-20': isDraggable,
    }"
  >
    <Card class="h-full flex flex-col">
      <div class="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Overall SMS volume</CardTitle>
          <CardDescription>
            Last updated ({{ smsData?.lastUpdated || "N/A" }})
          </CardDescription>
        </CardHeader>
        <div class="flex items-center gap-2">
          <div
            v-if="isDraggable"
            class="cursor-grab flex items-center opacity-75 hover:opacity-100"
          >
            <DragHandleDots16 />
          </div>
          <div v-else class="flex items-center gap-2">
            <DashboardSelect
              :value="selectedPeriod"
              :onChange="(val) => emit('periodChange', val)"
              :options="selectOptions"
            />
            <OptionsDropdown :onAction="handleAction" />
          </div>
        </div>
      </div>
      <CardContent class="flex-1 flex flex-col justify-between">
        <div class="relative w-full h-[300px]">
          <ClientOnly>
            <apexchart
              type="line"
              height="100%"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </ClientOnly>
        </div>
        <div
          class="py-1 px-2 bg-[#E2F5FD] dark:bg-[#0D475F] rounded-[8px] inline-block max-w-max mt-4"
        >
          <p class="text-xs font-medium text-[#0067B1] dark:text-[#149BFC]">
            Peak traffic at 5 pm as expected
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
