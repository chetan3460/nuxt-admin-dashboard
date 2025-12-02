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
import { getDeptChartData } from "../sms-data";
import { exportCsv } from "@/utils/csv";

const props = defineProps<{
  deptData?: any;
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
    exportCsv("sms-by-department.csv", chartData);
  }
};

const { chartData, lastUpdated } = getDeptChartData(props.deptData);

const series = computed(() => chartData.map((d) => d.value));

const chartOptions = computed(() => {
  const isDark = colorMode.value === "dark";

  return {
    chart: {
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    labels: chartData.map((d) => d.name),
    colors: [
      "#FF6A88", // Marketing - pink/red gradient
      "#FFE159", // Support - yellow gradient
      "#A259FF", // HR - purple gradient
      "#42A5F5", // Admin - blue gradient
      "#FDBB2D", // Credit - orange gradient
      "#3EECAC", // Loan - teal/green gradient
      "#FF99AC", // Additional colors in case
      "#FBD217",
      "#C084FC",
      "#00B4D8",
      "#F77500",
      "#1FD1A7",
      "#9C27B0",
      "#FF5722",
      "#00BCD4",
    ],
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "right",
      labels: {
        colors: isDark ? "#E5E5E5" : "#111827",
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
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
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
          <CardTitle>SMS Volume by Department</CardTitle>
          <CardDescription>Last updated ({{ lastUpdated }})</CardDescription>
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
              type="donut"
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
            R&D volume loading consistently for last 3 weeks
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
