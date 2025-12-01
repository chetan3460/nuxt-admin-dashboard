<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

interface ToastNode {
  name: string;
  memory: number;
  threads: number;
}

interface Props {
  node: ToastNode;
  iconSrc: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [name: string];
}>();

// Auto-dismiss after 5 seconds (currently disabled like in React)
// let timeout: NodeJS.Timeout | null = null;
// onMounted(() => {
//   timeout = setTimeout(() => {
//     emit('close', props.node.name);
//   }, 5000);
// });

// onUnmounted(() => {
//   if (timeout) clearTimeout(timeout);
// });
</script>

<template>
  <div
    class="pointer-events-auto bg-[#FDF6F7] dark:bg-card border border-destructive-700 px-3 py-4 rounded-[6px] shadow-md flex flex-col gap-1 w-[360px] max-w-[min(90vw,360px)]"
  >
    <div class="flex items-center gap-2">
      <span
        class="font-semibold text-base text-default-900 inline-flex items-center gap-1"
      >
        <img :src="iconSrc" alt="" width="32" height="32" class="shrink-0" />
        System Critical
      </span>
      <button
        @click="emit('close', node.name)"
        class="ml-auto hover:text-red-600 text-default-900 w-3 h-3 flex items-center justify-center"
        aria-label="Dismiss system critical notification"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="currentColor"
        >
          <path
            d="M9.375 2.625L2.625 9.375M9.375 9.375L2.625 2.625"
            stroke="currentColor"
            stroke-width="0.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <div class="text-default-600 text-xs">
      {{ node.name }}'s memory is at
      <span class="font-medium">{{ node.memory }}%</span> with
      <span class="font-medium">{{ node.threads }}</span> threads
    </div>
    <a
      href="#"
      class="text-primary font-medium text-xs flex items-center gap-1"
    >
      Take action
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="10"
        viewBox="0 0 5 10"
        fill="none"
      >
        <path
          d="M0.5 1.25L4.25 5L0.5 8.75"
          stroke="#4E47E1"
          stroke-width="0.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </a>
  </div>
</template>
