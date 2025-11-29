<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps<{
  value?: string;
  onChange?: (value: string) => void;
  options?: string[];
}>();

const defaultOptions = ["Today", "This week", "This month"];
const selectOptions = props.options || defaultOptions;

const open = ref(false);
const dropdownRef = ref(null);

onClickOutside(dropdownRef, () => {
  open.value = false;
});

const handleSelect = (option: string) => {
  props.onChange?.(option);
  open.value = false;
};
</script>

<template>
  <div ref="dropdownRef" class="relative w-[124px]">
    <!-- Trigger -->
    <button
      @click="open = !open"
      class="flex items-center justify-between w-full px-3 py-2 text-xs font-normal bg-white dark:bg-[#323E4E] border border-[#E5E5E5] dark:border-[#5C5C5C] rounded-[4px] text-default-900"
    >
      {{ value || "Today" }}
      <!-- Arrow -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="7"
        height="5"
        viewBox="0 0 7 5"
        fill="currentColor"
        :class="[
          'ml-2 transition-transform duration-200 text-default-900',
          open ? 'rotate-180' : 'rotate-0',
        ]"
      >
        <path d="M0 0.5L3.5 4.5L7 0.5H0Z" />
      </svg>
    </button>

    <!-- Dropdown -->
    <ul
      v-if="open"
      class="absolute left-0 mt-1 w-full rounded-[4px] bg-white dark:bg-[#323E4E] border border-[#E5E5E5] dark:border-[#5C5C5C] shadow-[4px_2px_16px_rgba(0,0,0,0.12)] z-10"
    >
      <li
        v-for="option in selectOptions"
        :key="option"
        @click="handleSelect(option)"
        class="cursor-pointer px-3 py-2 text-sm text-default-900 hover:bg-gray-100 dark:hover:bg-[#444]"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>
