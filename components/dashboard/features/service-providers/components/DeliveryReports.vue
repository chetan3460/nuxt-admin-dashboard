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
import {
  deliveryReportsRaw,
  deliveryReportsData,
} from "../service-providers-data";
import { exportCsv } from "@/utils/csv";

const dragModeStore = useDragModeStore();
const colorMode = useColorMode();

const props = defineProps({
  height: {
    type: [Number, String],
    default: 384,
  },
});

const selectedPeriod = ref("Today");
const selectOptions = ["Today", "This week", "This month"];

const handlePeriodChange = (period: string) => {
  selectedPeriod.value = period;
};

const handleAction = (id: string) => {
  if (id === "export") {
    const exportData = deliveryReportsData.map((item) => ({
      provider: item.name,
      messages_sent: item.msgSubmitted,
      delivery_reports: item.dlrReceived,
    }));
    exportCsv("delivery-reports.csv", exportData);
  }
};

const chartSeries = computed(() => [
  {
    name: "Messages Sent",
    data: deliveryReportsData.map((item) => item.msgSubmitted),
  },
  {
    name: "Delivery Reports",
    data: deliveryReportsData.map((item) => item.dlrReceived),
  },
]);

const chartOptions = computed(() => {
  const isDark = colorMode.value === "dark";

  return {
    chart: {
      type: "bar",
      background: "transparent",
      toolbar: { show: false },
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "16px",
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    colors: ["#3EECAC", "#FF6A88"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: ["#42A5F5", "#FF99AC"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories: deliveryReportsData.map((item) => item.name),
      labels: {
        rotate: -90,
        rotateAlways: true,
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
          if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
          return value.toString();
        },
      },
    },
    grid: {
      borderColor: isDark ? "#374151" : "#E5E7EB",
      strokeDashArray: 3,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      labels: {
        colors: isDark ? "#E5E5E5" : "#111827",
      },
      markers: {
        width: 23,
        height: 8,
        radius: 2,
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
  <div
    :class="{
      'border-2 border-dashed border-primary p-2 rounded-20':
        dragModeStore.isEnabled,
    }"
  >
    <Card class="h-full flex flex-col">
      <div class="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Delivery Reports Received</CardTitle>
          <CardDescription>
            Last updated ({{ deliveryReportsRaw.lastUpdated }})
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

      <CardContent class="flex-1">
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
