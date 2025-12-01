// composables/useKafkaToasts.ts
// Derives critical toasts from Kafka rows and manages dismiss state.

import { ref, watch } from "vue";

export interface ToastNode {
  name: string;
  memory: number;
  threads: number;
}

export function useKafkaToasts(
  rows: any[],
  options: { memoryThreshold: number; threadsThreshold: number }
) {
  const toasts = ref<ToastNode[]>([]);
  const dismissed = ref(new Set<string>());

  watch(
    () => rows,
    (currentRows) => {
      const critical = (currentRows ?? []).filter(
        (r) =>
          Number(r?.memory) >= options.memoryThreshold ||
          Number(r?.threads) >= options.threadsThreshold
      );

      critical.forEach((node) => {
        if (
          !toasts.value.some((t) => t.name === node.name) &&
          !dismissed.value.has(node.name)
        ) {
          toasts.value = [
            ...toasts.value,
            { name: node.name, memory: node.memory, threads: node.threads },
          ];
        }
      });
    },
    { deep: true, immediate: true }
  );

  const removeToast = (name: string) => {
    toasts.value = toasts.value.filter((t) => t.name !== name);
    dismissed.value = new Set(dismissed.value).add(name);
  };

  return { toasts, removeToast };
}
