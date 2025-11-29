<script setup lang="ts">
import { computed } from "vue";
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import DragHandleDots16 from "@/components/dashboard/ui/icons/DragHandleDots16.vue";
import { getDeptChartData } from "../data";

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

const { chartData, lastUpdated } = getDeptChartData(props.deptData);

const series = computed(() => chartData.map((d) => d.value));

const chartOptions = computed(() => ({
  chart: {
    type: "donut",
  },
  labels: chartData.map((d) => d.name),
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
  },
  tooltip: {
    theme: "light",
    y: {
      formatter: function (val: number) {
        return val.toLocaleString();
      },
    },
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
}));
</script>

<template>
  <Card class="h-full flex flex-col">
    <div class="flex items-center justify-between">
      <CardHeader>
        <CardTitle>SMS Volume by Department</CardTitle>
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
          <select
            :value="selectedPeriod"
            @change="
              (e) =>
                emit('periodChange', (e.target as HTMLSelectElement).value)
            "
            class="text-sm border rounded px-2 py-1 bg-background"
          >
            <option v-for="opt in selectOptions" :key="opt" :value="opt">
              {{ opt }}
            </option>
          </select>
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
</template>
