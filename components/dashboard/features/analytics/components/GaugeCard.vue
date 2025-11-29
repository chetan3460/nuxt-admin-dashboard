<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  title: string;
  value: string | number;
}>();

const numericValue = computed(() => Number(props.value));

const series = computed(() => [
  Math.min(100, (numericValue.value / 10000) * 100),
]); // Assuming max 10000 based on original code

const chartOptions = computed(() => ({
  chart: {
    type: "radialBar",
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: "#e7e7e7",
        strokeWidth: "97%",
        margin: 5, // margin is in pixels
        dropShadow: {
          enabled: false,
          top: 2,
          left: 0,
          color: "#999",
          opacity: 1,
          blur: 2,
        },
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          offsetY: -2,
          fontSize: "22px",
          fontWeight: 600,
          color: "currentColor",
          formatter: function (val: any) {
            return props.value;
          },
        },
      },
    },
  },
  grid: {
    padding: {
      top: -10,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 53, 91],
    },
  },
  labels: ["Average Results"],
  colors: ["#22c55e"], // Green color
}));
</script>

<template>
  <div
    class="mt-0 w-full h-[65px] flex items-center justify-center overflow-hidden text-default-900 dark:text-white"
  >
    <ClientOnly>
      <apexchart
        type="radialBar"
        height="140"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </ClientOnly>
  </div>
</template>
