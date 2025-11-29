<script setup lang="ts">
import Refresh16 from "./icons/Refresh16.vue";
</script>

<template>
  <div class="flex items-center flex-wrap justify-between gap-4">
    <!-- Left side -->
    <div class="flex flex-col gap-1">
      <div class="text-2xl font-semibold text-dark dark:text-[#E5E2DF]">
        Welcome back, Rahul!
      </div>
      <p class="text-base font-normal text-midGray dark:text-darkGray">
        Your SMS operations are performing well today with steady traffic growth
        across all channels
      </p>
    </div>

    <!-- Right side (Refresh Button) -->
    <div
      class="flex items-center gap-1 cursor-pointer text-purple dark:text-lightpurle"
    >
      <div class="flex items-center justify-center">
        <Refresh16 />
      </div>
      <span class="text-xs font-semibold text-purple dark:text-lightpurle">
        Refresh Data
      </span>
    </div>
  </div>
</template>
