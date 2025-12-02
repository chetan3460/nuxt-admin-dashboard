<script setup lang="ts">
import { useDragModeStore } from "@/stores/dragMode";

const dragModeStore = useDragModeStore();

const saveChanges = () => {
  // Save the current layout state
  dragModeStore.disable();
};

const cancelChanges = () => {
  // Cancel and revert changes
  dragModeStore.disable();
};
</script>

<template>
  <div
    v-if="dragModeStore.isEnabled"
    class="fixed bottom-6 left-1/2 -translate-x-1/2 w-11/12 md:w-auto max-w-[500px] mx-auto bg-card rounded-[6px] shadow-lg p-4 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4 z-50 dark:border-primary border"
  >
    <!-- Left Side: Icon and Text -->
    <div class="flex items-center gap-2">
      <div
        class="flex items-center justify-center gap-2 h-10 w-10 p-0 rounded-md border-none transition-colors bg-primary-100 text-primary dark:bg-transparent dark:text-darkGray"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clip-path="url(#clip0_376_3754)">
            <path
              d="M20.25 12V16.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18 14.25H22.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.5 3.75V8.25"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.25 6H9.75"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.75 17.25V20.25"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.25 18.75H17.25"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.5 7.5L16.5 10.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.0305 3.96951L3.96978 17.0302C3.67689 17.3231 3.67689 17.798 3.96978 18.0909L5.9088 20.0299C6.20169 20.3228 6.67657 20.3228 6.96946 20.0299L20.0302 6.96919C20.3231 6.6763 20.3231 6.20143 20.0302 5.90853L18.0911 3.96951C17.7983 3.67662 17.3234 3.67662 17.0305 3.96951Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_376_3754">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <span class="text-base font-semibold text-default-900">
        Done customizing?
      </span>
    </div>

    <!-- Right Side: Buttons -->
    <div class="flex space-x-3 w-full md:w-auto">
      <button
        @click="saveChanges"
        class="p-2 bg-primary text-xs text-white rounded-[.125rem]"
      >
        Save Changes
      </button>
      <button
        @click="cancelChanges"
        class="p-2 bg-transparent border border-primary text-xs rounded-[.125rem] text-primary"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
