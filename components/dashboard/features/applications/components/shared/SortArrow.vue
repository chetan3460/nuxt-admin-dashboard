<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  dir?: "asc" | "desc";
  active?: boolean;
  className?: string;
}>();

const rotateClass = computed(() => {
  if (!props.active) return "rotate-0";
  return props.dir === "asc" ? "rotate-0" : "rotate-180";
});
</script>

<template>
  <div
    aria-hidden="true"
    class="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full transition-transform duration-200"
    :class="[
      active
        ? 'bg-[#4e47e11a] dark:bg-[#33445B] text-default-900'
        : 'hover:bg-[#4e47e11a]',
      'hover:text-primary',
      rotateClass,
      className,
    ]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M6 1.875V10.125M2.625 6.75L6 10.125L9.375 6.75"
        stroke="currentColor"
        stroke-width="0.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>
