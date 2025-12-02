<script setup lang="ts">
import { computed } from "vue";
import { useColorMode } from "@vueuse/core";
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import DragHandleDots16 from "@/components/dashboard/ui/icons/DragHandleDots16.vue";
import OptionsDropdown from "@/components/dashboard/ui/OptionsDropdown.vue";
import DashboardSelect from "@/components/dashboard/ui/DashboardSelect.vue";
import { getProviderChartData } from "../data";
import { exportCsv } from "@/utils/csv";

const props = defineProps<{
  providerData?: any;
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
    exportCsv("sms-by-provider.csv", chartData);
  }
};

const { chartData, lastUpdated } = getProviderChartData(props.providerData);

const series = computed(() => [
  {
    name: "Total",
    data: chartData.map((d) => d.total),
  },
]);

const chartOptions = computed(() => {
  const isDark = colorMode.value === "dark";

  return {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "60%",
        borderRadius: 0,
        distributed: true, // Different colors for bars
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: chartData.map((d) => d.name),
      labels: {
        style: {
          colors: isDark ? "#E5E5E5" : "#111827",
        },
        formatter: (val: number) => {
          if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
          return val;
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
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: {
        formatter: function (val: number) {
          return val.toLocaleString();
        },
      },
    },
    legend: {
      show: false,
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
          <CardTitle>SMS volume by service provider</CardTitle>
          <CardDescription>Last updated ({ lastUpdated })</CardDescription>
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
      <CardContent class="flex-1 flex flex-col">
        <div class="relative w-full h-[400px] overflow-y-auto">
          <ClientOnly>
            <apexchart
              type="bar"
              height="100%"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </ClientOnly>
        </div>
        <div
          class="py-1 px-2 bg-[#E2F5FD] dark:bg-[#0D475F] rounded-[8px] inline-block mt-3 max-w-max"
        >
          <p class="text-xs font-medium text-[#0067B1] dark:text-[#149BFC]">
            Overall volume 10% higher than last week
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
