<script setup lang="ts">
defineProps<{
  size?: number;
  className?: string;
}>();
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size || 12"
    :height="size || 12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
    class="inline-block"
    :class="className"
  >
    <path
      d="M6 11C8.75 11 11 8.75 11 6C11 3.25 8.75 1 6 1C3.25 1 1 3.25 1 6C1 8.75 3.25 11 6 11Z"
      fill="#E14761"
      fill-opacity="0.3"
      stroke="#E14761"
      stroke-width="0.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6 4V6.5"
      stroke="#B12F00"
      stroke-width="0.75"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5.99609 8H6.00058"
      stroke="#B12F00"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
